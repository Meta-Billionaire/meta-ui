import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { CHAIN_INFO } from "./constants";
import { useUpdater } from "./updater";

import { fromWeiWithDecimals, toWeiWithDecimals } from "./decimals";

export function useClaimRead() {
  const [claim, setClaim] = useState(undefined);

  const { account, library, chainId } = useWeb3React();

  const updater = useUpdater();

  let claimD = {};
  let claimableAmounts = "0";

  useEffect(async () => {
    if (library && chainId && account && CHAIN_INFO[chainId].claim) {
      let contract = new ethers.Contract(
        CHAIN_INFO[chainId].claim.address,
        CHAIN_INFO[chainId].claim.abi,
        library
      );

      let tokenAddress = await contract.token();

      let contractToken = new ethers.Contract(
        tokenAddress,
        CHAIN_INFO[chainId].mainToken.abi,
        library
      );

      let decimals = await contractToken.decimals();

      try {
        claimableAmounts = (
          await contract.claimableAmounts(account)
        ).toString();
      } catch (e) {
        claimableAmounts = "0";
      }

      claimD["claimableAmounts"] = fromWeiWithDecimals(
        claimableAmounts,
        decimals
      );

      setClaim(claimD);
    } else if (library || chainId || account == undefined) {
      setClaim(undefined);
    } else {
      setClaim(false);
    }
  }, [account, library, chainId, updater]); // recovery staking infos

  useEffect(async () => {
    setClaim(undefined);
  }, [account, chainId]); // recovery staking infos

  return claim;
}

export function useClaimWrite() {
  const [loadingClaim, setLoadingClaim] = useState(false);

  const { account, library, chainId } = useWeb3React();

  async function claimTokens() {
    setLoadingClaim(true);

    let contract, amount, tx;

    const signer = library.getSigner();

    contract = new ethers.Contract(
      CHAIN_INFO[chainId].claim.address,
      CHAIN_INFO[chainId].claim.abi,
      signer
    );

    amount = await contract.claimableAmounts(account);

    if (amount) {
      tx = await contract.claim(account).then((transferResult) => {
        console.log("en attente" + transferResult);
      });
    } else {
      setLoadingClaim(false);
    }

    setLoadingClaim(false);
  }

  return { loadingClaim, claimTokens };
}
