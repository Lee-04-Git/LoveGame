export class SoundEffects {
  private audioContext: AudioContext | null = null;
  private bgMusicInterval: ReturnType<typeof setInterval> | null = null;
  private _isMusicPlaying = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  get isMusicPlaying(): boolean {
    return this._isMusicPlaying;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private playNote(frequency: number, duration: number, volume: number = 0.08) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime + duration * 0.7);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Soft romantic melody loop (C major / pentatonic)
  private melodyNotes = [
    // Phrase 1
    523.25, 587.33, 659.25, 523.25, // C5 D5 E5 C5
    659.25, 698.46, 587.33, 0,      // E5 F5 D5 rest
    // Phrase 2
    440.00, 523.25, 587.33, 523.25, // A4 C5 D5 C5
    440.00, 392.00, 440.00, 0,      // A4 G4 A4 rest
    // Phrase 3 (softer)
    659.25, 698.46, 783.99, 659.25, // E5 F5 G5 E5
    587.33, 523.25, 440.00, 0,      // D5 C5 A4 rest
    // Phrase 4 (resolve)
    392.00, 440.00, 523.25, 440.00, // G4 A4 C5 A4
    392.00, 349.23, 329.63, 0,      // G4 F4 E4 rest
  ];

  startMusic() {
    if (this._isMusicPlaying || !this.audioContext) return;

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this._isMusicPlaying = true;
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this._isMusicPlaying) return;
      const freq = this.melodyNotes[noteIndex % this.melodyNotes.length];
      if (freq > 0) {
        this.playNote(freq, 0.4, 0.06);
        // Add a soft harmony a third below
        this.playNote(freq * 0.7937, 0.5, 0.03);
      }
      noteIndex++;
    };

    playNextNote();
    this.bgMusicInterval = setInterval(playNextNote, 500);
  }

  stopMusic() {
    this._isMusicPlaying = false;
    if (this.bgMusicInterval) {
      clearInterval(this.bgMusicInterval);
      this.bgMusicInterval = null;
    }
  }

  toggleMusic(): boolean {
    if (this._isMusicPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this._isMusicPlaying;
  }

  pop() {
    this.playTone(800, 0.1, 'sine');
    setTimeout(() => this.playTone(1000, 0.05, 'sine'), 50);
  }

  ding() {
    this.playTone(1200, 0.15, 'sine');
    setTimeout(() => this.playTone(1600, 0.1, 'sine'), 75);
  }

  boop() {
    this.playTone(400, 0.1, 'square');
  }

  cheer() {
    this.playTone(523, 0.1, 'sine'); // C
    setTimeout(() => this.playTone(659, 0.1, 'sine'), 100); // E
    setTimeout(() => this.playTone(784, 0.15, 'sine'), 200); // G
    setTimeout(() => this.playTone(1047, 0.2, 'sine'), 350); // High C
  }
}

export const soundEffects = new SoundEffects();