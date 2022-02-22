import Image from "next/image";
import { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

import styles from "styles/Create.module.css";

// When ffmpeg packages are updated,
// update files in public dir
const ffmpeg = createFFmpeg({
  // log: true,
  corePath: "./ffmpeg-core/dist/ffmpeg-core.js",
});

const Create = () => {
  const [ready, setReady] = useState(false);
  const [inputFile, setInputFile] = useState();
  const [inputURL, setInputURL] = useState();

  const [thumbnail, setThumbnail] = useState();
  const [outputMp4, setOutputMp4] = useState();
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressListener = ({ ratio }) => {
    const scaled = Math.floor(ratio * 100);
    if (scaled > progress) {
      console.log(`${scaled}% converted`);
      setProgress(scaled);
    }
  };

  const load = async () => {
    console.log("Loading ffmpeg");
    await ffmpeg.load();
    ffmpeg.setProgress(progressListener);
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const createThumbnail = async () => {
    const filename = "thumbnail.png";

    // Get the thumbnail of first sec
    await ffmpeg.run(
      "-i",
      inputFile.name,
      "-ss",
      "00:00:00",
      "-frames:v",
      "1",
      "-q:v",
      "2",
      filename
    );

    const data = ffmpeg.FS("readFile", filename);

    // Create a file object
    const thumbnailItem = new File([data.buffer], filename, {
      type: "image/png",
    });

    setThumbnail(thumbnailItem);
  };

  const createMp4 = async () => {
    const outputFileName = "shinobi.mp4";

    await ffmpeg.run(
      "-i",
      inputFile.name,
      "-c:v",
      "libx264", // Re-encode to H264
      "-vf",
      "scale=-1:720", // Rescale to 720p
      "-b:v",
      `${6 * 1000 * 1000}`, // Bitrate
      "-filter:v",
      "fps=30", // 30 FPS
      "-c:a",
      "copy",
      outputFileName
    );

    // Read the result
    const data = ffmpeg.FS("readFile", outputFileName);

    // Create a file object
    const outputItem = new File([data.buffer], outputFileName, {
      type: "video/mp4",
    });

    setOutputMp4(outputItem);
  };

  const convertToMp4 = async () => {
    // Write the file to memory
    console.log("Start converting\n", new Date());
    setConverting(true);

    ffmpeg.FS("writeFile", inputFile.name, await fetchFile(inputFile));

    await createThumbnail();
    await createMp4();

    console.log("Converting completed\n", new Date());
    setConverting(false);

    console.log("Closing ffmpeg");
    ffmpeg.exit();
  };

  if (!ready) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      {inputURL && <video controls width={250} src={inputURL} />}
      <input
        type="file"
        onChange={(e) => {
          const fileItem = e.target.files.item(0);
          setInputFile(fileItem);
          setInputURL(URL.createObjectURL(fileItem));
        }}
        accept="video/*"
      />

      <h3>Result</h3>
      <button onClick={convertToMp4}>Convert</button>
      {thumbnail && (
        <div className={styles.thumbnail}>
          <Image
            layout="fill"
            src={URL.createObjectURL(thumbnail)}
            alt="thumbnail"
            quality={100}
          />
        </div>
      )}
      <br />
      {outputMp4 && (
        <video controls width={250} src={URL.createObjectURL(outputMp4)} />
      )}
    </div>
  );
};

export default Create;
