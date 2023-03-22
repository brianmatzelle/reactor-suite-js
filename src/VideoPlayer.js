import React, { useRef, useEffect } from 'react';

export const VideoPlayer = ({ videoFile, drawingEnabled }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      const videoUrl = URL.createObjectURL(videoFile);
      videoRef.current.src = videoUrl;

      return () => {
        URL.revokeObjectURL(videoUrl);
      };
    }
  }, [videoFile]);

  return (
    <video
      ref={videoRef}
      controls={!drawingEnabled}
      width="640"
      height="480"
      autoPlay
      muted
    />
  );
};
