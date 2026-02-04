'use client'

import dynamic from 'next/dynamic'

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
})

export default function WinPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Confetti />
      <div className="text-3xl text-white font-bold">You won!</div>
    </div>
  )
}