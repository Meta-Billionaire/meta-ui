import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

export function useENS() {
  const { account, library, chainId } = useWeb3React();

  const [ensName, setEnsName] = useState(null);

  useEffect(async () => {
    if (library) {
      try {
        setEnsName(await library.lookupAddress(account));
      } catch (e) {
        setEnsName(null);
      }
    } else {
      setEnsName(null);
    }
  }, [account, chainId]); // catch ens name if account change

  return ensName;
}
