import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// Chakra Imports
import {
  ButtonGroup,
  Button,
  Flex,
  Menu,
  Text,
  MenuButton,
  Image,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom Icons
import { ProfileIcon, ExitIcon } from "../../components/Icons/Icons";

// Custom Components
import { SidebarResponsive } from "../../components/Sidebar/Sidebar";

import { CHAIN_INFO } from "../../utils/constants";

import { useWeb3React } from "@web3-react/core";
import { useENS } from "../../utils/ens";
import { useBalances } from "../../utils/balances";

export default function HeaderLinks(props) {
  const { variant, children, fixed, onOpen, ...rest } = props;

  const { account, chainId, deactivate, connector } = useWeb3React();

  //fetch ens name if exist
  const { coinBalance, tokenBalance } = useBalances();

  //fetch ens name if exist
  const ens = useENS();

  // Chakra Color Mode
  let navbarIcon = useColorModeValue("gray.400", "gray.200");

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      {account ? (
        <>
          <ButtonGroup size="sm" isAttached me={{ sm: "2px", md: "16px" }}>
            <Button>
              <Menu>
                <MenuButton>
                  <Flex alignItems="center" flexDirection="row">
                    <Image
                      w="18px"
                      h="18px"
                      me="10px"
                      src={CHAIN_INFO[chainId].logo}
                    />
                    <Text mt="3px" fontSize="sm" fontWeight="semibold">
                      {CHAIN_INFO[chainId].name}
                    </Text>
                  </Flex>
                </MenuButton>
                <MenuList borderRadius="20px" alignItems="center">
                  <Flex flexDirection="column">
                    {Object.keys(CHAIN_INFO).map((id) => {
                      return (
                        <MenuItem
                          borderRadius="20px"
                          onClick={async () => {
                            try {
                              // check if the chain to connect to is installed
                              await window.ethereum.request({
                                method: "wallet_switchEthereumChain",
                                params: [{ chainId: "0x" + parseInt(id).toString(16) }], // chainId must be in hexadecimal numbers
                              });
                            } catch (error) {
                              // This error code indicates that the chain has not been added to MetaMask
                              // if it is not, then install it into the user MetaMask
                              if (error.code === 4902) {
                                try {
                                  await window.ethereum.request({
                                    method: "wallet_addEthereumChain",
                                    params: [
                                      {
                                        chainId: "0x" + id,
                                        chainName: CHAIN_INFO[id].name,
                                        rpcUrls: [CHAIN_INFO[id].rpcUrl],
                                        nativeCurrency: {
                                          name: CHAIN_INFO[id].nativeCoin.name,
                                          symbol:
                                            CHAIN_INFO[id].nativeCoin.symbol,
                                          decimals:
                                            CHAIN_INFO[id].nativeCoin.decimals,
                                        },
                                        blockExplorerUrls: [
                                          CHAIN_INFO[id].explorer,
                                        ],
                                      },
                                    ],
                                  });
                                } catch (addError) {
                                  console.error(addError);
                                }
                              }
                              console.error(error);
                            }
                          }}
                        >
                          <Image
                            w="18px"
                            h="18px"
                            me="10px"
                            src={CHAIN_INFO[id].logo}
                          />
                          <Text fontSize="15px">{CHAIN_INFO[id].name}</Text>
                        </MenuItem>
                      );
                    })}
                  </Flex>
                </MenuList>
              </Menu>
            </Button>
            <Button display={{ sm: "none", md: "block", lg: "block" }}>
              <Flex flexDirection="row" mt="3px">
                {parseFloat(coinBalance).toFixed(3)}{" "}
                {CHAIN_INFO[chainId].nativeCoin.symbol}
              </Flex>
            </Button>
            <Button display={{ sm: "none", md: "block", lg: "block" }}>
              <Flex flexDirection="row" mt="3px">
                {parseFloat(tokenBalance).toFixed(1)}{" "}
                {CHAIN_INFO[chainId].mainToken.symbol}
              </Flex>
            </Button>
            {ens ? (
              <Button>
                <Flex mt="3px">{ens}</Flex>
              </Button>
            ) : (
              <Button>
                <Text mt="3px">
                  {account.substring(0, 6)}...
                  {account.substring(account.length - 4)}
                </Text>
              </Button>
            )}

            {connector === "walletconnect" ? (
              <Button
                size="sm"
                variant="solid"
                onClick={() => {
                  connector.close();
                }}
              >
                <Flex mt="3px">
                  <ExitIcon />
                </Flex>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="solid"
                onClick={() => {
                  deactivate();
                }}
              >
                <Flex mt="3px">
                  <ExitIcon />
                </Flex>
              </Button>
            )}
          </ButtonGroup>
        </>
      ) : (
        <NavLink to="user/connect">
          <Button
            ms="0px"
            px="0px"
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon}
            variant="transparent-with-icon"
            rightIcon={
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            }
          >
            <Text mt="3px">Connect</Text>
          </Button>
        </NavLink>
      )}
      <SidebarResponsive
        logoText={props.logoText}
        // logo={logo}
        {...rest}
      />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
