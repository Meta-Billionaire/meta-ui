import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { CHAIN_INFO } from "./constants";

import { useOffChainUpdater } from "./updater";
import { fetcher } from "./fetcher";

export function useNotifs() {
  const { chainId } = useWeb3React();
  const updater = useOffChainUpdater();
  const [notifs, setNotifs] = useState(undefined);

  useEffect(async () => {
    if (chainId && CHAIN_INFO[chainId].notifsList) {
      let data = await fetcher(CHAIN_INFO[chainId].notifsList);
      if (data) {
        setNotifs(data);
      } else {
        setNotifs(undefined);
      }
    } else {
      let data = await fetcher(CHAIN_INFO[1].notifsList);

      if (data) {
        setNotifs(data);
      } else {
        setNotifs(undefined);
      }
    }
  }, [chainId, updater]); // fetch notifs

  return notifs;
}
