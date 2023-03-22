import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const VideoUploader = ({ onUpload, onYoutubeLink }) => {
  const [youtubeLink, setYoutubeLink] = useState('');
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'video/*',
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles[0]);
    },
  });

  const handleYoutubeLinkChange = (e) => {
    setYoutubeLink(e.target.value);
  };

  const handleYoutubeLinkSubmit = (e) => {
    e.preventDefault();
    if (youtubeLink) {
      onYoutubeLink(youtubeLink);
      setYoutubeLink('');
    }
  };

  return (
    <div>
      {/* <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive
          ? 'Drop the video here'
          : 'Drag and drop a video or click to upload'}
      </div> */}
      <form onSubmit={handleYoutubeLinkSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube link"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
