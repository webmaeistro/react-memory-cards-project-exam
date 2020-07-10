import React from "react"

const circleStyle = {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: "100%",
    position: "relative",
    border: "2px solid #fff",
    display: "inline-block"
}

const imageStyle = {
    position: "absolute",
    transformOrigin: "50% 50%",
    width: 80,
    height: 80,
    top: 0,
    left: 0,
    borderRadius: "100%"
}

const SingleCircle = ({ pos, image, show, onCircleClick }) => {
    const onClick = () => {
        onCircleClick(pos)
    }
    return (
        <div onClick={() => onClick()} style={circleStyle}>
            <img style={{ ...imageStyle, opacity: show ? 1 : 0 }} src={image} />
        </div>
    )
}

export default SingleCircle
