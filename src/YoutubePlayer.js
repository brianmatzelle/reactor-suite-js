import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

export const YoutubePlayer = ({ 
  youtubeLink, 
  opts, 
  drawingEnabled,
  toggleDrawing,
  resetDrawing,
  toggleFullscreen,
 }) => {
  const videoId = new URL(youtubeLink).searchParams.get('v');
  const playerRef = useRef(null);

  const handlePlayerStateChange = (event) => {
    if (drawingEnabled) {
      // Disable built-in controls when drawing is enabled
      event.target.unMute();
      event.target.setVolume(100);
    }

    playerRef.current = event.target;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const player = playerRef.current;

      if (!player) return;

      if (e.code === 'Space') {
        if (player.getPlayerState() === YouTube.PlayerState.PLAYING) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
      } else if (e.code === 'ArrowRight') {
        player.seekTo(player.getCurrentTime() + 5, true);
      } else if (e.code === 'ArrowLeft') {
        player.seekTo(player.getCurrentTime() - 5, true);
      } else if (e.code === 'ArrowUp') {
        player.setVolume(player.getVolume() + 10);
      } else if (e.code === 'ArrowDown') {
        player.setVolume(player.getVolume() - 10);
      } else if (e.code === 'KeyE') {
        toggleDrawing(); // Toggle drawing mode when "e" is pressed
      } else if (e.code === 'KeyC') {
        resetDrawing(); // Reset drawing when "r" is pressed
      } else if (e.code === 'KeyF') {
        toggleFullscreen(); // Toggle fullscreen when "f" is pressed
      } else if (e.code === 'KeyK') {
        player.seekTo(player.getCurrentTime() - 0.1, true); // Rewind by 100ms
      } else if (e.code === 'KeyL') {
        player.seekTo(player.getCurrentTime() + 0.1, true); // Fast-forward by 100ms
      }

      // Add any other keyboard controls you want to maintain when drawing is enabled
    };

    if (drawingEnabled) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (drawingEnabled) {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [drawingEnabled, toggleDrawing, resetDrawing, toggleFullscreen]);

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onStateChange={handlePlayerStateChange}
    />
  );
};
