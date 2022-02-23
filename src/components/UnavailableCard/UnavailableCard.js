import React from "react";

// Chakra imports
import { Text, Button, Link } from "@chakra-ui/react";

import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";

function KycCard(props) {
  const { textColor, functionality } = props;

  return (
    <Card h="220px" w="300px">
      <CardHeader p="25px 5px" mb="10px" justifyContent="center" align="center">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          The {functionality} feature is not available.
        </Text>
      </CardHeader>
      <CardBody px="5px" justifyContent="center" align="center">
        <Button
          fontSize="xs"
          px="75px"
          borderRadius="11px"
          disabled={true}
        >
          {functionality}
        </Button>
      </CardBody>
    </Card>
  );
}

export default KycCard;
