'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
})

export default function WinPage() {
  return (
    <div className="p-4 flex justify-center w-screen h-screen">
      <Confetti />
      <div className="">
        <span className="text-xl text-white font-bold">Congratulations, You won!</span>
        <Link href="/" className="mt-2 block w-full bg-white rounded px-4 py-2 text-black hover:opacity-90 text-center">New Game</Link>
      </div>
    </div>
  )
}