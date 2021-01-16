import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  useEffect(() => {
    const newSongs = songs.map((s) => {
      if (s.id === currentSong.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);

  //Ref
  const audioRef = useRef(null);

  const skipTrackHandler = (direction) => {
    let index = 0;
    for (let i = 0; i < songs.length; i++) {
      if (songs[i].id === currentSong.id) {
        index = i;
        break;
      }
    }
    if (direction === "skip-forward") {
      index++;
      setCurrentSong(songs[index % songs.length]);
      setIsPlaying(false);
    } else {
      if (index === 0) {
        index = songs.length - 1;
      } else {
        index--;
      }
      setCurrentSong(songs[index]);
      setIsPlaying(false);
    }
  };

  // Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration1 = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration1 });
  };

  const timeUpdateHandler1 = (e) => {
    const current = e.target.currentTime;
    // Calculate Percentage
    const roundedCurrent = Math.round(current);

    const roundedDuration = Math.round(songInfo.duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      animationPercentage: animation,
    });
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // Add the styles for track
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        {/*FontAwesomeIcon is a comopnent pass icon as props to the component  */}
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler1}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={() => skipTrackHandler("skip-forward")}
      ></audio>
    </div>
  );
};

export default Player;
