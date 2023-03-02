import { defaults } from "autoprefixer"
import NFTCard from "../../components/nftcard"

const Marketplace = () => {
  return (
    <>
      <div className="font-heading text-4xl text-white py-4">Marketplace</div>
      <div className="justify-center items-center text-center gap-8 flex flex-row space-x-4">
        <NFTCard name="Rohith" tier="3" price="20" text="Buy" hash="1" owner="ICC" />
        <NFTCard name="Kohli" tier="2" price="15" text="Buy" hash="2" owner="0x379f7dEBf9495D8DE278A4A45A401F27f38564B7" />
        <NFTCard name="Jadeja" tier="1" price="10" text="Buy" hash="3" owner="0x379f7dEBf9495D8DE278A4A45A401F27f38564B7" />
      </div>
    </>
  )

}
export default Marketplace;
