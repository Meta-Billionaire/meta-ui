import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { CHAIN_INFO } from "./constants";
import { useUpdater } from "./updater";
import { fetcher } from "./fetcher";

export function useStakingRead() {
  const [staking, setStaking] = useState(undefined);

  const { account, library, chainId } = useWeb3React();

  const updater = useUpdater();

  useEffect(async () => {
    if (library && chainId && account && CHAIN_INFO[chainId].staking) {
      let contract = new ethers.Contract(
        CHAIN_INFO[chainId].staking.address,
        CHAIN_INFO[chainId].staking.abi,
        library
      );

      let metadata, tokenId, tokenURI, image;
      let nfts = {};
      nfts["deposit"] = {};

      let depositedTokenAmounts = await contract.depositedTokenAmounts(account);

      nfts["depositedTokenAmounts"] = depositedTokenAmounts.toString();

      let nftAddress = await contract.nft();

      let contractNFT = new ethers.Contract(
        nftAddress,
        CHAIN_INFO[chainId].mainNFT.abi,
        library
      );

      if (depositedTokenAmounts.toString() > 0) {
        for (var index = 0; index < depositedTokenAmounts.toString(); index++) {
          tokenId = await contract.depositedTokenIds(account, index);
          tokenURI = await contractNFT.tokenURI(tokenId);

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

          nfts["deposit"][tokenId] = {
            mainName: CHAIN_INFO[chainId].mainNFT.name,
            index: index,
            tokenId: tokenId.toString(),
            tokenURI: tokenURI,
            metadata: metadata,
            name: metadata.name,
            description: metadata.description,
            image: image,
          };
        }
      }

      nfts["approved"] = await contractNFT.isApprovedForAll(
        account,
        CHAIN_INFO[chainId].staking.address
      );

      setStaking(nfts);
    } else if (library || chainId || account == undefined) {
      setStaking(undefined);
    } else {
      setStaking(false);
    }
  }, [account, library, chainId, updater]); // recovery staking infos

  useEffect(async () => {
    setStaking(undefined);
  }, [account, chainId]); // recovery staking infos

  return staking;
}

export function useStakingWrite() {
  const [loading, setLoading] = useState(false);

  const { library, chainId } = useWeb3React();

  async function approveAll(address) {
    setLoading(true);

    let contract, amount, tx;

    const signer = library.getSigner();

    contract = new ethers.Contract(
      CHAIN_INFO[chainId].mainNFT.address,
      CHAIN_INFO[chainId].mainNFT.abi,
      signer
    );

    tx = await contract
      .setApprovalForAll(address, true)
      .then(async (transferResult) => {
        await transferResult.wait();
      });

    setLoading(false);
  }

  async function deposit(tokenId) {
    setLoading(true);

    let contract, tx;

    const signer = library.getSigner();

    contract = new ethers.Contract(
      CHAIN_INFO[chainId].staking.address,
      CHAIN_INFO[chainId].staking.abi,
      signer
    );

    tx = await contract.deposit(tokenId).then(async (transferResult) => {
      await transferResult.wait();
    });

    setLoading(false);
  }

  async function withdraw(index) {
    setLoading(true);

    let contract, tx;

    const signer = library.getSigner();

    contract = new ethers.Contract(
      CHAIN_INFO[chainId].staking.address,
      CHAIN_INFO[chainId].staking.abi,
      signer
    );

    tx = await contract.withdraw(index).then(async (transferResult) => {
      await transferResult.wait();
    });

    setLoading(false);
  }

  return { loading, deposit, withdraw, approveAll };
}
