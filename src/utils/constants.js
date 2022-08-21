import tokenAbi from "./abi/token";
import nftAbi from "./abi/nft";
import stakingAbi from "./abi/staking";
import claimAbi from "./abi/claim";

import AssetsLogo from "./assets/token";

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
const DOCS_LINK = process.env.REACT_APP_DOCS_LINK;
const MAIN_PAGE = process.env.REACT_APP_MAIN_PAGE;
const NOTIFS_LIST = process.env.REACT_APP_NOTIFS_LIST;
const OFF_CHAIN_INTERVAL = process.env.REACT_APP_OFF_CHAIN_INTERVAL;

export const SupportedChainId = {
  MAINNET: 1,
  //ROPSTEN: 3,
  POLYGON: 137,
};

export const ALL_SUPPORTED_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  //SupportedChainId.ROPSTEN,
  SupportedChainId.POLYGON,
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
      address: "0xECAf45A19565fFF9d058257B326e52a253343f78",
      abi: tokenAbi,
    },
    mainNFT: {
      name: "MetaBillionaire",
      symbol: "MB",
      address: "0xc6C817cd60E17Fed0AF2A759624e02Dd6c812E64",
      abi: nftAbi,
    },
    staking: {
      address: "0x4B120516eC475d651B759bB9D7Ee4fb7d2b811A4",
      abi: stakingAbi,
    },
    nativeCoin: { name: "ETH", symbol: "ETH", decimals: 18 },
    notifsList: NOTIFS_LIST,
  },
  /*[SupportedChainId.ROPSTEN]: {
    name: "Ropsten",
    chainId: 3,
    explorer: "https://ropsten.etherscan.io/",
    providerUrl: "https://ropsten.infura.io/v3/" + INFURA_KEY,
    logo: AssetsLogo.Rinkeby,
    rpcUrl: "none",
    offchainInterval: OFF_CHAIN_INTERVAL,
    docLink: DOCS_LINK,
    mainPage: MAIN_PAGE,
    mainToken: {
      name: "MetaBillionaire Utility Coin",
      symbol: "MBUC",
      decimals: 18,
      address: "0x0a9208B9Df616EF4f7c5741212f45505A52Cb49e",
      abi: tokenAbi,
    },
    mainNFT: {
      name: "MetaBillionaire",
      symbol: "MB",
      address: "0xAd817D331D95Cd6100C5a016993E92ac653e31E4",
      abi: nftAbi,
    },
    staking: {
      address: "0xae4d9f789aA267760A43F270744f39725043D8FC",
      abi: stakingAbi,
    },
    nativeCoin: { name: "Rinkeby ETH", symbol: "rinkETH", decimals: 18 },
    notifsList: NOTIFS_LIST,
  },*/
  [SupportedChainId.POLYGON]: {
    name: "Polygon",
    chainId: 137,
    explorer: "https://polygonscan.com/",
    providerUrl: "https://polygon-mainnet.infura.io/v3/" + INFURA_KEY,
    logo: AssetsLogo.Polygon,
    rpcUrl: "https://rpc-mainnet.maticvigil.com",
    offchainInterval: OFF_CHAIN_INTERVAL,
    docLink: DOCS_LINK,
    mainPage: MAIN_PAGE,
    mainToken: {
      name: "MetaBillionaire Utility Coin",
      symbol: "MBUC",
      decimals: 18,
      address: "0xECD3c4f21DcEebC8F308aF7c3A7f1A4265BB52E9",
      abi: tokenAbi,
    },
    claim: {
      address: "0x20792eD776D30B494e071afa3CD57d48B04eD93C",
      abi: claimAbi,
    },
    nativeCoin: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    notifsList: NOTIFS_LIST,
  },
};
