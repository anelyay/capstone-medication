// import { useState, useRef, useCallback } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// function WebcamImage() {
//   const webcamRef = useRef(null);
//   const [img, setImg] = useState(null);
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const capture = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);

//     const imageSrc = webcamRef.current.getScreenshot();
//     setImg(imageSrc);

//     try {
//       const blob = await fetch(imageSrc).then((res) => res.blob());
//       const formData = new FormData();
//       formData.append("screenshots", blob, "image.jpeg");

//       const response = await axios.post(
//         "http://localhost:8080/files",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("response", response.data);
//       setData(response.data);
//     } catch (err) {
//       console.error("Error uploading image:", err);
//       setError("Failed to recognize the text. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [webcamRef]);

//   const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user",
//   };

//   return (
//     <div className="Container">
//       {img === null ? (
//         <>
//           <Webcam
//             screenshotFormat="image/jpeg"
//             videoConstraints={videoConstraints}
//             audio={false}
//             width={1280}
//             height={720}
//             ref={webcamRef}
//             mirrored={false}
//           />
//           <button onClick={capture}>Capture photo</button>
//         </>
//       ) : (
//         <>
//           <Webcam
//             screenshotFormat="image/jpeg"
//             videoConstraints={videoConstraints}
//             audio={false}
//             height={720}
//             width={1280}
//             ref={webcamRef}
//             mirrored={false}
//           />
//           <img src={img} alt="screenshot" />
//           <button onClick={() => setImg(null)}>Recapture</button>
//         </>
//       )}

//       {isLoading && <p>Recognising...</p>}
//       {error && <p className="error">{error}</p>}
//       {data && <p>Data: {JSON.stringify(data)}</p>}
//     </div>
//   );
// }


import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";

function WebcamImage() {
  const webcamRef = useRef(null);
  const [img, setImg] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const preprocessImage = (imageSrc) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        // Convert to gray  scale
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);

        const threshold = 150;
        for (let i = 0; i < data.length; i += 4) {
          const avg = data[i];
          const value = avg >= threshold ? 255 : 0;
          data[i] = value; 
          data[i + 1] = value;
          data[i + 2] = value;
        }
        ctx.putImageData(imageData, 0, 0);

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  const capture = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const imageSrc = webcamRef.current.getScreenshot();
    const preprocessedImageSrc = await preprocessImage(imageSrc);
    setImg(preprocessedImageSrc);

    try {
      const blob = await fetch(preprocessedImageSrc).then((res) => res.blob());
      const formData = new FormData();
      formData.append("screenshots", blob, "image.jpeg");

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
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to recognize the text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [webcamRef]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            audio={false}
            width={1280}
            height={720}
            ref={webcamRef}
            mirrored={false}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <Webcam
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            audio={false}
            height={720}
            width={1280}
            ref={webcamRef}
            mirrored={false}
          />
          <img src={img} alt="screenshot" />
          <button onClick={() => setImg(null)}>Recapture</button>
        </>
      )}

      {isLoading && <p>Recognising...</p>}
      {error && <p className="error">{error}</p>}
      {data && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
}

export default WebcamImage;
