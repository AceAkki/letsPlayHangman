import { useEffect, useState } from 'react'
import './App.css'

import Header from '../components/Header'
import languages from './languages'
import { nanoid } from 'nanoid'
import clsx from 'clsx';

function App() {
  let [currentWord, setCurrentWord] = useState("react");
  let [guessLetter, setGuessLetter] = useState([]);
  let [keyboardKeys, setKeyboardKeys] = useState(
    Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map(letter => {
      return {id:nanoid(), class:{
                    'correct-guess': false,
                    'wrong-guess': false,
                  }, txt:letter }}));


  let wrongGuessCount = guessLetter.filter(letter => !currentWord.includes(letter)).length;
  
   const isGameWon = Array.from(currentWord).every(char => guessLetter.includes(char));
   const isGameLost = (wrongGuessCount >= languages.length - 1);
   const isGameOver = isGameWon || isGameLost;
   console.log(isGameWon)

  function flipEnter(event) {
    let {backgroundColor, color} = window.getComputedStyle(event.target);
    event.target.style.backgroundColor = color;
    event.target.style.color = backgroundColor;
  }

  function flipLeave(lang) {
    event.target.style.backgroundColor = lang.background; 
    event.target.style.color = lang.color
  }

  function loadPuzzle() {
    let puzzleWord = Array.from(currentWord).map(char => {
      return <span className={clsx('puzzle-char', {'hidden':!guessLetter.includes(char)})} key={nanoid()}> {char} </span>
    })
    return puzzleWord
  }

  function guessChar(letter){
    //if (isGameOver(langChips, wrongGuessCount)) return
    if (isGameOver) return
    setKeyboardKeys(oldkeys => oldkeys.map(obj => {
      return obj.txt === letter ? {...obj, class:{'correct-guess': currentWord.includes(letter),
        'wrong-guess': !currentWord.includes(letter)}} : obj
      }))
    setGuessLetter(oldword => oldword.includes(letter) ? oldword : [ ...oldword, letter]);
  }

  function createKeyboard() {
   let keys = keyboardKeys.map(obj => {
    return <button 
                key={obj.id}
                className={clsx('char-key', obj.class)} 
                onClick={() => guessChar(obj.txt)}> {obj.txt} </button>
   })
   return keys
  }

  // function isGameOver() {
  //   return  
  // }
  
  
  
  let langChips = languages.map((lang,index) => {
    let styles = {background:lang.background, color:lang.color}
    return <div key={lang.name} className={clsx('lang', {'lost':index < wrongGuessCount})} style={styles} aria-description={lang.text} onMouseEnter={flipEnter} onMouseLeave={() => flipLeave(lang)}> {lang.name} </div>
  })
  
 

  return (
    <>
      <Header />
      <main>
        <div className={clsx('status-text', {"won":isGameWon, "lost":isGameLost})}>
          <p>
            {isGameOver ? 
             (isGameWon ? "You won ! Well Done." : "You lost the game")
             : null}
          </p>
        </div>
        <section className='languages-chips'>
          {langChips}
        </section>
        <section className='puzzle-txt-wrap'>
          {loadPuzzle()}
        </section>
        <section className='keyboard-wrap'>
          {createKeyboard()}
        </section>
        {isGameOver ? <button className='newgame-btn'> New Game</button> : null}
       

      </main>
    </>
  )
}

export default App

/*
  langs
  word 
  keyboard colors

  input event 
*/