import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import all songs
import song1 from '../assets/musicList/Bershy - Radio (Lyrics) Dispatch Song.mp3';
import song2 from '../assets/musicList/Bright Eyes - First Day of My Life [Official Music Video].mp3';
import song3 from '../assets/musicList/Earth Angel - Marvin Berry & The Starlighters (HQ).mp3';
import song4 from '../assets/musicList/Frankie Valli - Can\'t Take My Eyes Off You (Lyrics).mp3';
import song5 from '../assets/musicList/Let\'s Fall In Love For The Night - FINNEAS (Clean Version).mp3';
import song6 from '../assets/musicList/She & Him - I Thought I Saw Your Face Today (Official Lyric Video).mp3';
import song7 from '../assets/musicList/Arctic Monkeys - No. 1 Party Anthem (Lyrics).mp3';
import song8 from '../assets/musicList/As The World Caves In - Matt Maltese (Cover by Sarah Cothran).mp3';
import song9 from '../assets/musicList/Nicky Youre, dazy - Sunroof (Official Music Video).mp3';
import song10 from '../assets/musicList/Ricky Montgomery - Line Without a Hook (Lyrics).mp3';
import song11 from '../assets/musicList/mgk - iris feat. Julia Wolf  OFFICIAL MUSIC Lyrics.mp3';

interface MusicPageProps {
  onBack: () => void;
  backgroundAudio: HTMLAudioElement | null;
}

interface Song {
  id: number;
  title: string;
  file: string;
}

const songs: Song[] = [
  { id: 2, title: 'First Day of My Life - Bright Eyes', file: song2 },
  { id: 6, title: 'I Thought I Saw Your Face Today - She & Him', file: song6 },
  { id: 10, title: 'Line Without a Hook - Ricky Montgomery', file: song10 },
  { id: 9, title: 'Sunroof - Nicky Youre, dazy', file: song9 },
  { id: 5, title: 'Let\'s Fall In Love For The Night - FINNEAS', file: song5 },
  { id: 11, title: 'iris - mgk feat. Julia Wolf', file: song11 },
  { id: 8, title: 'As The World Caves In - Sarah Cothran', file: song8 },
  { id: 7, title: 'No. 1 Party Anthem - Arctic Monkeys', file: song7 },
  { id: 4, title: 'Can\'t Take My Eyes Off You - Frankie Valli', file: song4 },
  { id: 1, title: 'Radio - Bershy', file: song1 },
  { id: 3, title: 'Earth Angel - Marvin Berry & The Starlighters', file: song3 },
];

const MusicPage: React.FC<MusicPageProps> = ({ onBack, backgroundAudio }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Resume background music when track ends
      if (backgroundAudio && backgroundAudio.paused) {
        backgroundAudio.play();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [backgroundAudio]);

  const playSong = (song: Song) => {
    if (audioRef.current) {
      if (currentSong?.id === song.id) {
        // Toggle play/pause for current song
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          // Resume background music when pausing
          if (backgroundAudio && backgroundAudio.paused) {
            backgroundAudio.play();
          }
        } else {
          audioRef.current.play();
          setIsPlaying(true);
          // Pause background music when playing
          if (backgroundAudio && !backgroundAudio.paused) {
            backgroundAudio.pause();
          }
        }
      } else {
        // Load and play new song
        audioRef.current.src = song.file;
        audioRef.current.play();
        setCurrentSong(song);
        setIsPlaying(true);
        // Pause background music when playing new song
        if (backgroundAudio && !backgroundAudio.paused) {
          backgroundAudio.pause();
        }
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.pause();
        // Resume background music when pausing
        if (backgroundAudio && backgroundAudio.paused) {
          backgroundAudio.play();
        }
      } else {
        audioRef.current.play();
        // Pause background music when playing
        if (backgroundAudio && !backgroundAudio.paused) {
          backgroundAudio.pause();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-6 sm:space-y-8 px-4 max-w-3xl mx-auto">
      <audio ref={audioRef} />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-semibold transition-colors mb-4"
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">←</span> 
        <span className="text-base">Back</span>
      </motion.button>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text leading-relaxed mb-2">
          Songs That Make Me Think Of You 💕
        </h1>
        <p className="text-sm sm:text-base text-pink-600 opacity-80">
          A playlist made with love
        </p>
      </motion.div>

      {/* Music Player */}
      {currentSong && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl border-2 border-pink-200 mb-8"
        >
          {/* Now Playing Badge */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 bg-pink-500 rounded-full"
            />
            <span className="text-xs font-semibold text-pink-600 uppercase tracking-wider">
              Now Playing
            </span>
          </div>

          {/* Song Title */}
          <div className="text-lg sm:text-xl font-bold text-pink-900 px-4">
            {currentSong.title}
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-pink-200 rounded-full appearance-none cursor-pointer slider-pink"
              style={{
                background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(currentTime / duration) * 100}%, #fce7f3 ${(currentTime / duration) * 100}%, #fce7f3 100%)`
              }}
            />
            <div className="flex justify-between text-sm font-medium text-pink-700">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play/Pause Button */}
          <motion.button
            onClick={togglePlayPause}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold rounded-full shadow-lg text-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(236, 72, 153, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundSize: '200% auto' }}
          >
            {isPlaying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl">⏸</span> Pause
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl">▶</span> Play
              </span>
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Song List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <div className="text-left text-sm font-semibold text-pink-700 uppercase tracking-wider mb-4 px-2">
          Playlist ({songs.length} songs)
        </div>
        
        {songs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            className={`glass-card p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 transition-all hover:shadow-lg ${
              currentSong?.id === song.id 
                ? 'border-2 border-pink-400 bg-pink-50/50' 
                : 'border border-pink-200 hover:border-pink-300'
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            {/* Song Number and Title */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentSong?.id === song.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                  : 'bg-pink-200 text-pink-700'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className={`font-semibold truncate ${
                  currentSong?.id === song.id ? 'text-pink-900' : 'text-pink-800'
                }`}>
                  {song.title}
                </div>
              </div>
            </div>

            {/* Play Button */}
            <motion.button
              onClick={() => playSong(song)}
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md transition-all ${
                currentSong?.id === song.id && isPlaying
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  : 'bg-gradient-to-r from-pink-400 to-rose-400 text-white hover:from-pink-500 hover:to-rose-500'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-lg">
                {currentSong?.id === song.id && isPlaying ? '⏸' : '▶'}
              </span>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MusicPage;
