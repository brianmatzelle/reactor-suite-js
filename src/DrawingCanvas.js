import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';

export const DrawingCanvas = ({
  drawingEnabled,
  resetDrawing,
  opts,
  toggleDrawing,
  resetDrawingHandler,
  scalingFactor,
}) => {
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState('red');
  const [undoneLines, setUndoneLines] = useState([]);
  const [lineWidth, setLineWidth] = useState(5);
  const isDrawing = useRef(false);

  useEffect(() => {
    setLines([]);
  }, [resetDrawing]);

  const scalePointerPosition = (pos) => {
    return {
      x: pos.x / scalingFactor.x,
      y: pos.y / scalingFactor.y,
    };
  };

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
  

  const manageLineHistory = (action) => {
    if (action === 'undo' && lines.length > 0) {
      setUndoneLines([...undoneLines, lines.pop()]);
      setLines([...lines]);
    } else if (action === 'redo' && undoneLines.length > 0) {
      setLines([...lines, undoneLines.pop()]);
      setUndoneLines([...undoneLines]);
    }
  };

  const colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'blueviolet'];
  const colorButtons = colors.map((c) => (
    <button key={c} onClick={() => setColor(c)} style={{ backgroundColor: c, width: '20px', height: '20px' }}></button>
  ));

  return (
    <>
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
        <button
          onClick={toggleDrawing}
          style={{ opacity: 1 }}
        >
          {drawingEnabled ? 'Disable Drawing Mode' : 'Enable Drawing Mode'}
        </button>
        <button
          onClick={resetDrawingHandler}
          style={{ marginRight: '5px', opacity: 1 }}
        >
          Clear Drawing
        </button>
        {colorButtons}
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
