import React, { useState } from 'react';
import { VideoUploader } from './VideoUploader';
import { VideoPlayer } from './VideoPlayer';
import { DrawingCanvas } from './DrawingCanvas';

function App() {
  const [videoFile, setVideoFile] = useState(null);

  return (
    <div className="App">
      <VideoUploader onUpload={setVideoFile} />
      {videoFile && (
        <>
          <VideoPlayer videoFile={videoFile} />
          <DrawingCanvas />
        </>
      )}
    </div>
  );
}

export default App;
