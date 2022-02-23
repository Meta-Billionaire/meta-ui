import React from "react";
import { NavLink } from "react-router-dom";

// Chakra imports
import { Text, Button } from "@chakra-ui/react";

import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";

function ConnectCard(props) {
  const { textColor } = props;

  return (
    <Card h="300px" w="300px">
      <CardHeader
        p="12px 5px"
        mb="45px"
        mt="45px"
        justifyContent="center"
        align="center"
      >
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          You must be logged in to access this page
        </Text>
      </CardHeader>
      <CardBody px="5px" justifyContent="center" align="center">
        <NavLink to="user/connect">
          <Button
            fontSize="xs"
            px="75px"
            borderRadius="11px"
          >
            Connect
          </Button>
        </NavLink>
      </CardBody>
    </Card>
  );
}

export default ConnectCard;
