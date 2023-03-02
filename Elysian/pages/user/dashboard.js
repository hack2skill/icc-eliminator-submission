import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import abiArray from "../../contracts/voterAbiArray";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import Card from "../../components/card";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useContractRead,
} from "wagmi";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import Link from "../../components/link";

function stat(n) {
  return n > 0
    ? n == 1
      ? "In_Review"
      : n == 2
        ? "KYC_Pending"
        : "Approved"
    : "initalDefault";
}

const Dashboard = () => {
  //setup router object
  const router = useRouter();
  //define tooltip state
  const [tooltipState, setTooltipState] = useState("Fetching address");
  //get userdetails
  const { address } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  //TODO: logout function (disconnect button doesn't really work)
  const { disconnect } = useDisconnect();
  //set tooltip content
  useEffect(() => {
    if (address) setTooltipState(address);
    else router.push("/login");
  }, [tooltipState]);

  const contractAddress =
    "0x8dFB2a8CCeB843a02B5EEb503de07b0c131bf08f" ||
    process.env.NEXT_PUBLIC_VOTER_SMART_CONTRACT_ADDRESS_POLYGON;
  const contractAbi = new ethers.utils.Interface(abiArray);

  let status = 0;
  if (address != null) {
    const { data, isError, isLoading, error } = useContractRead({
      address: contractAddress,
      abi: contractAbi,
      functionName: "getStatusOfVoter",
      args: [address],
    });
    console.log(data);
    if (data) status = stat(data[1]);
    else status = stat(0);
  }

  return (
    <div className="justify-center items-center text-center gap-8 flex flex-row">
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-4/5 px-4 py-4 bg-grey mt-6 shadow-lg rounded-lg dark:bg-gray-800">
        <div className="justify-end items-end text-right gap-8 flex flex-row mb-4 pb-4">
          <span className="pt-2 mt-2" style={{ position: "relative", right: 260 }} >
            <Link href={"/about"} >
              <Image
                height={40}
                width={40}
                src="/questionmark.png"
                alt="Question mark symbol"
                className={
                  "px-4 ml-0 rounded-full border-gold border-2 inline float-left text-left items-end justify-end"
                }
              />
            </Link>
          </span>
          <button
            type="button"
            onClick={async () => {
              await disconnect();
            }}
            className="inline-block px-6 py-2.5 bg-red text-white font-bold text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red dark:bg-red-400 active:shadow-lg transition duration-150 ease-in-out"
          >
            Disconnect
          </button>
        </div>
        <div className="px-2 inline pt-4 align-middle">
          <Image
            height={30}
            width={30}
            src={ensAvatar ? ensAvatar : "/arcana.png"}
            alt="Account avatar"
            className={"px-5"}
            id="about"
            data-tooltip-content="Need help? Visit our docs"

          />
        </div>
        <div className="my-4">
          <p className="text-4xl sm:text-4xl text-gray-700 font-semibold font-heading dark:text-white py-4 inline px-4">
            Welcome {ensName ? ensName : "User"}
          </p>
          <Image
            height={30}
            width={30}
            src="/hash.png"
            alt="Hash symbol"
            className={"px-4 rounded-full border-gold border-2 inline"}
            id="address"
            data-tooltip-content={tooltipState}
          />
        </div>
        <Tooltip anchorId="address" />
        <Tooltip anchorId="about" />
        <>
          <h3 className="text-2xl font-light sm:text-xl text-gray-700 dark:text-white py-4 font-space">
            What do you want to do?
          </h3>
        </>
        <div className="text-md text-gray-500 dark:text-gray-300 pa-4 px-8 space-x-8 flex flex-row font-space justify-center items-center text-center">
          <>
            <Card
              title="Market place"
              text="Buy"
              path="/user/marketplace"
            />
          </>
          <>
            <Card
              title="Your assets"
              text="View"
              path="/user/assets"
            />
          </>
          <>
            <Card
              title="The Bet Den"
              text="Place"
              path="/user/betting"
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
