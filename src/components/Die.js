import React from "react"

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const die = [one(), two(), three(), four(),five(),six()]

    function dot() {
        return (
            <div className="h-1.5 w-1.5 bg-black rounded-full" />
        )
    }

    function one() {
        return (
            <div className="die-face justify-center items-center">
                {dot()}
            </div>
        )
    }

    function two() {
        return (
            <div className="die-face">
                <div>{dot()}</div>
                <div className="self-end">{dot()}</div>
            </div>
        )
    }

    function three() {
        return (
            <div className="die-face">
                <div>{dot()}</div>
                <div className="self-center">{dot()}</div>
                <div className="self-end">{dot()}</div>
            </div>
        )
    }

    function four() {
        return (
            <div className="die-face">
                <div className="flex justify-between">
                    <div className="self-start">{dot()}</div>
                    <div className="self-end">{dot()}</div>
                </div>
                <div className="flex justify-between">
                    <div className="self-start">{dot()}</div>
                    <div className="self-end">{dot()}</div>
                </div>
            </div>
        )
    }

    function five() {
        return (
            <div className="die-face">
                <div className="flex justify-between">
                    <div className="self-start">{dot()}</div>
                    <div className="self-end">{dot()}</div>
                </div>
                <div className="self-center">{dot()}</div>
                <div className="flex justify-between">
                    <div className="self-start">{dot()}</div>
                    <div className="self-end">{dot()}</div>
                </div>
            </div>
        )
    }

    function six() {
        return (
            <div className="die-face">
                <div className="flex justify-between">
                    <div className="self-start">{dot()}</div>
                    <div className="self-end">{dot()}</div>
                </div>
                <div className="flex justify-between">
                    <div className="self-start">{dot()}</div>
                    <div className="self-end">{dot()}</div>
                </div>
                <div className="flex justify-between">
                    <div className="self-start">{dot()}</div>
                    <div className="self-end">{dot()}</div>
                </div>
            </div>
        )
    }


    return (
        <div
            className="w-8 h-8 rounded-md shadow-xl cursor-pointer select-none"
            style={styles}
            onClick={props.holdDice}
        >
            {die[props.value - 1]}
        </div>
    )
}