import React from 'react';


const Info = () => {

    return(
        <>
        <section>
            
            <div className="infoContainer">
                <h3>Rules:</h3>
                <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent.</p>

            </div>
            <div className="infoContainer">
                <ul>
                    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                </ul>
            </div>
            <div className="infoContainer">
                <p>These rules, which compare the behavior of the automaton to real life, can be condensed into the following:</p>
                <ul>
                    <li>Any live cell with two or three live neighbours survives.</li>
                    <li>Any dead cell with three live neighbours becomes a live cell.</li>
                    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                </ul>
            </div>

        </section>
        <section>
            <footer>
                <div><p>Created by Jesus Rodriguez</p></div>
            </footer>
        </section>
        </>
    )
}

export default Info