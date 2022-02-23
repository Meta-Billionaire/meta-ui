import React, { useRef } from "react";
import PropTypes from "prop-types";
// Chakra Imports
import { Button, useColorModeValue } from "@chakra-ui/react";
// Custom Icons
import { SettingsIcon } from "../Icons/Icons";

export default function FixedPlugin(props) {
  const { onChange, onSwitch, ...rest } = props;
  // Chakra Color Mode
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let bgButton = useColorModeValue("white", "gray.700");

  const settingsRef = useRef();
  return (
    <Button
      h="52px"
      w="52px"
      onClick={props.onOpen}
      bg={bgButton}
      position="fixed"
      variant="no-hover"
      right="35px"
      bottom="30px"
      borderRadius="50px"
      boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
    >
      <SettingsIcon
        cursor="pointer"
        ref={settingsRef}
        color={navbarIcon}
        w="20px"
        h="20px"
      />
    </Button>
  );
}

FixedPlugin.propTypes = {
  onChange: PropTypes.func,
  onSwitch: PropTypes.func,
};
