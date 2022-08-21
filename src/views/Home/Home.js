import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  Image,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";

import { BsArrowRight } from "react-icons/bs";

import TokenLaunch from "../../assets/img/tokenLaunch.png";

import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";

import { Notifs } from "../../components/Notifs/Notifs";

export default function Home() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

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
                  MetaBillionaire now provides a decentralized finance product,
                  staking and more.
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
    </Flex>
  );
}
