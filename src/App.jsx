import { useEffect, useState } from 'react'
import './App.css'

import Header from '../components/Header'
import languages from './languages'
import words from './techWords'
import { nanoid } from 'nanoid'
import clsx from 'clsx';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

function App() {
  let [currentWord, setCurrentWord] = useState(() =>  randomWord());
  let [guessLetter, setGuessLetter] = useState([]);
  let [keyboardKeys, setKeyboardKeys] = useState(()=> generateKeyboard());
   const { width, height } = useWindowSize()


  let wrongGuessCount = guessLetter.filter(letter => !currentWord.includes(letter)).length;
  
   const isGameWon = Array.from(currentWord).every(char => guessLetter.includes(char));
   const isGameLost = (wrongGuessCount >= languages.length - 1);
   const isGameOver = isGameWon || isGameLost;

  function generateKeyboard() {
    return Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map(letter => {
      return {id:nanoid(), class:{
                    'correct-guess': false,
                    'wrong-guess': false,
                  }, txt:letter }})
  }

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
      return <span className={clsx('puzzle-char', {'hidden':!guessLetter.includes(char) && !isGameOver, 'reveal':!guessLetter.includes(char) && isGameOver})} key={nanoid()}> {char} </span>
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
                disabled={isGameOver}
                aria-disabled={guessLetter.includes(obj.txt)}
                aria-label={`Letter ${obj.txt}`}
                onClick={() => guessChar(obj.txt)}> {obj.txt} </button>
   })
   return keys
  }

  function randomWord(){
    let selectedWordIndex = Math.floor(Math.random() * words.length);
    return words[selectedWordIndex].toLowerCase();
  }

  function newGame() {
    setGuessLetter([]);
    setCurrentWord(()=> randomWord())
    setKeyboardKeys(()=> generateKeyboard())
  }
 

  // function isGameOver() {
  //   return  
  // }

  function renderGameStatus(){
    return isGameOver ? 
    (isGameWon ? "You won ! Well Done. You saved the programming world." : 
      "You lost the game, Better start learning Assembly")
    : wrongGuessCount > 0 ? `${languages[wrongGuessCount - 1].name} is lost to the world` : null
  }
  
  
  let langChips = languages.map((lang,index) => {
    let styles = {background:lang.background, color:lang.color}
    return <div key={lang.name} className={clsx('lang', {'lost':index < wrongGuessCount})} style={styles} aria-description={lang.text} onMouseEnter={flipEnter} onMouseLeave={() => flipLeave(lang)}> {lang.name} </div>
  })

  let lastGuessLetter = guessLetter[guessLetter.length - 1];

  return (
    <>
      <Header />
      <main>
        {isGameWon ?  <Confetti
      width={width}
      height={height}
    /> : null}
        <section 
        className={clsx('status-text', {"won":isGameWon, "lost":isGameLost, "lang-status": !isGameOver && wrongGuessCount > 0})}
        aria-live='polite'
        role='status'>
          <p>
            {renderGameStatus()}
          </p>
        </section>
        <section className='languages-chips'>
          {langChips}
        </section>
        <section className='puzzle-txt-wrap'>
          {loadPuzzle()}
        </section>

        {/* Ally - aria live region for status update */}
        <section className='sr-only' aria-live='polite' role='status'>
          <p>
              {currentWord.includes(lastGuessLetter) ? `Correct! the letter ${lastGuessLetter} is in the word` : `Wrong! the letter ${lastGuessLetter} is not in the word`}
              You have {languages.length - 1} attempts left.
          </p>
          <p>Current word : {currentWord.split("").map(letter => guessLetter.includes(letter) ? letter : "blank").join(" ")}</p>
        </section>

        <section className='keyboard-wrap'>
          {createKeyboard()}
        </section>
        {isGameOver ? <button className='newgame-btn' onClick={newGame}> New Game</button> : null}
       

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