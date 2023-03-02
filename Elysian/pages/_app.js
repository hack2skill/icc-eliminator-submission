import "../styles/globals.css";
import Layout from "../components/layout";
import {
  configureChains,
  WagmiConfig,
  createClient,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import {
  mainnet,
  goerli,
  filecoinHyperspace,
  polygon,
  polygonMumbai,
} from "wagmi/chains";
import styles from "../styles/Home.module.css";
import "react-tooltip/dist/react-tooltip.css";
import { InjectedConnector } from 'wagmi/connectors/injected'

const arcanaConnectorInstance = () => {
  return new ArcanaConnector({
    chains: [goerli],
    options: {
      appId: `89298e1d8e2af8606bc2c6124ef840e345ab5f93`,  // appId = App Address
      theme: "dark", // Defaults to 'dark'
      alwaysVisible: true, // Defaults to true
      position: "right",
      network: "mainnet",
      chainConfig: {
        chainId: 80001, //defaults to CHAIN.ETHEREUM_MAINNET
        rpcUrl: "https://endpoints.omniatech.io/v1/matic/mumbai/public	", //defaults to 'https://rpc.ankr.com/eth'
      }, // Defaults to 'right'
    },
  });
};
const injectedConnectorInstance = () => (new InjectedConnector({ chains: [goerli, polygonMumbai, filecoinHyperspace, polygon] }));

const chainList = [mainnet, goerli, filecoinHyperspace, polygon, polygonMumbai];

const { chains, provider } = configureChains(chainList, [
  // polygonMumbai
  jsonRpcProvider({
    rpc: () => ({
      http: `https://rpc.ankr.com/polygon_mumbai`,
    }),
  }),
  // goerli
  jsonRpcProvider({
    rpc: () => ({
      http: `https://goerli.blockpi.network/v1/rpc/public`,
    }),
  }),
  // fvm
  jsonRpcProvider({
    rpc: () => ({
      http: `https://filecoin-hyperspace.chainstacklabs.com/rpc/v1`,
    }),
  }),
  // public default provider
  publicProvider(),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [arcanaConnectorInstance(chains), injectedConnectorInstance(chains)],
  provider,
});

function MyApp({ Component, pageProps }) {
  const title = "Pehchan";
  return (
    <WagmiConfig client={wagmiClient}>
      <Layout title={title}>
        <div className={styles.main}>
          <Component {...pageProps} />
        </div>
      </Layout>
    </WagmiConfig>
  );
}

export default MyApp;
