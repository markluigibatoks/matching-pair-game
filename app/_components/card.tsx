export default function Card ({
  value = "",
  isFlipped = false
}: {
  value: string,
  isFlipped: boolean
}) {
  return (
    <div className={`${isFlipped ? 'cursor-pointer' : ''} relative perspective-normal w-16 aspect-square select-none`}>
      <div className={`${isFlipped ? "rotate-y-180" : ""} absolute w-full h-full shadow rounded border-2 border-white transition duration-1000 transform-3d`}>
        {/* Front */}
        <div className="absolute w-full h-full bg-white text-red-700 text-center text-4xl rounded-lg backface-hidden flex justify-center items-center">
          ?
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-amber-50 text-center text-4xl rounded-lg backface-hidden rotate-y-180 flex justify-center items-center [text-shadow:-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000]">
          {value}
        </div>
      </div>
    </div>
  )
}