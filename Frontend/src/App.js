import { useState } from "react";
import Home from "./components/Home";
import Player from "./components/Player";
import "./styles.css";

export default function App() {
  const [coursePlaylist, setCoursePlayList] = useState(null);

  return (
    <div className="App">
      {coursePlaylist ? (
        <Player
          coursePlaylist={coursePlaylist}
          goBack={() => setCoursePlayList(null)}
        />
      ) : (
        <Home setCoursePlayList={setCoursePlayList} />
      )}
    </div>
  );
}
