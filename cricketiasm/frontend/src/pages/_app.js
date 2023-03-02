import { MoralisProvider } from "react-moralis";
// import { NotificationProvider } from "@web3uikit/core";
import "../styles/globals.css";
import NavBar from "@/components/navigation/navBar";
import { Provider } from "react-redux";
import store from "@/store";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <Provider store={store}>
        {/* <NotificationProvider> */}
        <Component {...pageProps} />
      </Provider>
      {/* </NotificationProvider> */}
    </MoralisProvider>
  );
}

export default MyApp;
