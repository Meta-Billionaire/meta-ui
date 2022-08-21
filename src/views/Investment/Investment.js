import React, { useState, useEffect } from "react";

// Chakra imports
import { Flex, Text, SimpleGrid } from "@chakra-ui/react";
// Custom components
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";

import ConnectCard from "../../components/ConnectCard/ConnectCard";

import SwitchNetworkCard from "../../components/SwitchNetworkCard/SwitchNetworkCard";

import IMG1 from "../../assets/img/apeblur.jpeg";
import IMG2 from "../../assets/img/clonexblur.jpeg";
import IMG3 from "../../assets/img/dogblur.jpeg";
import IMG4 from "../../assets/img/mutantblur.jpeg";

import { useWeb3React } from "@web3-react/core";
import { useNftBalances } from "../../utils/balances";

import { CHAIN_INFO } from "../../utils/constants";

function Investment() {
  const { active, chainId } = useWeb3React();

  //fetch nfts
  const nfts = useNftBalances();

  return active ? (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} my="26px">
      {CHAIN_INFO[chainId].staking ? (
        <>
          <Flex justifyContent="center">
            <SimpleGrid w="100%" minChildWidth="250px" gap="24px" mt="24px">
              <Card
                backgroundImage={IMG1}
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
                    justify="center"
                    align="center"
                  >
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      textShadow="0px 0px 4px black"
                    >
                      Coming soon
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
              <Card
                backgroundImage={IMG2}
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
                    justify="center"
                    align="center"
                  >
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      textShadow="0px 0px 4px black"
                    >
                      Coming soon
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
              <Card
                backgroundImage={IMG3}
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
                    justify="center"
                    align="center"
                  >
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      textShadow="0px 0px 4px black"
                    >
                      Coming soon
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
              <Card
                backgroundImage={IMG4}
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
                    justify="center"
                    align="center"
                  >
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      textShadow="0px 0px 4px black"
                    >
                      Coming soon
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Flex>
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
          <SwitchNetworkCard functionality="Investment" chainAvailable={[1]} />
        </Flex>
      )}
    </Flex>
  ) : (
    <Flex
      justifyContent="center"
      align="center"
      mt={{
        sm: "25%",
        md: "10%",
        xl: "10%",
      }}
    >
      <ConnectCard />
    </Flex>
  );
}

export default Investment;
