import React, { useState, useRef, useEffect } from 'react';
import { VideoUploader } from './VideoUploader';
import { VideoPlayer } from './VideoPlayer';
import { DrawingCanvas } from './DrawingCanvas';
import { YoutubePlayer } from './YoutubePlayer';

function App() {
  // State variables for video file, drawing mode, reset drawing, youtube link, initial dimensions and player options
  const [videoFile, setVideoFile] = useState(null);
  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [resetDrawing, setResetDrawing] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState(null);
  const containerRef = useRef();
  const [initialDimensions, setInitialDimensions] = useState({
    width: window.innerWidth,
    height: ((window.innerWidth) * 9) / 16,
  });
  const [playerOpts, setPlayerOpts] = useState(initialDimensions);

  // Function to toggle drawing mode on/off
  const toggleDrawing = () => {
    setDrawingEnabled(!drawingEnabled);
  };

  // Function to reset the drawing canvas
  const resetDrawingHandler = () => {
    setResetDrawing((prevState) => !prevState);
  };

  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  // Effect to update player options when window is resized
  useEffect(() => {
    const updatePlayerOpts = () => {
      setPlayerOpts({
        width: window.innerWidth,
        height: ((window.innerWidth) * 9) / 16,
      });
    };

    window.addEventListener('resize', updatePlayerOpts);

    return () => {
      window.removeEventListener('resize', updatePlayerOpts);
    };
  }, []);

  // Calculate scaling factor for the drawing canvas
  const scalingFactor = {
    x: playerOpts.width / initialDimensions.width,
    y: playerOpts.height / initialDimensions.height,
  };

  return (
    <div className="App">
      {/* Render VideoUploader component to upload a video file or provide a YouTube link */}
      <VideoUploader onUpload={setVideoFile} onYoutubeLink={setYoutubeLink} />
      {(videoFile || youtubeLink) && (
        <div ref={containerRef} style={{ position: 'relative', width: playerOpts.width, height: playerOpts.height }}>
          {/* Conditionally render VideoPlayer or YoutubePlayer based on the input */}
          {videoFile ? (
            <VideoPlayer
              videoFile={videoFile}
              drawingEnabled={drawingEnabled}
              toggleDrawing={toggleDrawing}
              resetDrawing={resetDrawingHandler}
              toggleFullscreen={toggleFullscreen}
              opts={playerOpts}
            />
          ) : (
            <YoutubePlayer 
              youtubeLink={youtubeLink} 
              opts={playerOpts} 
              drawingEnabled={drawingEnabled}
              toggleDrawing={toggleDrawing}
              resetDrawing={resetDrawingHandler}
              toggleFullscreen={toggleFullscreen}
            />
          )}
          {/* Render DrawingCanvas component */}
          <DrawingCanvas 
            drawingEnabled={drawingEnabled} 
            resetDrawing={resetDrawing} 
            opts={playerOpts}
            toggleDrawing={toggleDrawing}
            resetDrawingHandler={resetDrawingHandler}
            scalingFactor={scalingFactor}
          />
        </div>
      )}
    </div>
  );
}

export default App;
