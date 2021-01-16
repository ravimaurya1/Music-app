import { v4 as uuidv4 } from "uuid";

function chillHop() {
  return [
    {
      name: "Limitless.",
      cover:
        "https://chillhop.com/wp-content/uploads/2020/12/ed44264c2cd205b057a700e3adf42d8f92aa308c-1024x1024.jpg",
      artist: "chromonicci",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=11735",
      color: ["#116A7E", "#E07954"],
      id: uuidv4(),
      active: false,
    },
  ];
}

export default chillHop;
