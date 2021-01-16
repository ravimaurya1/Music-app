import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song, index) => {
          return (
            <LibrarySong
              Song={song}
              setCurrentSong={setCurrentSong}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              key={song.id}
              songs={songs}
              setSongs={setSongs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
