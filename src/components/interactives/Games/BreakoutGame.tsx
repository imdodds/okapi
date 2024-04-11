"use client"

import React, { useState, useRef, useEffect } from 'react';

const BreakoutGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ballPosition, setBallPosition] = useState({ x: 125, y: 125 });
  const [ballVelocity, setBallVelocity] = useState({ x: 1, y: 1 });
  const [paddlePosition, setPaddlePosition] = useState(25);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bricks, setBricks] = useState<number[][]>([]);
  const [bricksInitialized, setBricksInitialized] = useState(false);
  const animationRef = useRef<number>();

  const canvasWidth = 300;
  const canvasHeight = 200;
  const paddleWidth = 50;
  const paddleHeight = 10;
  const ballSize = 5;
  const brickRowCount = 5;
  const brickColumnCount = 7;
  const brickWidth = 30;
  const brickHeight = 15;
  const brickPadding = 5;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;

  const createBricksArray = (): number[][] => {
    const bricksArray: number[][] = [];
    for (let row = 0; row < brickRowCount; row++) {
      bricksArray[row] = [];
      for (let col = 0; col < brickColumnCount; col++) {
        bricksArray[row][col] = 1;
      }
    }
    return bricksArray;
  };

  const hasWon = (): boolean => {
    return bricks.every((row) => row.every((brick) => brick === 0));
  };

  useEffect(() => {
    if (isPlaying && !bricksInitialized) {
      setBricks(createBricksArray());
      setBricksInitialized(true);
    }
  }, [isPlaying, bricksInitialized]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setBallPosition((prevPosition) => ({
          x: prevPosition.x + ballVelocity.x,
          y: prevPosition.y + ballVelocity.y,
        }));
      }, 10);

      return () => clearInterval(interval);
    }
  }, [isPlaying, ballVelocity]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ballPosition.x, ballPosition.y, ballSize, 0, Math.PI * 2);
      ctx.fillStyle = '#0095DD';
      ctx.fill();
      ctx.closePath();
    };

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddlePosition, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = '#0095DD';
      ctx.fill();
      ctx.closePath();
    };

    const drawBricks = () => {
      bricks.forEach((row, rowIndex) => {
        row.forEach((brick, colIndex) => {
          if (brick === 1) {
            const brickX = colIndex * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = rowIndex * (brickHeight + brickPadding) + brickOffsetTop;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
          }
        });
      });
    };

    const collisionDetection = () => {
      const currentBricks = bricks;
      const updatedBricks = currentBricks.map((row) => [...row]);

      const ballBottom = ballPosition.y + ballSize;
      const ballRight = ballPosition.x + ballSize;

      // Check collision with paddle
      if (
        ballBottom > canvasHeight - paddleHeight &&
        ballPosition.x > paddlePosition &&
        ballPosition.x < paddlePosition + paddleWidth
      ) {
        setBallPosition((prevPosition) => ({ ...prevPosition, y: canvasHeight - paddleHeight - ballSize }));
        setBallVelocity((prevVelocity) => ({ x: prevVelocity.x, y: -prevVelocity.y }));
      }

      // Check collision with top edge
      if (ballPosition.y - ballSize < 0) {
        setBallPosition((prevPosition) => ({ ...prevPosition, y: ballSize }));
        setBallVelocity((prevVelocity) => ({ x: prevVelocity.x, y: -prevVelocity.y }));
      }

      // Check collision with right edge
      if (ballRight >= canvasWidth) {
        setBallPosition((prevPosition) => ({ ...prevPosition, x: canvasWidth - ballSize - 1 }));
        setBallVelocity((prevVelocity) => ({ x: -prevVelocity.x, y: prevVelocity.y }));
      }

      // Check collision with left edge
      if (ballPosition.x <= ballSize) {
        setBallPosition((prevPosition) => ({ ...prevPosition, x: ballSize + 1 }));
        setBallVelocity((prevVelocity) => ({ x: Math.abs(prevVelocity.x), y: prevVelocity.y }));
      }

      for (let r = 0; r < brickRowCount; r++) {
        for (let c = 0; c < brickColumnCount; c++) {
          const brick = updatedBricks[r][c];
          if (brick === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

            // Check collision with brick
            if (
              ballPosition.x < brickX + brickWidth &&
              ballRight > brickX &&
              ballPosition.y < brickY + brickHeight &&
              ballBottom > brickY
            ) {
              // Collision detected
              setBallVelocity((prevVelocity) => ({ x: prevVelocity.x, y: -prevVelocity.y }));
              setScore((prevScore) => prevScore + 1);
              updatedBricks[r][c] = 0; // Remove the brick
              break;
            }
          }
        }
      }

      setBricks(updatedBricks); // Update the bricks state after collision detection
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawBall();
      drawPaddle();
      if (bricksInitialized) {
        collisionDetection();
        drawBricks();
      }

      // Check if the player has won
      if (hasWon()) {
        setIsPlaying(false);
        // Display 'You win!' message
        ctx.font = '24px Arial';
        ctx.fillStyle = '#0095DD';
        ctx.textAlign = 'center';
        ctx.fillText('You win!', canvasWidth / 2, canvasHeight / 2);
      }

      // Check if the ball passes through the bottom
      if (ballPosition.y + ballSize > canvasHeight) {
        setGameOver(true);
        setIsPlaying(false);
      }

      animationRef.current = requestAnimationFrame(draw); // Schedule next frame
    };

    animationRef.current = requestAnimationFrame(draw); // Initial call to draw function

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current); // Cancel animation frame if it's defined
      }
    };
  }, [ballPosition, ballVelocity, bricksInitialized]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      const relativeX = e.clientX - canvasRef.current.offsetLeft;
      if (relativeX > 0 && relativeX < canvasWidth) {
        setPaddlePosition(relativeX - paddleWidth / 2);
      }
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setBallPosition({ x: paddlePosition, y: canvasHeight - paddleHeight });
    setBallVelocity({ x: 1, y: -1 });
    setScore(0);
    setBricksInitialized(false); // Reset bricksInitialized state
  };

  const toggleGame = () => {
    if (!isPlaying || gameOver) {
      startGame();
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseMove={handleMouseMove}
          style={{ border: '1px solid #000' }}
        ></canvas>
        <div className="mt-4 text-center">
          <p>Score: {score}</p>
          {gameOver && <p>Game Over!</p>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={toggleGame}
          >
            {gameOver ? 'Play Again' : (isPlaying ? 'Pause' : 'Start')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakoutGame;