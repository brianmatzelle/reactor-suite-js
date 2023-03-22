import React, { useState, useRef } from 'react';
import { VideoUploader } from './VideoUploader';
import { VideoPlayer } from './VideoPlayer';
import { DrawingCanvas } from './DrawingCanvas';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [resetDrawing, setResetDrawing] = useState(false);

  const toggleDrawing = () => {
    setDrawingEnabled(!drawingEnabled);
  };

  const resetDrawingHandler = () => {
    setResetDrawing((prevState) => !prevState);
  };

  const containerRef = useRef();

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div className="App">
      <VideoUploader onUpload={setVideoFile} />
      {videoFile && (
        <div ref={containerRef} style={{ position: 'relative', width: '640px', height: '480px' }}>
          <VideoPlayer videoFile={videoFile} drawingEnabled={drawingEnabled} toggleDrawing={toggleDrawing} resetDrawing={resetDrawingHandler} toggleFullscreen={toggleFullscreen} />
          <DrawingCanvas drawingEnabled={drawingEnabled} resetDrawing={resetDrawing} />
        </div>
      )}
      <button onClick={toggleDrawing}>{drawingEnabled ? 'Disable Drawing' : 'Enable Drawing'}</button>
      <button onClick={resetDrawingHandler}>Reset Drawing</button>
    </div>
  );
}

export default App;
