import React from 'react';

export const VideoPlayer = ({ videoFile }) => {
  return (
    <video src={URL.createObjectURL(videoFile)} width="640" height="480" controls>
      Your browser does not support the video tag.
    </video>
  );
};
