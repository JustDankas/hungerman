import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import './App.css';
import words from './words.json'

function App() {
  const [hideWord,setHideWord] = useState(false)
  const [startingWord,setStartingWord] = useState('')
  const [input,setInput] = useState('')
  const [lives,setLives] = useState(7)
  const [foundWord,setFoundWord] = useState([])
  const [chosenLetters,setChosenLetters] = useState([])
  const [data,setData] = useState()
  const renderLives = new Array(lives).fill(0).map((live,index)=>{
    return <div key={index} className="heart"><FontAwesomeIcon icon={faHeart}/></div>
  })
  const renderWord = foundWord.map((marking,index)=>{
    const letter = startingWord[index]
   return <div key={index} className={marking==1?"cell":"cell hidden"} >{letter}</div>
 })
  useEffect(()=>{

  },[startingWord])
  function HandleWordChange(event){
    let text = event.target.value;
    if(/^[a-zA-Z]+$/.test(text)){
      setInput(text.toLowerCase())
      setFoundWord(new Array(text.length).fill(0))
    }
  }
  function HandleClick(letter){
    if(!chosenLetters.includes(letter) && hideWord){
      let indexes = []
      for(let i=0;i<=startingWord.length;i++){
        if(startingWord[i] == letter){
          indexes.push(i)
        }
      }
      if(indexes.length>0){
        const foundLetters = [...foundWord];
        indexes.forEach(x=>foundLetters[x]=1)
        if(!foundLetters.includes(0)){
        }
        setFoundWord(foundLetters)
      }
      else{
        setLives(lives-1)
        if(lives==1){
          handleNewGame()
          return
        }

      }
      setChosenLetters((prevState=>[...prevState,letter]))
    }
  }
  function handleStart(){
    if(startingWord!=''){
      setHideWord(true)
      setStartingWord(input)
    }else{
      const randomWord = words.words[Math.floor(Math.random()*3001)]
      setStartingWord(randomWord)
      setHideWord(true)
      setFoundWord(new Array(randomWord.length).fill(0))
    }

  }
  function handleNewGame(){
    setInput('')
    setHideWord(false)
    setLives(7)
    setChosenLetters([])
    setFoundWord([])
  }
  return (
    <div className="App">
      <div className="new-word">
        <input type="text" className={hideWord?"hidden":""} value={input} onChange={(e)=>HandleWordChange(e)} />
        <button className='ok-btn' onClick={()=>handleStart()}>Start</button>
      </div>
      <button className='gameBtn' onClick={()=>handleNewGame()}>New Game</button>
      <div className="word">
        {renderWord}
      </div>
      <div className="lives">
        {renderLives}
      </div>
      <div className="letters">
        {['q','w','e','r','t','y','u','i','o','p',
          'a','s','d','f','g','h','j','k','l',
          'z','x','c','v','b','n','m'].map((letter,id)=>{
            return <button key={id} className={chosenLetters.includes(letter)?"letter picked":"letter"} onClick={()=>HandleClick(letter)}>{letter}</button>
          })}
      </div>
    </div>
  );
}

export default App;
