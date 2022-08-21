import React, { useState, useEffect } from "react";

// Chakra imports
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  CircularProgress,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";

import ConnectCard from "../../components/ConnectCard/ConnectCard";
import UnavailableCard from "../../components/UnavailableCard/UnavailableCard";
import SwitchNetworkCard from "../../components/SwitchNetworkCard/SwitchNetworkCard";

import { FaPlus } from "react-icons/fa";

import { useWeb3React } from "@web3-react/core";
import { useNftBalances } from "../../utils/balances";

import { useClaimRead, useClaimWrite } from "../../utils/claim";
import { useStakingRead, useStakingWrite } from "../../utils/staking";

import { CHAIN_INFO } from "../../utils/constants";

function Staking() {
  const { active, chainId } = useWeb3React();

  const { loading, deposit, withdraw, approveAll } = useStakingWrite();

  //fetch nfts
  const nfts = useNftBalances();

  //fetch staking
  const staking = useStakingRead();

  const { loadingClaim, claimTokens } = useClaimWrite();

  //fetch claim
  const claim = useClaimRead();

  const { isOpen, onOpen, onClose } = useDisclosure();

  function getColor(value) {
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }

  return active ? (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} my="26px">
      {CHAIN_INFO[chainId].staking ? (
        <>
          {staking && nfts !== undefined ? (
            <>
              <Card p="16px" my="24px">
                <CardHeader p="12px 5px" mb="12px">
                  <Flex direction="column">
                    <Text fontSize="lg" fontWeight="bold">
                      Staking Overview
                    </Text>
                    <Text fontSize="sm" color="gray.500" fontWeight="400">
                      Earn token
                    </Text>
                  </Flex>
                </CardHeader>
                <CardBody px="5px">
                  <Grid
                    templateColumns={{
                      sm: "1fr",
                      md: "1fr 1fr",
                      xl: "repeat(4, 1fr)",
                    }}
                    templateRows={{
                      sm: "1fr 1fr 1fr auto",
                      md: "1fr 1fr",
                      xl: "1fr",
                    }}
                    gap="24px"
                  >
                    <Flex direction="column">
                      <Text fontSize="md" fontWeight="600" mt="20px" mb="10px">
                        Claimable Tokens
                      </Text>
                      <SwitchNetworkCard
                        functionality="Claim"
                        chainAvailable={[137]}
                      />
                      <Button
                        mt="20px"
                        minW="110px"
                        h="36px"
                        fontSize="xs"
                        px="1.5rem"
                        isLoading={loading}
                        onClick={() => {
                          onOpen();
                        }}
                      >
                        DEPOSIT
                      </Button>
                    </Flex>
                    {Object.keys(staking.deposit).map((nftId, index) => {
                      return (
                        <Flex justifyContent="center">
                          <Card
                            backgroundImage={staking.deposit[nftId].image}
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
                                    {staking.deposit[nftId].mainName}
                                  </Text>
                                  <Text
                                    fontSize="md"
                                    fontWeight="bold"
                                    textShadow="0px 0px 4px black"
                                  >
                                    #{staking.deposit[nftId].tokenId}
                                  </Text>
                                </Flex>
                                <Flex
                                  direction="column"
                                  w="100%"
                                  align="center"
                                  me="34px"
                                  p="6px"
                                >
                                  <Button
                                    isLoading={loading}
                                    onClick={() => {
                                      withdraw(index);
                                    }}
                                    w="100%"
                                    backdropFilter="blur(5px)"
                                    borderRadius="10px"
                                    h="30px"
                                  >
                                    <Text
                                      fontSize="xs"
                                      fontWeight="bold"
                                      textShadow="0px 0px 4px black"
                                    >
                                      UNSTAKE
                                    </Text>
                                  </Button>
                                </Flex>
                              </Flex>
                            </CardBody>
                          </Card>
                        </Flex>
                      );
                    })}
                    <Modal
                      scrollBehavior="outside"
                      size="6xl"
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Deposit</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <SimpleGrid
                            w="100%"
                            minChildWidth="250px"
                            gap="24px"
                            mt="24px"
                          >
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
                                        {staking.approved ? (
                                          <Flex
                                            direction="column"
                                            w="100%"
                                            align="center"
                                            me="34px"
                                            p="6px"
                                          >
                                            <Button
                                              isLoading={loading}
                                              onClick={() => {
                                                deposit(nfts[nftId].tokenId);
                                              }}
                                              w="100%"
                                              backdropFilter="blur(5px)"
                                              borderRadius="10px"
                                              h="30px"
                                            >
                                              <Text
                                                fontSize="xs"
                                                fontWeight="bold"
                                                textShadow="0px 0px 4px black"
                                              >
                                                STAKE
                                              </Text>
                                            </Button>
                                          </Flex>
                                        ) : (
                                          <Flex
                                            direction="column"
                                            me="34px"
                                            p="6px"
                                            w="100%"
                                            align="center"
                                          >
                                            <Button
                                              isLoading={loading}
                                              onClick={() => {
                                                approveAll(
                                                  CHAIN_INFO[chainId].staking
                                                    .address
                                                );
                                              }}
                                              w="100%"
                                              backdropFilter="blur(5px)"
                                              borderRadius="10px"
                                              h="30px"
                                            >
                                              <Text
                                                fontSize="xs"
                                                fontWeight="bold"
                                                textShadow="0px 0px 4px black"
                                              >
                                                APPROVE
                                              </Text>
                                            </Button>
                                          </Flex>
                                        )}
                                      </Flex>
                                    </CardBody>
                                  </Card>
                                </Flex>
                              );
                            })}
                          </SimpleGrid>
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                      </ModalContent>
                    </Modal>
                    <Button
                      bg="transparent"
                      color="gray.500"
                      border="1px solid lightgray"
                      borderRadius="15px"
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
                      onClick={() => {
                        onOpen();
                      }}
                    >
                      <Flex
                        direction="column"
                        justifyContent="center"
                        align="center"
                      >
                        <Icon as={FaPlus} fontSize="lg" />
                        <Text fontSize="lg" fontWeight="bold">
                          Stake
                        </Text>
                      </Flex>
                    </Button>
                  </Grid>
                </CardBody>
              </Card>
            </>
          ) : nfts == undefined || staking == undefined ? (
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
              flexDirection="column"
              mt={{
                md: "5%",
                xl: "5%",
              }}
            >
              <UnavailableCard functionality="Staking" />
            </Flex>
          )}
        </>
      ) : CHAIN_INFO[chainId].claim ? (
        <>
          {claim ? (
            <>
              <Card p="16px" my="24px">
                <CardHeader p="12px 5px" mb="12px">
                  <Flex direction="column">
                    <Text fontSize="lg" fontWeight="bold">
                      Staking Overview
                    </Text>
                    <Text fontSize="sm" color="gray.500" fontWeight="400">
                      Earn token
                    </Text>
                  </Flex>
                </CardHeader>
                <CardBody px="5px">
                  <Grid
                    templateColumns={{
                      sm: "1fr",
                      md: "1fr 1fr",
                      xl: "repeat(4, 1fr)",
                    }}
                    templateRows={{
                      sm: "1fr 1fr 1fr auto",
                      md: "1fr 1fr",
                      xl: "1fr",
                    }}
                    gap="24px"
                  >
                    <Flex direction="column">
                      <Text fontSize="md" fontWeight="600" mt="20px" mb="10px">
                        Claimable Tokens
                      </Text>
                      <Text fontSize="xl" fontWeight="bold" mb="10px">
                        {parseFloat(claim.claimableAmounts).toFixed(15)}
                      </Text>
                      <Button
                        disabled={!claim.claimableAmounts}
                        minW="110px"
                        h="36px"
                        fontSize="xs"
                        px="1.5rem"
                        isLoading={loadingClaim}
                        onClick={() => {
                          claimTokens();
                        }}
                      >
                        CLAIM
                      </Button>
                      <Button
                        mt="20px"
                        minW="110px"
                        h="36px"
                        fontSize="xs"
                        px="1.5rem"
                        isLoading={loadingClaim}
                        onClick={() => {
                          onOpen();
                        }}
                      >
                        DEPOSIT
                      </Button>
                    </Flex>
                    <Modal
                      scrollBehavior="outside"
                      size="6xl"
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Deposit</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Flex
                            justifyContent="center"
                            align="center"
                            flexDirection="column"
                            mt={{
                              md: "5%",
                              xl: "5%",
                            }}
                          >
                            <SwitchNetworkCard
                              functionality="Staking"
                              chainAvailable={[1]}
                            />
                          </Flex>
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                      </ModalContent>
                    </Modal>
                    <SwitchNetworkCard
                      functionality="Staking"
                      chainAvailable={[1]}
                    />
                  </Grid>
                </CardBody>
              </Card>
            </>
          ) : claim == undefined ? (
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
              flexDirection="column"
              mt={{
                md: "5%",
                xl: "5%",
              }}
            >
              <UnavailableCard functionality="Claim" />
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
          <SwitchNetworkCard functionality="Staking" chainAvailable={[1]} />
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

export default Staking;
