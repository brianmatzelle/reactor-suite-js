import React, { useRef, useEffect } from 'react';

export const VideoPlayer = ({ 
  videoFile, 
  drawingEnabled, 
  toggleDrawing, 
  resetDrawing, 
  toggleFullscreen,
  opts,
 }) => {
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!videoRef.current) return;

      if (e.code === 'Space') {
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      } else if (e.code === 'ArrowRight') {
        videoRef.current.currentTime += 5; // Fast-forward by 5 seconds
      } else if (e.code === 'ArrowLeft') {
        videoRef.current.currentTime -= 5; // Rewind by 5 seconds
      } else if (e.code === 'ArrowUp') {
        videoRef.current.volume += 0.1; // Increase volume by 10%
      } else if (e.code === 'ArrowDown') {
        videoRef.current.volume -= 0.1; // Decrease volume by 10%
      } else if (e.code === 'KeyE') {
        toggleDrawing(); // Toggle drawing mode when "e" is pressed
      } else if (e.code === 'KeyR') {
        resetDrawing(); // Reset drawing when "r" is pressed
      } else if (e.code === 'KeyF') {
        toggleFullscreen(); // Toggle fullscreen when "f" is pressed
      } else if (e.code === 'KeyK') {
        videoRef.current.currentTime -= 0.1; // Rewind by 100ms
      } else if (e.code === 'KeyL') {
        videoRef.current.currentTime += 0.1; // Fast-forward by 100ms
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleDrawing, resetDrawing, toggleFullscreen]);

  return (
    <video
      ref={videoRef}
      controls={!drawingEnabled}
      width={opts.width}
      height={opts.height}
      autoPlay
      muted
    />
  );
};
