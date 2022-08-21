import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { CHAIN_INFO } from "./constants";
import { useUpdater } from "./updater";
import { fetcher } from "./fetcher";
import { fromWeiWithDecimals } from "./decimals";

export function useBalances() {
  const { account, library, chainId } = useWeb3React();

  const updater = useUpdater();

  const [coinBalance, setCoinBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(async () => {
    if (library && chainId && account) {
      const contract = new ethers.Contract(
        CHAIN_INFO[chainId].mainToken.address,
        CHAIN_INFO[chainId].mainToken.abi,
        library
      );

      setCoinBalance(
        fromWeiWithDecimals(
          await library.getBalance(account),
          CHAIN_INFO[chainId].nativeCoin.decimals
        )
      );
      setTokenBalance(
        fromWeiWithDecimals(
          await contract.balanceOf(account),
          CHAIN_INFO[chainId].mainToken.decimals
        )
      );
    } else {
      setCoinBalance(0);
      setTokenBalance(0);
    }
  }, [account, library, chainId, updater]); // recovery balance amount of token

  return { coinBalance, tokenBalance };
}

export function useNftBalances() {
  const { account, library, chainId } = useWeb3React();

  const updater = useUpdater();

  const [nftBalances, setNftBalances] = useState(undefined);

  useEffect(async () => {
    if (library && chainId && account && CHAIN_INFO[chainId].mainNFT) {
      const contract = new ethers.Contract(
        CHAIN_INFO[chainId].mainNFT.address,
        CHAIN_INFO[chainId].mainNFT.abi,
        library
      );

      let balances = (await contract.balanceOf(account)).toString();

      let nfts = {};
      let tokenId, tokenURI, metadata, image;

      if (balances > 0) {
        for (let index = 0; index < balances; index++) {
          tokenId = (
            await contract.tokenOfOwnerByIndex(account, index)
          ).toString();

          tokenURI = await contract.tokenURI(tokenId);

          if (tokenURI.substring(0, 4) == "ipfs") {
            metadata = await fetcher(
              "https://ipfs.io/ipfs/" + tokenURI.substring(7)
            );
          } else if (tokenURI.substring(0, 4) == "http") {
            metadata = await fetcher(tokenURI);
          }

          if (metadata.image.substring(0, 4) == "ipfs") {
            image = "https://ipfs.io/ipfs/" + metadata.image.substring(7);
          } else if (metadata.image.substring(0, 4) == "http") {
            image = metadata.image;
          }

          nfts[tokenId] = {
            mainName: CHAIN_INFO[chainId].mainNFT.name,
            tokenId: tokenId,
            tokenURI: tokenURI,
            metadata: metadata,
            name: metadata.name,
            description: metadata.description,
            image: image,
          };
        }

        setNftBalances(nfts);
      } else {
        setNftBalances(false);
      }
    } else if (library || chainId || account == undefined) {
      setNftBalances(undefined);
    } else {
      setNftBalances(false);
    }
  }, [account, library, chainId, updater]); // recovery balance amount of token

  return nftBalances;
}
