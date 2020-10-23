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
    // Keeps track of the generationseration produced
    const [generations, setGenerations] = useState(0);

    // Toggle's Recursive Algorithm on & off
    const [running, setRunning] = useState(false)

    // Array DataStructure -> resting state for dead and alive cells
    const [grid, setGrid] = useState(Array.from({ length: nRows, }).map(() => Array.from({ length: nCols }).fill(0)))

    // Help Function hhelps us ref recursive state. useRef hooks allows this.App
    const runningRef = useRef(running)
        runningRef.current = running

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
                        gridDup[n][i] = Math.floor(Math.random() * 2)
                    }
                    setGenerations(0)
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

    setTimeout(runSimulation, nSecs, setGenerations((prevCount) => prevCount + 1))
  }, [])
    
 

    return(
        <>
        <div>Generation: {generations}</div>
        <div><h1>Section</h1></div>

        <div>

            <button
						onClick={() => {
							setRunning(!running)
							if (!running) {
								runningRef.current = true
								runSimulation()
							}
						}}>
						{running ? 'Stop' : 'Start'}
			</button>
            <button
						onClick={() => {
							setGenerations(0)
							setRunning(false)
							setGrid(Array.from({ length: nRows }).map(() => Array.from({ length: nCols }).fill(0)))
						}}>
						Clear
					</button>
            <button onClick={faster}>Fast</button>
            <button onClick={slower}>Slow</button>
            <button onClick={seedCells}>Seed Cells</button>
        </div>
        <div style={{ boxShadow: '12px 12px 14px black', display: 'grid', gridTemplateColumns: `repeat(${nCols}, 20px)` }}>
					{grid.map((gridRows, i) =>
						gridRows.map((col, k) =>
							running ? (
								<div
									key={`${i}-${k}`}
									style={{
										width: 20,
										height: 20,
										/*Inline Styling to Show Cell Death and Life on Each Version of State */
										background: grid[i][k] ? 'steelblue' : 'white',
                    border: '1px solid navy',
									}}
								/>
							) : (
								<div
									key={`${i}-${k}`}
									style={{
										width: 20,
										height: 20,
										background: grid[i][k] ? 'steelblue' : 'white',
										border: '1px solid navy',
									}}
									onClick={() => {
										const newGrid = produce(grid, (gridCopy) => {
											gridCopy[i][k] = gridCopy[i][k] ? 0 : 1
										})
										setGrid(newGrid)
									}}
								/>
							),
						),
					)}
		    </div>
                <div>
                    <button onClick={tenGrid}>10 X 10 Grid</button>
                    <button onClick={qrtGrid}>25 X 25 Grid</button>
                    <button onClick={fiftyGrid}>50 X 50 Grid</button>
                </div>
        </>
    )
}

export default Main;