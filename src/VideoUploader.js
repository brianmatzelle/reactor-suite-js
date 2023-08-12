import React, { useState, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';

// Commented out code is for uploading a video file (drag and drop or click to upload)
export const VideoUploader = ({ onUpload, onYoutubeLink }) => {
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
  
  const [youtubeLink, setYoutubeLink] = useState('');
  const [hoverSubmit, setHoverSubmit] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [videoAdded, setVideoAdded] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoAdded) {
        setShowCursor(true);
      }
      else {
        setShowCursor(!showCursor);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [showCursor, videoAdded]);

  
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
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        flexDirection: 'row',
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
        <div style={{
          fontSize: '1rem',
          color: '#FFFFFF',
          width: '20px',
          // backgroundColor: '#FF0000',
          paddingBottom: '0.5rem',
        }}>
          {/* make the _ flashing similar to a cursor */}
          &nbsp;
          {showCursor && '_'}
          {/* {!showCursor && <span>&nbsp;&nbsp;</span>} */}
          &nbsp;
        </div>
        <span style={{
          fontSize: '1rem',
          color: '#FFFFFF',
          paddingBottom: '0.4rem',
        }}>
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
          setVideoAdded(true);     
        }}
        >Draw!</button>
        {/* <AwesomeButton
          cssModule={AwesomeButtonStyles}
          type="primary"
          onPress={() => {
            // do something
          }}>
          Draw!
        </AwesomeButton> */}
      </form>
    </div>
  );
};
