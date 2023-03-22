import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';

export const DrawingCanvas = ({ drawingEnabled, resetDrawing }) => {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

    // Clear the lines state when the resetDrawing prop changes
    useEffect(() => {
        setLines([]);
    }, [resetDrawing]);

  const handleMouseDown = (e) => {
    if (!drawingEnabled) return;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, [pos.x, pos.y]]);
  };

  const handleMouseMove = (e) => {
    if (!drawingEnabled || !isDrawing.current) return;
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    const newLine = lastLine.concat([pos.x, pos.y]);
    const newLines = lines.slice(0, lines.length - 1).concat([newLine]);
    setLines(newLines);
  };

  const handleMouseUp = () => {
    if (!drawingEnabled) return;
    isDrawing.current = false;
  };

  return (
    <Stage
      width={640}
      height={480}
      style={{ position: 'absolute', top: '0', left: '0' }}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line key={i} points={line} stroke="red" strokeWidth={5} lineCap="round" lineJoin="round" />
        ))}
      </Layer>
    </Stage>
  );
};
