import React, { useState, useRef, useEffect } from 'react';
import { VideoUploader } from './VideoUploader';
import { VideoPlayer } from './VideoPlayer';
import { DrawingCanvas } from './DrawingCanvas';
import { YoutubePlayer } from './YoutubePlayer';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [resetDrawing, setResetDrawing] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState(null);
  const containerRef = useRef();
  const [initialDimensions, setInitialDimensions] = useState({
    width: window.innerWidth,
    height: ((window.innerWidth - 200) * 9) / 16,
  });
  const [playerOpts, setPlayerOpts] = useState(initialDimensions);

  const toggleDrawing = () => {
    setDrawingEnabled(!drawingEnabled);
  };

  const resetDrawingHandler = () => {
    setResetDrawing((prevState) => !prevState);
  };


  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };


  useEffect(() => {
    const updatePlayerOpts = () => {
      setPlayerOpts({
        width: window.innerWidth,
        height: ((window.innerWidth - 150) * 9) / 16,
      });
    };

    window.addEventListener('resize', updatePlayerOpts);

    return () => {
      window.removeEventListener('resize', updatePlayerOpts);
    };
  }, []);

  const scalingFactor = {
    x: playerOpts.width / initialDimensions.width,
    y: playerOpts.height / initialDimensions.height,
  };

  return (
    <div className="App">
      <VideoUploader onUpload={setVideoFile} onYoutubeLink={setYoutubeLink} />
      {(videoFile || youtubeLink) && (
        <div ref={containerRef} style={{ position: 'relative', width: playerOpts.width, height: playerOpts.height }}>
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
