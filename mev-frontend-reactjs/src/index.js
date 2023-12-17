import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/css/global.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import Context from "./components/ContextProvider";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, arbitrum } from "wagmi/chains";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react";

const chains = [mainnet, arbitrum];
const projectId = "48c2c1e5a7dbc0015cdd13e672dd69fd";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <Context>
      <PersistGate loading={null} persistor={persistor}>
        <WagmiConfig config={wagmiConfig}>
          <RouterProvider router={router} />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </PersistGate>
      </Context>
    </Provider >
  </>
);
// 