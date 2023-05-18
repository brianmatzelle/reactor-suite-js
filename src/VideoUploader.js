import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';

// Commented out code is for uploading a video file (drag and drop or click to upload)
export const VideoUploader = ({ onUpload, onYoutubeLink }) => {
  const [youtubeLink, setYoutubeLink] = useState('');
  /*
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'video/*',
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles[0]);
    },
  });
  */

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

  const [hoverSubmit, setHoverSubmit] = useState(false);
  const [clickSubmit, setClickSubmit] = useState(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100vw',
      height: '20vh',
      paddingTop: '3rem',
    }}>
      <a href="https://matzelle.co/" style={{
        marginBottom: '1rem',
        marginLeft: '5rem',
        textDecoration: 'none',
      }}>
        <span style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
        }}>
          Reactor
          <span style={{
            color: '#FF0000',
          }}>
            Suite
          </span>
        </span>
        <span style={{
          fontSize: '1rem',
          color: '#FFFFFF',
        }}>
          &nbsp;_&nbsp;
          a tool to help you annotate and analyze YouTube videos
        </span>
      </a>
      
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
          style={{
            width: '50vw',
            fontSize: '1.3rem',
            borderRadius: '0.5rem',
            border: 'none',
            outline: 'none',
            padding: '0.5rem',
            maxWidth: '500px',
            marginLeft: '8rem',
          }}
        />
        <button type="submit" style={{
          width: '10vw',
          fontSize: '1.3rem',
          borderRadius: '0.5rem',
          border: 'none',
          outline: 'none',
          padding: '0.5rem',
          marginLeft: '1rem',
          backgroundColor: hoverSubmit ? 'white' : '#FF0000',
          color: hoverSubmit ? '#FF0000' : 'white',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHoverSubmit(true)}
        onMouseLeave={() => setHoverSubmit(false)}
        onMouseDown={() => {
          setClickSubmit(false);
        }}
        onMouseUp={() => {
          setClickSubmit(true);
        }}
        >Draw!</button>
      </form>
    </div>
  );
};
