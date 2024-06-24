import { useEffect, useState } from 'react'
import blue from './audios/blue.mp3'
import green from './audios/green.mp3'
import red from './audios/red.mp3'
import yellow from './audios/yellow.mp3'
import './App.css'

const boardItem = [
  {id:1, name: "blue", sound: blue},
  {id:2, name: "green", sound: green},
  {id:3, name: "red", sound: red},
  {id:4, name: "yellow", sound: yellow},
]

function sleep (ms=500) {
  return new Promise((resolve) => {setTimeout(resolve, ms)})
}

function App() {

  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [comptArr, setComptArr] = useState([])
  const [userArr, setUserArr] = useState([])
  const [turn, setTurn] = useState("Simon")

  const handleStart = () => {
    setIsPlaying(true);
    setComptArr([]);
    setUserArr([]);
    setScore(0);
    setTimeout(() => {
      compTurn()
    }, 1500)
  }

  const compTurn = () => {
    const random = Math.floor(Math.random() * 4) + 1;
    setComptArr((prev) => [...prev, random]);
  }

  useEffect(() => {
    const animateComptArr = async () => {
      for(let i=0; i<comptArr.length; i++){
        const pad = document.getElementById(comptArr[i])
        pad?.classList.add("active")
        const sound = new Audio(boardItem[comptArr[i] - 1].sound)
        sound.play();
        await sleep()
        pad?.classList.remove("active")
        await sleep()
      }
      if(comptArr.length !== 0){
        setTurn("You")
      }
    }
    animateComptArr()
  }, [comptArr])

  const handleUserClick = async (e) => {
    const id = parseInt(e.target.id)
    setUserArr((prev) => [...prev, id]);
    const pad = document.getElementById(id)
    const sound = new Audio(boardItem[id -1].sound)
    sound.play();
    pad.classList.add("active")
    await sleep()
    pad.classList.remove("active")
    await sleep()
  }

  useEffect(() => {
    if(userArr.length === 0) return
    if(userArr.length === comptArr.length) {
      if(JSON.stringify(userArr) === JSON.stringify(comptArr)){
        setScore((prev) => prev + 1)
        setUserArr([])
        setTimeout(() => {
          setTurn("Simon")
        }, 500)
        setTimeout(() => {
          compTurn();
        }, 1000)
      } else {
        setIsPlaying(false)
      }
    } 
  }, [userArr])

  return (
    <>
    <div className='App'>
      <h2>Score: {score}</h2>
      {isPlaying && (
        <p>{turn}</p>
      )}
      {!isPlaying && (
        <div className='start'>
          <h2>Simon Game</h2>
          <div className='startBtn'>
            <button onClick={handleStart}>Start Game</button>
          </div>

        </div>
      )}
      {isPlaying && (
        <div className="board">
          <div className="pads">
            {boardItem.map((item) => (
              <div 
              key={item.name} 
              id={item.id} 
              className={`pad ${item.name}`}
              onClick={handleUserClick}
              >
              
                
              </div>

            ))}
          </div>
        </div>
      )}

    </div>
   
    </>
  )
}

export default App
