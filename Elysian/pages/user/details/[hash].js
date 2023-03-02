import Image from "next/image";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import NFTCard from "../../../components/nftcard";
const NFTDetailsCard = () => {

  const [NFTData, setNFTData] = useState({
    name: "Test",
    tier: "3",
    hash: "hash",
    cricketdburl: "https://www.cricbuzz.com/profiles/576/rohit-sharma",
    description: "Rohit Gurunath Sharma is an Indian international cricketer and the current captain of the Indian cricket team. Considered as one of the best opening batters of all time, Rohit is known for his timing, elegance, six-hiting abilities and leadership skills.",
    owner: "0xeqweqsasda113s31dasdeae"
  })

  useEffect(() => {
    console.log("")
  }, [])

  return (
    <div className="p-2 max-w-lg rounded shadow-lg bg-gold">
      <div className="px-6 py-4 gap-y-2 space-y-2">
        <Image src="/cricketers/rohith.png" width={500} height={400} className="rounded shadow-black shadow-md" />
        <div className="font-bold text-xl mb-2">{NFTData.name}</div>
        <div className="font-light text-xl mb-2">{NFTData.description}</div>
        <div className="font-light text-xl mb-2">{NFTData.tier} ◆ ||  {NFTData.tier} ICCT</div>
        <div className="font-light text-xl mb-2"><button className="btn bg-success"> <a
          href={NFTData.cricketdburl}
          className="text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          View CricketDB</a></button></div>
        <div className="font-light text-xl mb-2">{NFTData.owner}</div>
      </div>
    </div >
  )
}

export default NFTDetailsCard;
