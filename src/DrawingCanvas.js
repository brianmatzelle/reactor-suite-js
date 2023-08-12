// Import necessary hooks and components from React and react-konva
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Line } from 'react-konva';

// Define the DrawingCanvas component, which receives several props
export const DrawingCanvas = ({
  drawingEnabled,
  resetDrawing,
  opts,
  toggleDrawing,
  resetDrawingHandler,
  scalingFactor,
}) => {
  // Declare state variables for lines, color, undoneLines, and lineWidth
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState('red');
  const [undoneLines, setUndoneLines] = useState([]);
  const [lineWidth, setLineWidth] = useState(5);
  const isDrawing = useRef(false);

  // Reset lines when resetDrawing changes
  useEffect(() => {
    setLines([]);
  }, [resetDrawing]);

  // Function to scale the pointer position based on the scaling factor
  const scalePointerPosition = (pos) => {
    return {
      x: pos.x / scalingFactor.x,
      y: pos.y / scalingFactor.y,
    };
  };

  // Function to handle drawing events (mousedown, mousemove, and mouseup)
  const handleDrawEvent = (e, eventType) => {
    if (!drawingEnabled) return;
    const stage = e.target.getStage();
    const pos = scalePointerPosition(stage.getPointerPosition());
  
    if (eventType === 'mousedown') {
      isDrawing.current = true;
      setLines([...lines, { points: [pos.x, pos.y], color, strokeWidth: lineWidth }]);
    } else if (eventType === 'mousemove' && isDrawing.current) {
      const lastLine = lines[lines.length - 1];
      const newLine = { ...lastLine, points: lastLine.points.concat([pos.x, pos.y]) };
      setLines(lines.slice(0, -1).concat([newLine]));
    } else if (eventType === 'mouseup') {
      isDrawing.current = false;
    }
  };

  // Function to manage the line history for undo and redo actions
  const manageLineHistory = useCallback((action) => {
    if (action === 'undo' && lines.length > 0) {
      setUndoneLines([...undoneLines, lines.pop()]);
      setLines([...lines]);
    } else if (action === 'redo' && undoneLines.length > 0) {
      setLines([...lines, undoneLines.pop()]);
      setUndoneLines([...undoneLines]);
    }}, [lines, undoneLines]);

  // useEffect hook to handle undo and redo using keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (drawingEnabled) {
        if (e.key === 'z') {
          manageLineHistory('undo');
        } else if (e.key === 'r') {
          manageLineHistory('redo');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawingEnabled, manageLineHistory]);

  // Define colors and create color buttons for the toolbar
  const colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'blueviolet'];
  const colorButtons = colors.map((c) => (
    <button key={c} onClick={() => setColor(c)} style={{ backgroundColor: c, width: '20px', height: '20px' }}></button>
  ));

  // Return the DrawingCanvas component JSX
  return (
    <>
    {/* Toolbar for drawing options */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'fixed',
          top: '25px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '1000',
        }}
      >
      {/* Toggle drawing mode button */}
      <button
        onClick={toggleDrawing}
        style={{ opacity: 1 }}
      >
        {drawingEnabled ? 'Disable Drawing Mode' : 'Enable Drawing Mode'}
      </button>
      {/* Clear drawing button */}
      <button
        onClick={resetDrawingHandler}
        style={{ marginRight: '5px', opacity: 1 }}
      >
        Clear Drawing
      </button>
      {/* Color buttons */}
      {colorButtons}
      {/* Undo button */}
      <button
        onClick={() => manageLineHistory('undo')}
        style={{
          height: '20px',
          width: '50px',
          marginLeft: '5px',
          opacity: 1,
        }}
      >
        Undo
      </button>
      {/* Redo button */}
      <button
        onClick={() => manageLineHistory('redo')}
        style={{
          height: '20px',
          width: '50px',
          opacity: 1,
        }}
      >
        Redo
      </button>
      {/* Pencil size input */}
      <div style={{ marginLeft: '5px' }}>
        <label
          htmlFor="lineWidth"
          style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            opacity: 1,
          }}
        >
          Pencil size: {lineWidth}
        </label>
        <input
          type="range"
          id="lineWidth"
          name="lineWidth"
          min="1"
          max="50"
          value={lineWidth}
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
          style={{ opacity: 1 }}
        />
      </div>
    </div>
    {/* Drawing canvas */}
    <Stage
      width={opts.width}
      height={opts.height}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        pointerEvents: drawingEnabled ? 'auto' : 'none',
      }}
      onMouseDown={(e) => handleDrawEvent(e, 'mousedown')}
      onMousemove={(e) => handleDrawEvent(e, 'mousemove')}
      onMouseup={(e) => handleDrawEvent(e, 'mouseup')}
    >
      {/* Layer to hold Line components */}
      <Layer>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points.map((p, index) => (index % 2 === 0 ? p * scalingFactor.x : p * scalingFactor.y))}
          stroke={line.color}
          strokeWidth={line.strokeWidth}
          lineCap="round"
          lineJoin="round"
        />
      ))}
      </Layer>
    </Stage>
  </>
  );
};