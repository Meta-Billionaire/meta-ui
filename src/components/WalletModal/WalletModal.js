import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
// Chakra imports
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Icon,
  Progress,
  Image,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import IconBox from "../Icons/IconBox";
import SwitchNetwork from "../SwitchNetwork/SwitchNetwork";

import { CHAIN_INFO } from "../../utils/constants";

import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";

function WalletModal(props) {
  const { textColor, connectors, WalletLogo } = props;
  const { activate, active, connector, error, deactivate } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();

  const [userError, setUserError] = useState();

  useEffect(() => {
    if (error) {
      setUserError(getErrorMessage(error));
      deactivate();
    }
  }, [error]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  function getErrorMessage(error) {
    if (error instanceof NoEthereumProviderError) {
      return "No wallet browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
      return <SwitchNetwork mr="5px" text />;
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect
    ) {
      return "Please authorize this website to access your wallet.";
    } else {
      console.error(error);
      return "An unknown error occurred. Check the console for more details.";
    }
  }

  function Wallet() {
    return (
      <>
        <Heading fontSize="32px" mb="10px">
          Connect your wallet
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColor}
          fontWeight="bold"
          fontSize="14px"
        >
          Chose your wallet provider
        </Text>
        {userError && (
          <Alert status="error" mb="36px" borderRadius="15px" overflow>
            <AlertIcon />
            <AlertDescription>{userError}</AlertDescription>
          </Alert>
        )}
        <SimpleGrid w="100%" minChildWidth="150px" gap="24px">
          {Object.keys(connectors).map((name) => {
            const currentConnector = connectors[name];
            return (
              <Flex justifyContent="center">
                <Card
                  w="150px"
                  h="150px"
                  p="14px"
                  display="flex"
                  align="center"
                  justify="center"
                  borderRadius="10px"
                  _hover={{
                    border: "1px solid gray",
                  }}
                  _active={{
                    border: "1px solid gray",
                  }}
                  onClick={() => {
                    setActivatingConnector(currentConnector);
                    activate(currentConnector);
                  }}
                  key={name}
                >
                  <CardBody>
                    <Flex direction="column" align="center" w="100%" py="14px">
                      <IconBox as="box" h={"50px"} w={"50px"} bg="black">
                        {WalletLogo[name] ? (
                          <Image
                            h={"20px"}
                            w={"20px"}
                            color="white"
                            src={WalletLogo[name]}
                          />
                        ) : (
                          <Icon
                            h={"20px"}
                            w={"20px"}
                            color="white"
                            as={FaWallet}
                          />
                        )}
                      </IconBox>
                      <Flex
                        direction="column"
                        m="14px"
                        justify="center"
                        textAlign="center"
                        align="center"
                        w="100%"
                      >
                        <Text fontSize="md" fontWeight="bold">
                          {name}
                        </Text>
                      </Flex>
                    </Flex>
                  </CardBody>
                </Card>
              </Flex>
            );
          })}
        </SimpleGrid>
      </>
    );
  }

  return (
    <>
      {active ? (
        <>
          <Redirect to="/dashboard" />
        </>
      ) : (
        <>
          {activatingConnector ? (
            <>
              <Heading fontSize="32px" mb="10px">
                Loading..
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize="14px"
              >
                Please connect your wallet
              </Text>
              <Progress borderRadius="10px" bg="gray.800" isIndeterminate />
            </>
          ) : (
            <>
              <Wallet />
            </>
          )}
        </>
      )}
    </>
  );
}

export default WalletModal;
