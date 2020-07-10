import ReactDOM from "react-dom"
import React, { Component } from "react"
import GameScreen from "./GameScreen"
import "./styles.css"

class App extends Component {
    render() {
        return <GameScreen />
    }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
