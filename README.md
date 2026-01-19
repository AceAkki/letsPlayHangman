# 🧠 Language Hangman (React)

A fun **Hangman-style word guessing game** built with **React**, themed around **languages and vocabulary**. Guess the correct word before you run out of attempts! The game includes visual feedback, animations, and a celebratory confetti effect when you win 🎉

---

## 🚀 Features

- ⚛️ Built with **React Hooks** (`useState`, `useEffect`, `useRef`)
- 🧩 Randomly generated vocabulary words
- ❌ Attempt-based life system (classic hangman logic)
- 🎨 Dynamic styling with `clsx`
- 🎉 Confetti animation on win
- ⌨️ Interactive on-screen keyboard
- 🔁 Restart game with **Play Again** button
- 📱 Responsive layout with automatic scrolling

---

## 🕹️ How to Play

1. A random word is selected at the start of the game.
2. Click letters on the on-screen keyboard to make a guess.
3. Correct guesses reveal letters in the word.
4. Incorrect guesses count against your remaining attempts.
5. You **win** if you reveal the entire word.
6. You **lose** if you use all available attempts.
7. Click **Play Again** to start a new round.

---

## 📦 Dependencies

This project uses the following packages:

- `react`
- `nanoid` – unique keys
- `clsx` – conditional class names
- `react-use` – window size hook
- `react-confetti` – win animation
