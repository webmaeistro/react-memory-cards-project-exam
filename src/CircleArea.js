import React, { useState } from "react"
import SingleCircle from "./SingleCircle"

let selections = []
let checkProgress = false
let ready = false

const images = [
    "./images/bacon.jpg",
    "./images/curry-rice.jpg",
    "./images/sea-urchin.jpg",
    "./images/salad.jpg",
    "./images/ice-cream.jpg",
    "./images/ebi.jpg",
    "./images/pizza.jpg",
    "./images/fish.jpg"
]

const buttonStyle = {
    border: "2px solid #000",
    backgroundColor: "transparent",
    color: "#000",
    marginBottom: "10px",
    cursor: "pointer",
    padding: "10px 15px 10px",
    textTransform: "uppercase"
}

const CircleArea = () => {
    const [score, updateScore] = useState(0)
    const [pairs, updatePairs] = useState([])
    const [grids, updateGrids] = useState([])
    const [gameInProgress, updateGameInProgress] = useState(false)
    const [completed, updateCompleted] = useState(false)
    const rows = 4
    const columns = 4

    // Generate pairs
    const generatePairs = gridList => {
        // Count the number of pairs needed
        const totalGrids = rows * columns
        const pairsRequired = totalGrids / 2
        let pairList = []
        for (let i = 0; i < pairsRequired; i++) {
            pairList.push({
                clicked: false,
                pair: []
            })
        }

        for (let i = 0; i < totalGrids; i++) {
            const inserted = false
            while (!inserted) {
                const pairIdx = Math.floor(
                    Math.random() * Math.floor(pairsRequired)
                )
                if (pairList[pairIdx].pair.length < 2) {
                    const newPair = [...pairList[pairIdx].pair, i].sort(
                        (a, b) => a - b
                    )
                    pairList[pairIdx].pair = newPair
                    inserted = true
                }
            }
        }

        let newImgGrids = { ...gridList }
        pairList.forEach((obj, idx) => {
            const { pair } = obj
            const image = images[idx]
            newImgGrids[pair[0]].image = image
            newImgGrids[pair[1]].image = image
            updatePairs(pairList)
            return gridList
        })
        console.log("pair: ", pairList)
    }

    // Begin to close the cards
    const closeCards = gridList => {
        // Set gameStatus to stop
        //updateGameStatus(GAME_START)
        const gridUpdate = gridList.map(obj => {
            return {
                ...obj,
                show: false
            }
        })
        updateGrids(gridUpdate)
        ready = true
    }
    const startGame = gridList => {
        ready = false
        // Begin the animation
        console.log("Starting game")
        // Give users 5 second to memorize the card
        generatePairs(gridList)
        updateGrids(gridList)
        setTimeout(() => closeCards(gridList), 5000)
    }
    const circleWrapperStyle = {
        margin: "0 auto",
        marginBottom: 40,
        width: 10 * 5 + 80 * 5,
        height: 10 * 5 + 80 * 5
    }
    const onStart = () => {
        updateGameInProgress(true)
        let gridList = []
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                gridList.push({
                    key: i * 4 + j,
                    pos: i * 4 + j,
                    show: true
                })
            }
        }
        updateCompleted(false)
        startGame(gridList)
    }
    const finishGame = () => {
        updateCompleted(true)
        updateGameInProgress(true)
    }
    const onCircleClick = pos => {
        selections.push(pos)
        if (checkProgress || !ready) return
        if (selections.length == 2) {
            checkProgress = true
            let newGrids = [...grids]
            newGrids[pos] = {
                ...newGrids[pos],
                show: true
            }

            updateGrids(newGrids)
            selections = selections.sort((a, b) => a - b)
            // Check selections and determine if correct
            const correct = pairs.filter(obj => {
                const { pair } = obj
                if (pair[0] == selections[0] && pair[1] == selections[1])
                    return true
            })
            console.log("Correct check: ", correct)

            let updatedGrids = [...newGrids]
            if (correct.length > 0) {
                updatedGrids[selections[0]].guessed = true
                updatedGrids[selections[1]].guessed = true
            }
            // Check if game has finished
            let finishedCount = 0
            updatedGrids.forEach(obj => {
                if (obj.guessed) finishedCount++
            })
            console.log("Finished count: ", finishedCount)

            selections = []
            if (finishedCount == updatedGrids.length) {
                checkProgress = false
                finishGame()
                return
            }
            let clearGrids = updatedGrids.map(obj => {
                if (obj.guessed) return obj
                return {
                    ...obj,
                    show: false
                }
            })
            setTimeout(() => {
                updateGrids(clearGrids)
                checkProgress = false
            }, 500)
        } else {
            let newGrids = [...grids]
            newGrids[pos] = {
                ...newGrids[pos],
                show: true
            }
            updateGrids(newGrids)
        }
    }
    const displayStatusText = () => {
        if (gameInProgress) {
            return "Restart Game"
        } else if (!gameInProgress && completed) {
            return "Play again"
        } else {
            return "Start Game"
        }
    }
    return (
        <React.Fragment>
            <button style={buttonStyle} onClick={() => onStart()}>
                {displayStatusText()}
            </button>
            {!completed && (
                <div style={circleWrapperStyle}>
                    {grids.map(obj => (
                        <SingleCircle
                            onCircleClick={onCircleClick}
                            pos={obj.pos}
                            key={obj.key}
                            image={obj.image}
                            show={obj.show}
                        />
                    ))}
                </div>
            )}
            {completed && <p>You have successfully completed the game!</p>}
        </React.Fragment>
    )
}

export default CircleArea
