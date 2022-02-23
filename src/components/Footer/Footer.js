import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";
import { CHAIN_INFO } from "../../utils/constants";

export default function Footer(props) {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
    {/*
      <List display="flex">
        <ListItem>
          <Text
            color="gray.400"
            textAlign={{
              base: "center",
              xl: "start",
            }}
            mb={{ base: "20px", xl: "0px" }}
          >
            &copy; {1900 + new Date().getYear()}{" "}
            <Link color="teal.400" href={CHAIN_INFO[1].mainPage} isExternal>
              MetaBillionaire
            </Link>
          </Text>
        </ListItem>
      </List>
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        {"Our smart contracts are available here : "}
        <Link
          color="teal.400"
          href="https://github.com/Meta-Billionaire/meta-ui"
          target="_blank"
        >
          Smart Contract
        </Link>
      </Text>*/}
    </Flex>
  );
}
