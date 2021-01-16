import React from "react";

const LibrarySong = ({
  Song,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  setSongs,
  songs,
}) => {
  const handleSelectedSong = () => {
    setCurrentSong(Song);
    setIsPlaying(false); // Is to make sure when song changes play button change.
    // Add Active State
    const newSongs = songs.map((s) => {
      if (s.id === Song.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(newSongs);
  };

  return (
    <div
      className={`library-song ${Song.active ? "selected" : ""}`}
      onClick={handleSelectedSong}
    >
      <img src={Song.cover} alt={Song.name} />
      <div className="song-description">
        <h3>{Song.name}</h3>
        <h4>{Song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
