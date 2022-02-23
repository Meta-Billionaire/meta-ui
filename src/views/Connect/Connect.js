import React, { useEffect } from "react";
// Chakra imports
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import WalletModal from "../../components/WalletModal/WalletModal";
import WalletLogo from "../../assets/img/wallet/index.js";

import { URI_AVAILABLE } from "@web3-react/walletconnect-connector";


import {
  injected,
  walletconnect,
  //ledger,
  //trezor,
} from "../../utils/connectors";

const connectorsByName = {
  MetaMask: injected,
  TrustWallet: injected,
  WalletConnect: walletconnect,
  //Ledger: ledger,
  //Trezor: trezor,
  Web3: injected,
};

function Connect() {
  // Chakra color mode

  const textColor = useColorModeValue("gray.400", "white");

  // log the walletconnect URI
  useEffect(() => {
    const logURI = (uri) => {
      console.log("WalletConnect URI", uri);
    };
    walletconnect.on(URI_AVAILABLE, logURI);

    return () => {
      walletconnect.off(URI_AVAILABLE, logURI);
    };
  }, []);

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "100%", lg: "100%" }}
        >
          <Flex
            direction="column"
            w="50%"
            background="transparent"
            p="5px"
            mt={{ md: "150px", lg: "100px" }}
          >
            <WalletModal
              textColor={textColor}
              WalletLogo={WalletLogo}
              connectors={connectorsByName}
            />
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
        </Box>
      </Flex>
    </Flex>
  );
}

export default Connect;
