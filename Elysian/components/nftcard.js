import { useRouter } from "next/router";
import Image from "next/image";
const NFTCard = (props) => {
  const router = useRouter();
  const handleClick = (e) => {
    router.push(`details/${props.hash}`)
  }

  return (
    <div className="p-2 max-w-md rounded shadow-lg bg-gold">
      <div className="px-6 py-4 gap-y-2 space-y-2">
        <Image src="/cricketers/rohith.png" width={220} height={200} className="rounded shadow-black shadow-md" />
        <div className="font-bold text-xl mb-2">{props.name}</div>
        <div className="font-light text-xl mb-2">{props.tier} ◆ ||  {props.tier} ICCT</div>
        {props.text && (
          <button
            type="button"
            value={props.hash}
            onClick={handleClick}
            className="inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {props.text}
          </button>
        )}
        <div className="font-light text-xl mb-2">{props.owner.length > 3 ? (props.owner.substring(0, 4) + "...") : "ICC"}</div>
      </div>
    </div>
  )
}

export default NFTCard
