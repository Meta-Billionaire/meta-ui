import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { Web3ReactProvider } from "@web3-react/core";

import { ethers } from "ethers";

import Wallet from "./components/Wallet/Wallet.js";

import UserLayout from "./layouts/User.js";
import Layout from "./layouts/Layout.js";

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

export default function App() {
  return (
    <HashRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Wallet>
          <Switch>
            <Route path={`/user`} component={UserLayout} />
            <Route path={`/`} component={Layout} />
            <Redirect from={`/`} to="home" />
          </Switch>
        </Wallet>
      </Web3ReactProvider>
    </HashRouter>
  );
}
