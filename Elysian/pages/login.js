import { useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useConnect } from "wagmi";
import { useEffect } from "react";
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const [addressState, setAddressState] = useState(null);

  const [type] = useState("voter");

  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  console.log(addressState);
  if (isConnected && addressState === null && address) {
    setAddressState(address);
  }

  useEffect(() => {
    if (isConnected) {
      // If wallet is already connected, push them to dashboard
      console.log(isConnected ? "Connected" : "Not connected");
      router.push("/user/dashboard");
    }
  }, [address]);

  return (
    <div className="flex flex-col justify-center space-y-8 items-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gold">
        <div className="px-6 py-4 flex flex-col justify-center relative">
          <div className="container font-bold font-heading text-6xl mb-2 flex flex-col items-center py-3">
            <div className="px-4 inline pt-2 align-middle">
              <Image
                height={145}
                width={140}
                src="/icc.png"
                alt="icc horizontal logo"
                className={"px-2"}
              />
            </div>
            <span>Login</span>
          </div>
          {!isConnected &&
            connectors.slice(0, 1).map((connector) => (
              <button
                className="align-middle pt-4 px-6 pb-2.5 bg-black text-white font-medium font-space text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                Connect to {connector.name}
                {isLoading &&
                  pendingConnector?.id === connector.id &&
                  " (connecting)"}
                <div className="px-4 inline pt-2 align-middle">
                  <Image
                    height={24}
                    width={24}
                    src="/arcana.png"
                    alt="Arcana logo"
                    className={"px-2"}
                  />
                </div>
              </button>
            ))}
          {error && <div className="mt-4 text-white text-center font-inter font-bold font-space py-2 bg-red">{error.message}</div>}
        </div>
      </div>
    </div>
  );
}
