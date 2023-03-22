import React from 'react';
import { useDropzone } from 'react-dropzone';

export const VideoUploader = ({ onUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'video/*',
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles[0]);
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? 'Drop the video here' : 'Drag and drop a video or click to upload'}
    </div>
  );
};
