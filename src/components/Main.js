import React, { useState, useCallback, useRef } from 'react';

// Package that uses a function produce to act as a double buffer by allowing you to return unmutable state
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
    // 10X10 Grid
    const tenGrid = () => {
        nRows = 10
        nCols = 10
     setGrid(Array.from({ length:nRows }).map(() => Array.from({ length:nCols }).fill(0)))

    }

    // 25X25 Grid
    const qrtGrid = () => {
        nRows = 25
        nCols = 25
     setGrid(Array.from({ length:nRows }).map(() => Array.from({ length:nCols }).fill(0)))
    }
    // 50X50 Grid
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
        setRunning(running)
        if (!running) {
            runningRef.current = true
            runSimulation();
        }
    }

    const faster =() => {
        nSecs = 30
        setRunning(running)
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
        <div><p>Generation: {generations}</p></div>
    
        <div>

            <button className="btn btn-one"
						onClick={() => {
							setRunning(!running)
							if (!running) {
								runningRef.current = true
								runSimulation()
							}
						}}>
						{running ? 'Stop' : 'Start'}
			</button>
            <button className="btn btn-one"
						onClick={() => {
							setGenerations(0)
							setRunning(false)
							setGrid(Array.from({ length: nRows }).map(() => Array.from({ length: nCols }).fill(0)))
						}}>
						Clear
					</button>
            <button className="btn btn-one" onClick={faster}>Fast</button>
            <button className="btn btn-one" onClick={slower}>Slow</button>
            
            
            
            <button className="btn btn-one" onClick={seedCells}>Seed Cells</button>
        </div>
        {/* Grid */}
        <div className="gridContainer" >
        <div style={{  display: 'grid', gridTemplateColumns: `repeat(${nCols}, 20px)` }}>
					{grid.map((gridRows, i) =>
						gridRows.map((col, k) =>
							running ? (
								<div
									key={`${i}-${k}`}
									style={{
										width: 20,
										height: 20,
										/*Inline Styling to Show Cell Death and Life on Each Version of State */
										background: grid[i][k] ? 'orange' : 'darkgreen',
                                        border: '1px solid #1B1C1E',
									}}
								/>
							) : (
								<div
									key={`${i}-${k}`}
									style={{
										width: 20,
										height: 20,
										background: grid[i][k] ? 'orange' : 'darkgreen',
										border: '1px solid #1B1C1E',
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
            </div>
                <div>
                    <button className="btn btn-one" onClick={tenGrid}>10X10</button>
                    <button className="btn btn-one" onClick={qrtGrid}>25X25</button>
                    <button className="btn btn-one" onClick={fiftyGrid}>50X50</button>
                </div>
        </>
    )
}

export default Main;