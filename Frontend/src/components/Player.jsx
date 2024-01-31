import { useEffect, useMemo, useRef, useState } from "react";

const timeConverter = (seconds) => {
  return {
    hours: seconds / (60 * 60),
    minutes: Math.floor((seconds / 60) % 60),
    seconds: Math.floor(seconds % 60),
  };
};

function SongPlayer({ currentChapter, nextSong, prevSong }) {
  const [isLoading, setLoading] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  let audio = useRef(new Audio(currentChapter.audio.src)).current;

  const loadAudio = () => {
    let onAudioStateChange = () => {
      let isPlaying = !audio.paused;
      setPlaying(isPlaying);
    };

    let audioProgress = () => {
      setCurrentTime(audio.currentTime);
    };

    let audioEnd = () => {
      nextSong();
    };

    audio.addEventListener("loadeddata", () => {
      audio.addEventListener("play", onAudioStateChange);
      audio.addEventListener("pause", onAudioStateChange);
      audio.addEventListener("timeupdate", audioProgress);
      audio.addEventListener("ended", audioEnd);
      setDuration(audio.duration);
      setLoading(true);
      audio.play()
    });

    return () => {
      audio.removeEventListener("play", onAudioStateChange);
      audio.removeEventListener("pause", onAudioStateChange);
      audio.removeEventListener("timeupdate", audioProgress);
      audio.removeEventListener("ended", audioEnd);
    };
  };

  useEffect(() => {
    setCurrentTime()

    let unsubscribe = loadAudio();

    return () => {
      unsubscribe();
      audio.pause();
      audio.remove();
    };
  }, [currentChapter]);

  const updateCurentTiming = (e) => {
    audio.pause();
    let value = (e.target.value / 100) * audio.duration;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  let durationTiming = timeConverter(duration);
  let currentTiming = timeConverter(currentTime);

  return (
    <div style={{ width: "100%", padding: "80px 30px" }}>
      <input
        type="range"
        min={1}
        max={100}
        value={parseInt((currentTime / audio.duration) * 100) || 0}
        onChange={updateCurentTiming}
        onMouseUp={() => audio.play()}
        style={{ width: "100%", height: "5px" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 0",
        }}
      >
        <small style={{ color: "grey" }}>
          {currentTiming.minutes}:{currentTiming.seconds}s
        </small>
        <small style={{ color: "grey" }}>
          {durationTiming.minutes}:{durationTiming.seconds}s
        </small>
      </div>
      <section
        style={{
          display: "flex",
          gap: 20,
          color: "white",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 30, cursor: "pointer" }}
          onClick={prevSong}
        >
          skip_previous
        </span>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 50, cursor: "pointer" }}
          onClick={() => (audio.paused ? audio.play() : audio.pause())}
        >
          {isPlaying ? "pause_circle" : "play_circle"}
        </span>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 30, cursor: "pointer" }}
          onClick={nextSong}
        >
          skip_next
        </span>
      </section>
    </div>
  );
}


function Player({ coursePlaylist, goBack }) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const currentChapter = coursePlaylist.chapters[currentChapterIndex];

  const moveSong = (dir) => {
    let songIndex = currentChapterIndex + dir;
    if (songIndex < 0 || songIndex >= coursePlaylist.chapters.length) return;
    setCurrentChapterIndex(songIndex);
  };


  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ color: "white", fontSize: 30, cursor: "pointer" }}
          onClick={goBack}
        >
          expand_more
        </span>
        <span className="material-symbols-outlined" style={{ color: "white" }}>
          share
        </span>
      </nav>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <img
          src={currentChapter.image}
          width="80%"
          style={{ aspectRatio: "16/9", objectFit: "cover", borderRadius: 5 }}
        />
        <h3 style={{ color: "white" }}>{coursePlaylist.name}</h3>
        <small style={{ color: "grey" }}>
          Chapter {currentChapterIndex + 1} - {currentChapter.name}
        </small>
        <button
          style={{
            background: "#2E3035",
            border: "none",
            padding: "8px 20px",
            borderRadius: 3,
            marginTop: 20,
            color: "white",
            width: 180,
          }}
        >
          View Chapter Notes
        </button>
        <button
          style={{
            background: "#2E3035",
            border: "none",
            padding: "8px 20px",
            borderRadius: 3,
            marginTop: 10,
            color: "white",
            width: 180,
          }}
        >
          Attemp Quiz
        </button>
        <SongPlayer 
          currentChapter={currentChapter}
          nextSong={() => moveSong(1)}
          prevSong={() => moveSong(-1)}
          />
      </div>
    </div>
  );
}

export default Player;
