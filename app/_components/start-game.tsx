'use client'

import { ChangeEvent, FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "../_lib/hooks"
import { RootState } from "../_lib/store"
import { startGameActions } from "../_lib/feat/startGame/startGame.slice"
import { startGame as startGameThunk } from "../_lib/feat/startGame/startGame.thunk"

export default function StartGame() {

  const dispatch = useAppDispatch()
  const startGameState = useAppSelector((state: RootState) => state.startGameSlice)

  function handleOnNameChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    dispatch(startGameActions.setName(value))
  }

  function handleOnDifficultyChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = Number(event.target.value)

    dispatch(startGameActions.setDifficulty(value))
  }

  function handleOnSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    dispatch(startGameThunk({ name: startGameState.name, difficulty: startGameState.difficulty}))
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form onSubmit={handleOnSubmit} method="POST" className="flex flex-col justify-center gap-2 p-4 rounded border-white border max-w-max">

        <label htmlFor="difficulty">
          <span>Difficulty</span>
          <select value={startGameState.difficulty} onChange={handleOnDifficultyChange} name="difficulty" className="bg-white text-black px-4 py-2 block">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>

        <label htmlFor="name">
          <span>Name</span>
          <input onChange={handleOnNameChange} value={startGameState.name} type="name" name="name" placeholder="name" className="bg-white text-black px-4 py-2 rounded block"/>
        </label>

        <button type="submit" className="mt-6 px-4 py-2 rounded bg-white text-black cursor-pointer hover:bg-[#e1e1e1]">Submit</button>
      </form>
    </div>
  )
}
