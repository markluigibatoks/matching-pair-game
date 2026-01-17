export default function Card () {
  return (
    <div className="relative perspective-normal w-24 aspect-square">
      <div className="hover:rotate-y-180 absolute w-full h-full shadow rounded border-2 border-white transition duration-1000 transform-3d">
        {/* Front */}
        <div className="absolute w-full h-full bg-white text-red-100 text-center text-4xl rounded-md backface-hidden">
          Front
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-amber-50 text-red-100 text-center text-4xl rounded-md backface-hidden rotate-y-180">
          Back
        </div>
      </div>
    </div>
  )
}