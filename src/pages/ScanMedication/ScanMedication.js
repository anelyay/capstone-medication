import { useState, useEffect, useRef, useCallback } from "react";
import "./ScanMedication.scss";
import Webcam from "react-webcam";
import axios from "axios";

function Scan() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef();

  const [Mode, setMode] = useState(() => {
    const saved = localStorage.getItem("SavedMode");
    return saved !== null ? JSON.parse(saved) : "";
  });

  useEffect(() => {
    localStorage.setItem("SavedMode", JSON.stringify(Mode));
  }, [Mode]);

  // data from server/backend
  const [data, setData] = useState(null);

  const imageDataToBlob = (imageData) => {
    const canvas = canvasRef.current;
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const context = canvas.getContext("2d");
    context.putImageData(imageData, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const capture = useCallback(async () => {
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    //Get the image data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;

    ///// IMAGE PROCESSING //////

    let max = 0;
    let min = 0;

    // Making grayscale pixels (rgb to be equal)
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const avg = (red + green + blue) / 3;

      data[i] = avg; // Red
      data[i + 1] = avg; // Green
      data[i + 2] = avg; // Blue

      if (data[i] > max) max = data[i];
      if (data[i + 1] > max) max = data[i + 1];
      if (data[i + 2] > max) max = data[i + 2];

      if (data[i] < min) min = data[i];
      if (data[i + 1] < min) min = data[i + 1];
      if (data[i + 2] < min) min = data[i + 2];
    }

    // Encrease diapazon
    const aver = (max + min) / 2;
    const upper_diff = 255 - max;
    const lower_diff = min;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > aver) {
        data[i] = data[i] + upper_diff;
        data[i + 1] = data[i + 1] + upper_diff;
        data[i + 2] = data[i + 2] + upper_diff;
      }
      if (data[i] < aver) {
        data[i] = data[i] - lower_diff;
        data[i + 1] = data[i + 1] - lower_diff;
        data[i + 2] = data[i + 2] - lower_diff;
      }
    }

    // Put the processed image data back to the canvas
    context.putImageData(imageData, 0, 0);

    const blob = await imageDataToBlob(imageData);

    const formData = new FormData();

    formData.append("screenshots", blob, "image.jpeg");

    //////  SEND IMAGES TO BACKEND //////////
    axios
      .post("http://localhost:8080/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        setData(response.data);
      });
  }, [webcamRef, canvasRef]);

  // TIMER TO REPET SCAN AND SEND IMAGES TO BACKEND (EVERY 1000 millieseconds for test)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (Mode === "SCAN") {
        console.log("mode SCAN");
        capture();
      }
    }, 500); // Capture every 100ms / 200/ 500 /1000 / any
    return () => clearInterval(intervalRef.current);
  }, [capture, Mode]);

  const handleScan = (e) => {
    e.preventDefault();
    setMode("SCAN");
    localStorage.setItem("SavedMode", JSON.stringify("SCAN"));
    console.log("You clicked SCAN");
    console.log("Mode: ", Mode);
  };

  const handleStop = (e) => {
    e.preventDefault();
    setMode("stop");
    localStorage.setItem("SavedMode", JSON.stringify("stop"));
    console.log("You clicked STOP");
    console.log("Mode: ", Mode);
  };

  // WEBCAM AND CANVAS WITH ABSOLUTE POSITIONS FOR OVERLAY CANVAS OVER WEBCAM BY Z INDEX
  return (
    <div className="App">
      <h1>IMAGE SCAN</h1>

      <Webcam
        audio={false}
        ref={webcamRef}
        // style={{ position: "absolute", zIndex: 8 }}
      />

      <canvas ref={canvasRef} style={{ position: "absolute", zIndex: 9 }} />

      <div id="buttonStart" style={{ float: "left" }}>
        <button onClick={handleScan}>SCAN START</button>
      </div>

      <div id="buttonStop" style={{ float: "left" }}>
        <button onClick={handleStop}>SCAN STOP</button>
      </div>

      <p id="scan_result_Id" style={{ float: "left" }}>
        {!data ? "Recognising..." : data}
      </p>
      <h1 id="table_Id" style={{ float: "left" }}>
        Scanned Items
      </h1>

      {/* <div className="App">
        <DynamicTable />
      </div> */}
    </div>
  );
}

export default Scan;
