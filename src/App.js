import React from 'react'
import Die from './components/Die'

import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)

    const [rolls, setRolls] = React.useState(0)

    const [time, setTime] = React.useState(0)

    const [bestTime, setBestTime] = React.useState(localStorage.getItem("best"))

    const {innerWidth : width, innerHeight : height} = window

    React.useEffect(() => {
        const firstValue = dice[0].value
        const win = dice.every(die => die.isHeld === true && die.value === firstValue)
        if (win) setTenzies(true);
    }, [dice])

    React.useEffect(() => {
        //设置timer
        let timer
        if (!tenzies) {
            setTime(0)
            timer = setInterval(function () { setTime(prevTime => prevTime + 1) }, 1000)
        }

        //判断是否更新最好成绩
        if (tenzies) {
            const oldBest = localStorage.getItem("best")
            if (oldBest === null || time < oldBest) {
                localStorage.setItem("best", time)
                setBestTime(time)
            }
        }

        return () => clearInterval(timer)
    }, [tenzies])

    function allNewDice() {
        let newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(
                {
                    value: Math.floor(Math.random() * 6) + 1,
                    isHeld: false,
                    index: i
                }
            )
        }
        return newDice
    }

    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    { value: Math.floor(Math.random() * 6) + 1, isHeld: false, index: die.index }
            }))
            setRolls(prevRolls => prevRolls + 1)
        } else {
            setDice(allNewDice)
            setTenzies(false)
            setRolls(0)
        }
    }

    function holdDice(index) {
        setDice((prevDice) => {
            return prevDice.map((die) => {
                return die.index === index ?
                    { ...die, isHeld: !die.isHeld } :
                    die
            })
        })
    }

    const diceElements = dice.map((die) => {
        return <Die key={die.index} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.index)} />
    })

    return (
        <div>
            {tenzies && <Confetti width={width} height={height}/>}

            <header className='flex justify-between'>
                <div className='w-20 h-6 bg-gray-200 rounded-lg m-1 flex justify-center items-center'>
                    Rolls : {rolls}
                </div>
                <div className='w-20 h-6 bg-gray-200 rounded-lg m-1 flex justify-center items-center'>
                    Time : {time}
                </div>
                <div className='w-20 h-6 bg-gray-200 rounded-lg m-1 flex justify-center items-center'>
                    Best : {bestTime}
                </div>
            </header>

            <div className='flex flex-col bg-gray-200 p-5 absolute inset-x-8 inset-y-12 rounded-3xl overflow-hidden'>
                <div className=" text-center">
                    <h1 className="text-2xl font-bold">Tenzies</h1>
                    <p className="text-xs">
                        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                    </p>
                </div>

                <div className='mt-3'>
                    <div className="grid grid-cols-5 gap-4 ">
                        {diceElements}
                    </div>
                </div>

                <button
                    className='
                    bg-indigo-600 text-white mx-auto mt-6 px-6 py-1 rounded-md shadow-lg focues:outline-transparent
                     active:shadow-inner active:shadow-indigo-900 active:bg-indigo-700'
                    onClick={rollDice}
                >
                    {tenzies ? "Play Again!" : "Roll"}
                </button>

            </div>

        </div>

    )
}