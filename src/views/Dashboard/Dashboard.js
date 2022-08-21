import React from "react";
import QRCode from "qrcode.react";
// Chakra imports
import {
  Box,
  Flex,
  SimpleGrid,
  Icon,
  Text,
  Link,
  CircularProgress,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";

import ConnectCard from "../../components/ConnectCard/ConnectCard";
import SwitchNetworkCard from "../../components/SwitchNetworkCard/SwitchNetworkCard";

// Assets
import ProfileBgImage from "../../assets/img/ProfileBackground.png";

import { FaExternalLinkAlt } from "react-icons/fa";
import { useWeb3React } from "@web3-react/core";
import { useENS } from "../../utils/ens";
import { useNftBalances } from "../../utils/balances";

import { CHAIN_INFO } from "../../utils/constants";

function Dashboard() {
  const { account, active, chainId } = useWeb3React();

  //fetch ens name if exist
  const ens = useENS();

  //fetch nfts
  const nfts = useNftBalances();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const subAddressColor = useColorModeValue("gray.400", "gray.300");

  return active ? (
    <Flex direction="column">
      <Box
        mb={{ sm: "205px", md: "75px", xl: "70px" }}
        borderRadius="15px"
        px="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <Box
          bgImage={ProfileBgImage}
          w="100%"
          h="175px"
          borderRadius="25px"
          bgPosition="50%"
          bgRepeat="no-repeat"
          position="relative"
          display="flex"
          justifyContent="center"
        >
          <Flex
            direction={{ sm: "column", md: "row" }}
            mx="1.5rem"
            maxH="330px"
            w={{ sm: "90%", xl: "95%" }}
            justifyContent={{ sm: "center", md: "space-between" }}
            align="center"
            backdropFilter="saturate(200%) blur(50px)"
            position="absolute"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="2px solid"
            borderColor={borderProfileColor}
            bg={bgProfile}
            p="24px"
            borderRadius="20px"
            transform={{
              sm: "translateY(25%)",
              md: "translateY(45%)",
              lg: "translateY(75%)",
            }}
          >
            <Flex
              align="center"
              mb={{ sm: "10px", md: "0px" }}
              direction={{ sm: "column", md: "row" }}
              w={{ sm: "100%" }}
              textAlign={{ sm: "center", md: "start" }}
            >
              <Flex me={{ md: "22px" }}>
                <QRCode value={account} size={80} renderAs={"svg"} />
              </Flex>
              <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                <Link
                  href={CHAIN_INFO[chainId].explorer + "address/" + account}
                  isExternal
                >
                  <Text
                    fontSize={{ sm: "lg", lg: "xl" }}
                    color={textColor}
                    fontWeight="bold"
                    ms={{ sm: "8px", md: "0px" }}
                    _hover={{ color: "#080808" }}
                  >
                    {ens ? (
                      <>
                        {ens}
                        <Text
                          fontSize={{ sm: "sm", md: "md" }}
                          color={subAddressColor}
                          fontWeight="semibold"
                          _hover={{ color: "#080808" }}
                        >
                          {account}
                          <Icon
                            as={FaExternalLinkAlt}
                            ml="8px"
                            w={3}
                            h={3}
                            color={subAddressColor}
                          />
                        </Text>
                      </>
                    ) : account === null ? (
                      <>"-"</>
                    ) : (
                      <>
                        {account}
                        <Icon
                          as={FaExternalLinkAlt}
                          ml="10px"
                          w={4}
                          h={4}
                          color={subAddressColor}
                        />
                      </>
                    )}
                  </Text>
                </Link>
              </Flex>
            </Flex>
            <Flex
              direction={{ sm: "column", lg: "row" }}
              w={{ sm: "100%", md: "50%", lg: "auto" }}
            ></Flex>
          </Flex>
        </Box>
      </Box>
      {CHAIN_INFO[chainId].mainNFT ? (
        <>
          {nfts ? (
            <SimpleGrid w="100%" minChildWidth="250px" gap="24px" mt="24px">
              {Object.keys(nfts).map((nftId) => {
                return (
                  <Flex justifyContent="center">
                    <Card
                      backgroundImage={nfts[nftId].image}
                      backgroundSize="140%"
                      backgroundPosition="center"
                      backgroundRepeat="no-repeat"
                      p="12px"
                      minH="350px"
                      minW="250px"
                      h={{
                        sm: "350px",
                        md: "350px",
                        lg: "350px",
                      }}
                      w={{
                        sm: "250px",
                        md: "250px",
                        lg: "250px",
                      }}
                    >
                      <CardBody h="100%" w="100%">
                        <Flex
                          direction="column"
                          color="white"
                          h="100%"
                          w="100%"
                        >
                          <Flex
                            justify="space-between"
                            align="center"
                            mb="260px"
                            p="6px"
                            backdropFilter="blur(5px)"
                            borderRadius="10px"
                          >
                            <Text
                              fontSize="md"
                              fontWeight="bold"
                              textShadow="0px 0px 4px black"
                            >
                              {nfts[nftId].mainName}
                            </Text>
                            <Text
                              fontSize="md"
                              fontWeight="bold"
                              textShadow="0px 0px 4px black"
                            >
                              #{nfts[nftId].tokenId}
                            </Text>
                          </Flex>
                        </Flex>
                      </CardBody>
                    </Card>
                  </Flex>
                );
              })}
            </SimpleGrid>
          ) : nfts == undefined ? (
            <Flex justifyContent="center" align="center" mt="50px">
              <CircularProgress
                isIndeterminate
                size="100px"
                color="black"
                thickness="4px"
              />
            </Flex>
          ) : (
            <Flex
              justifyContent="center"
              align="center"
              mt={{
                md: "10%",
                xl: "10%",
              }}
            >
              <Card h="80px" w="500px" p="16px">
                <CardHeader
                  p="12px 5px"
                  mb="12px"
                  justifyContent="center"
                  align="center"
                >
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                    You don't have any MetaBillionnaire in your wallet.
                  </Text>
                </CardHeader>
              </Card>
            </Flex>
          )}
        </>
      ) : (
        <Flex
          justifyContent="center"
          align="center"
          flexDirection="column"
          mt={{
            md: "5%",
            xl: "5%",
          }}
        >
          <SwitchNetworkCard functionality="NFT" chainAvailable={[1]} />
        </Flex>
      )}
    </Flex>
  ) : (
    <Flex
      justifyContent="center"
      align="center"
      mt={{
        sm: "25%",
        xl: "10%",
      }}
    >
      <ConnectCard textColor={textColor} />
    </Flex>
  );
}

export default Dashboard;
