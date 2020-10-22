import React, { useState, useCallback, useRef } from 'react';

// Package that uses a function produce to act as a double buffer by allowing you  to return unmutable state

import produce from 'immer';

// Checking neighbor in the location of the square 
const operations = [
    [0, 1],
	[1, 1],
	[0, -1],
	[1, -1],
	[-1, 1],
	[-1, -1],
	[1, 0],
	[-1, 0],
]

// Grid Size, Speed variables

let nRows = 15
let nCols = 15
let nSecs = 100


const Main = () => {
    // States
    // Keeps track of the generation produced
    const [gen, setGen] = useState(0)

    // Toggle's Recursive Algorithm on & off
    const [running, setRunning] = useState(false)

    // Array DataStructure -> resting state for dead and alive cells
    const [grid, setGrid] = useState(Array.from({ length: nRows, }).map(() => Array.from({ length: nCols }).fill(0)))

    // Help Function hhelps us ref recursive state. useRef hooks allows this.App
    const runningRef = useRef(running)
    runningRef.current = runningRef

    // Changes grid size
    const tenGrid = () => {
        nRows = 10
        nCols = 10
     setGrid(Array.from({ length:nRows }).map(() => Array.from({ length:nCols }).fill(0)))

    }

    const qrtGrid = () => {
        nRows = 25
        nCols = 25
     setGrid(Array.from({ length:nRows }).map(() => Array.from({ length:nCols }).fill(0)))
    }

    const fiftyGrid = () => {
        nRows = 50
        nCols = 50
     setGrid(Array.from({ length:nRows }).map(() => Array.from({ length:nCols }).fill(0)))
    }

    // Seed Random data of alive and dead cells in the grid
    const seedCells = () => {
        setGrid((k) => {
            return produce(k, (gridDup) => {
                for (let n = 0; n < nRows; n++) {
                    for (let i = 0; i < nCols; i++) {
                        gridDup[n][i] = Math.floow(Math.random() * 2)
                    }
                    setGen(0)
                    setRunning(false)
                }
            })
        })
    }

    // Speed assignment function and algorithim toggled to start
    const slower =() => {
        nSecs = 1000
        setRunning(!running)
        if (!running) {
            runningRef.current = true
            runSimulation();
        }
    }

    const faster =() => {
        nSecs = 30
        setRunning(!running)
        if (!running) {
            runningRef.current = true
            runSimulation();
        }
    }

    //useCallback Hook allowing algorithim to run as a callback
    
    const runSimulation = useCallback(() => {
		if (!runningRef.current) {
			return
		}
		
		setGrid(g => {
            return produce(g, gridDup => {
              for (let i = 0; i < nRows; i++) {
                for (let k = 0; k < nCols; k++) {
                  let neighbors = 0;

                    // Checks neighbors and switches between life and death
					// eslint-disable-next-line
                  operations.forEach(([x, y]) => {
                    const newI = i + x;
                    const newK = k + y;
                    if (newI >= 0 && newI < nRows && newK >= 0 && newK < nCols) {
                      neighbors += g[newI][newK];
                    }
                  });
      
                  if (neighbors < 2 || neighbors > 3) {
                    gridDup[i][k] = 0;
                  } else if (g[i][k] === 0 && neighbors === 3) {
                    gridDup[i][k] = 1;
                  }
                }
            }
        });
    });

    setTimeout(runSimulation, nSecs, setGen((prevCount) => prevCount + 1))
  }, [])
    
 

    return(
        <>
        <div>{gen}</div>
        <div><h1>Section</h1></div>

        <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${nCols}, 20px)`
        }}
      >
        {grid.map((gridRows, i) =>
          gridRows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridDup => {
                  gridDup[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "pink" : undefined,
                border: "solid 1px black"
              }}
            />
          ))
        )}
      </div>
        </>
    )
}

export default Main;