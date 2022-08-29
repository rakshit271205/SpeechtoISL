import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import videojson from "../videos.json";
import Video from "./video";

export default function Main() {
  const [videos, setVideos] = useState(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const playVideo = () => {
    const words = transcript.split(" ");
    const paths = words.map((word) => {
      if (videojson.all.includes(word.toLowerCase())) {
        return [`/assets/videos/${capitalizeFirstLetter(word)}.mp4`];
      }

      const letters = word.split("");
      return letters.map(
        (letter) => `/assets/videos/${capitalizeFirstLetter(letter)}.mp4`
      );
    });

    let signlearray = [];
    paths.map((path) => path.map((p) => signlearray.push(p)));

    setVideos(signlearray);

    console.log(signlearray);
  };

  return (
    <div className=" w-full flex flex-col mt-[50px] items-center ">
      <h1 className="text-5xl font-medium max-w-[700px] text-center leading-snug	">
        Convert your speech to Indian Sign Language in seconds
      </h1>
      <p className="opacity-70 mt-3">
        A simple and powerful tool to convert your speech to Indian Sign
      </p>

      <div className="flex items-center mt-5">
        <div
          onClick={SpeechRecognition.startListening}
          className="bg-[#5666FF] px-10 py-2 rounded-[5px] font-medium cursor-pointer"
        >
          <p>Record</p>
        </div>

        <div
          onClick={playVideo}
          className="ml-10 border px-8 py-2 font-medium rounded-[5px] cursor-pointer"
        >
          <p>Play Video</p>
        </div>
      </div>
      <p className="mt-2 opacity-80">{transcript}</p>
      {/* <button onClick={playVideo}>Play</button> */}
      {videos && (
        <div className="mt-5">
          <Video videos={videos} />
        </div>
      )}
    </div>
  );
}
