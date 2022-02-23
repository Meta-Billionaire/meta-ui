import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Link,
  Progress,
  Portal,
  Text,
  Image,
  SimpleGrid,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";

import { BsArrowRight } from "react-icons/bs";

import { CHAIN_INFO } from "../../utils/constants";

import TokenLaunch from "../../assets/img/tokenLaunch.png";

import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import IconBox from "../../components/Icons/IconBox";
import { Notifs } from "../../components/Notifs/Notifs";

// Custom icons
import {
  RocketIcon,
  WalletIcon,
  ClockIcon,
  LogoWhite,
  LogoBlack,
} from "../../components/Icons/Icons.js";

export default function Home() {
  const overlayRef = useRef();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const iconTeal = useColorModeValue(
    "gray.700",
    "gray.900"
  );

  const iconBoxInside = useColorModeValue("white", "white");

  const Logo = useColorModeValue(LogoBlack, LogoWhite);

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="26px"
        gap="24px"
      >
        <Card minHeight="290.5px" p="1.2rem">
          <CardBody w="100%">
            <Flex flexDirection={{ sm: "column", lg: "row" }} w="100%">
              <Flex
                flexDirection="column"
                h="100%"
                lineHeight="1.6"
                width={{ lg: "45%" }}
              >
                <Text fontSize="sm" color="gray.400" fontWeight="bold">
                  MetaBillionaire DApp
                </Text>
                <Text
                  fontSize="lg"
                  color={textColor}
                  fontWeight="bold"
                  pb=".5rem"
                >
                  Decentralized MetaBillionaire application
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  MetaBillionaire now provides a decentralized finance product, staking and more.
                </Text>
                <Spacer />
                <Flex align="center">
                  <NavLink to="/dashboard">
                    <Button
                      p="0px"
                      variant="no-hover"
                      bg="transparent"
                      my={{ sm: "1.5rem", lg: "0px" }}
                    >
                      <Text
                        fontSize="sm"
                        color={textColor}
                        fontWeight="bold"
                        cursor="pointer"
                        transition="all .5s ease"
                        my={{ sm: "1.5rem", lg: "0px" }}
                        _hover={{ me: "4px" }}
                      >
                        Dashboard
                      </Text>
                      <Icon
                        as={BsArrowRight}
                        w="20px"
                        h="20px"
                        fontSize="2xl"
                        transition="all .5s ease"
                        mx=".3rem"
                        cursor="pointer"
                        pt="4px"
                        _hover={{ transform: "translateX(20%)" }}
                      />
                    </Button>
                  </NavLink>
                </Flex>
              </Flex>
              <Spacer />
              <Flex
                bg="transparent"
                align="center"
                justify="center"
                borderRadius="15px"
                width={{ md: "100%", lg: "50%" }}
                minHeight={{ sm: "auto", md: "auto", lg: "250px" }}
              >
                <Image
                  src={TokenLaunch}
                  alt="Token Launch"
                  borderRadius="25px"
                />
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card maxHeight="290.5px" p="1rem">
          <CardBody
            p="0px"
            bgPosition="center"
            bgRepeat="no-repeat"
            w="100%"
            h={{ sm: "200px", lg: "100%" }}
            bgSize="cover"
            position="relative"
            borderRadius="15px"
          >
            <Flex flexDirection="column" h="100%">
              <Text fontSize="sm" color="gray.400" fontWeight="bold">
                Last news
              </Text>
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                Announcements
              </Text>
              <Notifs />
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr 1fr 1fr 1fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap="24px"
        mb={{ lg: "26px" }}
      >
        <Card p="16px">
          <CardBody>
            <Flex direction="column" w="100%">
              <Flex direction="column" mb="36px" alignSelf="flex-start">
                <Text
                  fontSize="lg"
                  color={textColor}
                  fontWeight="bold"
                  mb="6px"
                >
                  MetaBillionaire Token
                </Text>
                <Text fontSize="md" fontWeight="medium" color="gray.400">
                  <Text as="span" color="green.400" fontWeight="bold">
                    23%
                  </Text>{" "}
                  circulating supply
                </Text>
              </Flex>
              <SimpleGrid gap={{ sm: "12px" }} columns={2}>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox
                      as="box"
                      h={"30px"}
                      w={"30px"}
                      bg={iconTeal}
                      me="6px"
                    >
                      <ClockIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Pending
                    </Text>
                  </Flex>
                  <Text
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                    my="6px"
                  >
                    90%
                  </Text>
                  <Progress
                    colorScheme="gray"
                    borderRadius="12px"
                    h="5px"
                    value={90}
                  />
                </Flex>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox
                      as="box"
                      h={"30px"}
                      w={"30px"}
                      bg={iconTeal}
                      me="6px"
                    >
                      <RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Claimed
                    </Text>
                  </Flex>
                  <Text
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                    my="6px"
                  >
                    5%
                  </Text>
                  <Progress
                    colorScheme="gray"
                    borderRadius="12px"
                    h="5px"
                    value={5}
                  />
                </Flex>
              </SimpleGrid>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}
