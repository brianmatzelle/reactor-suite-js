import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';

export const DrawingCanvas = ({ 
  drawingEnabled, 
  resetDrawing,
  opts,
 }) => {
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState('red');
  const isDrawing = useRef(false);

  useEffect(() => {
    setLines([]);
  }, [resetDrawing]);

    // Clear the lines state when the resetDrawing prop changes
    useEffect(() => {
        setLines([]);
    }, [resetDrawing]);

  const handleMouseDown = (e) => {
    if (!drawingEnabled) return;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], color }]); // Update this line
  };

  const handleMouseMove = (e) => {
    if (!drawingEnabled || !isDrawing.current) return;
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    const newLine = { ...lastLine, points: lastLine.points.concat([pos.x, pos.y]) }; // Update this line
    const newLines = lines.slice(0, lines.length - 1).concat([newLine]);
    setLines(newLines);
  };

  const handleMouseUp = () => {
    if (!drawingEnabled) return;
    isDrawing.current = false;
  };

  return (
    <>
      <div style={{ position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)' }}>
        <button onClick={() => setColor('black')} style={{ backgroundColor: 'black', width: '20px', height: '20px' }}></button>
        <button onClick={() => setColor('white')} style={{ backgroundColor: 'white', width: '20px', height: '20px' }}></button>
        <button onClick={() => setColor('red')} style={{ backgroundColor: 'red', width: '20px', height: '20px' }}></button>
        <button onClick={() => setColor('blue')} style={{ backgroundColor: 'blue', width: '20px', height: '20px' }}></button>
        <button onClick={() => setColor('green')} style={{ backgroundColor: 'green', width: '20px', height: '20px' }}></button>
        <button onClick={() => setColor('yellow')} style={{ backgroundColor: 'yellow', width: '20px', height: '20px' }}></button>
        <button onClick={() => setColor('blueviolet')} style={{ backgroundColor: 'blueviolet', width: '20px', height: '20px' }}></button>
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
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line key={i} points={line.points} stroke={line.color} strokeWidth={5} lineCap="round" lineJoin="round" /> // Update this line
          ))}
        </Layer>
      </Stage>
    </>
  );
};
