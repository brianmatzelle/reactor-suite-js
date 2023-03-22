import React, { useState, useRef } from 'react';
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

  const playerOpts = {
    width: window.innerWidth,
    height: (window.innerWidth * 9) / 16,
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
            />
        </div>
      )}
      <button onClick={toggleDrawing}>{drawingEnabled ? 'Disable Drawing Mode' : 'Enable Drawing Mode'}</button>
      <button onClick={resetDrawingHandler}>Clear Drawing</button>
    </div>
  );
}

export default App;
