import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { CHAIN_INFO } from "./constants";

export function useUpdater() {
  const { library, chainId } = useWeb3React();
  const [updater, setUpdater] = useState();

  useEffect(() => {
    if (library) {
      let stale = false;
      library.getBlockNumber().then((blockNumber) => {
          if (!stale) {
            setUpdater(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setUpdater(null);
          }
        });

      const updateBlockNumber = (blockNumber) => {
        setUpdater(blockNumber);
      };
      library.on("block", updateBlockNumber);

      return () => {
        library.removeListener("block", updateBlockNumber);
        stale = true;
        setUpdater(undefined);
      };
    }
  }, [library, chainId]);

  return updater;
}

export function useOffChainUpdater() {
  const { chainId } = useWeb3React();
  const [updater, setUpdater] = useState(0);
  const [time, setTime] = useState(50000);

  useEffect(() => {
    if(chainId && CHAIN_INFO[chainId].offchainInterval){
      setTime(CHAIN_INFO[chainId].offchainInterval);
    } else {
      setTime(CHAIN_INFO[1].offchainInterval);
    }
  }, [chainId]);

  useEffect(() => {
    setInterval(() => {
      setUpdater((updater) => updater + 1);
    }, time);
  }, []);
  return updater;
}
