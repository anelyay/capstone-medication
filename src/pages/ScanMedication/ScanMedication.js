import { useState, useEffect, useRef, useCallback } from "react";
import "./ScanMedication.scss";
import Webcam from "react-webcam";
import axios from "axios";

function Scan() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null); // Track the interval ID
  const [isCapturing, setIsCapturing] = useState(false); // Track capturing status

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
    if (!webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // canvas dimensions to match the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;

    //  grayscale filter
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const avg = (red + green + blue) / 3;

      data[i] = avg; // Red
      data[i + 1] = avg; // Green
      data[i + 2] = avg; // Blue
    }

    // Put the processed image data back to the canvas
    context.putImageData(imageData, 0, 0);

    const blob = await imageDataToBlob(imageData);

    const formData = new FormData();
    formData.append("screenshots", blob, "image.jpeg");

    //////  SEND IMAGES TO BACKEND //////////
    try {
      const response = await axios.post(
        "http://localhost:8080/files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  }, [webcamRef, canvasRef]);

  const startCapture = useCallback(() => {
    if (!intervalId) {
      const id = setInterval(() => {
        if (!isCapturing) {
          setIsCapturing(true);
          capture().finally(() => setIsCapturing(false));
        }
      }, 2000); // Capture every 2 seconds
      setIntervalId(id);
    }
  }, [capture, intervalId, isCapturing]);

  const stopCapture = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsCapturing(false);
    }
  }, [intervalId]);

  useEffect(() => {
    return () => {
      // Clean up interval on component unmount
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  // WEBCAM AND CANVAS WITH ABSOLUTE POSITIONS FOR OVERLAY CANVAS OVER WEBCAM BY Z INDEX
  return (
    <div className="scan">
      <h1>Grayscale Webcam Feed</h1>

      <Webcam
        audio={false}
        ref={webcamRef}
        style={{ position: "absolute", zIndex: 8 }}
      />
      <canvas ref={canvasRef} style={{ position: "absolute", zIndex: 9 }} />

      <button onClick={startCapture}>SCAN START</button>
      <button onClick={stopCapture}>SCAN STOP</button>
    </div>
  );
}

export default Scan;
