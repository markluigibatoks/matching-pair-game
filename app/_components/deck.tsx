import Card from "./card";

export default function Deck () {
  return (
    <div className="grid grid-cols-5 gap-3 place-items-center cursor-pointer">
      {
        Array.from({length: 18}, (_, i) => <Card key={i}/>)
      }
    </div>
  )
}