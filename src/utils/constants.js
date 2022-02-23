import tokenAbi from "./abi/token";
import nftAbi from "./abi/nft";

import AssetsLogo from "./assets/token";

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
const DOCS_LINK = process.env.REACT_APP_DOCS_LINK;
const MAIN_PAGE = process.env.REACT_APP_MAIN_PAGE;
const NOTIFS_LIST = process.env.REACT_APP_NOTIFS_LIST;
const OFF_CHAIN_INTERVAL = process.env.REACT_APP_OFF_CHAIN_INTERVAL;

export const SupportedChainId = {
  MAINNET: 1,
  //RINKEBY: 4,
};

export const ALL_SUPPORTED_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  //SupportedChainId.RINKEBY,
];

export const CHAIN_INFO = {
  [SupportedChainId.MAINNET]: {
    name: "Ethereum",
    chainId: 1,
    explorer: "https://etherscan.io/",
    providerUrl: "https://mainnet.infura.io/v3/" + INFURA_KEY,
    logo: AssetsLogo.Ethereum,
    rpcUrl: "none",
    offchainInterval: OFF_CHAIN_INTERVAL,
    docLink: DOCS_LINK,
    mainPage: MAIN_PAGE,
    mainToken: {
      name: "MetaBillionaire Utility Coin",
      symbol: "MBUC",
      decimals: 18,
      address: "0xcF8f32e032f432B02393636B2092a6BEf975FBF9",
      abi: tokenAbi,
    },
    mainNFT: {
      name: "MetaBillionaire",
      symbol: "MB",
      address: "0x4cA4d3B5B01207FfCe9beA2Db9857d4804Aa89F3",
      abi: nftAbi,
    },
    nativeCoin: { name: "ETH", symbol: "ETH", decimals: 18 },
    notifsList: NOTIFS_LIST,
  },
  /*[SupportedChainId.RINKEBY]: {
    name: "Rinkeby",
    chainId: 4,
    explorer: "https://rinkeby.etherscan.io/",
    providerUrl: "https://rinkeby.infura.io/v3/" + INFURA_KEY,
    logo: AssetsLogo.Rinkeby,
    rpcUrl: "none",
    offchainInterval: OFF_CHAIN_INTERVAL,
    docLink: DOCS_LINK,
    mainPage: MAIN_PAGE,
    mainToken: {
      name: "MetaBillionaire Token Test",
      symbol: "rinkMETA",
      decimals: 9,
      address: "0x274ADDF5f0E3Cc8f80E720C1886A2C736f790e8e",
      abi: tokenAbi,
    },
    nativeCoin: { name: "Rinkeby ETH", symbol: "rinkETH", decimals: 18 },
    notifsList: NOTIFS_LIST,
  },*/
};
