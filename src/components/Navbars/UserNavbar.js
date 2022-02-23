import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HomeIcon } from "../../components/Icons/Icons";
import { SidebarResponsive } from "../../components/Sidebar/Sidebar";

export default function UserNavbar(props) {

  const { logo, logoText, ...rest } = props;

  // Chakra color mode
  let navbarIcon = useColorModeValue("gray.700", "gray.200");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  let navbarBorder = useColorModeValue(
    "1.5px solid #FFFFFF",
    "1.5px solid rgba(255, 255, 255, 0.31)"
  );
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(21px)";

  let navbarPosition = "fixed";
  var brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <Text fontSize="sm" mt="3px">
        {logoText}
      </Text>
    </Link>
  );
  var linksUser = (
    <HStack display={{ sm: "none", lg: "flex" }}>
      <NavLink to="/home">
        <Button
          fontSize="sm"
          ms="0px"
          me="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<HomeIcon color={navbarIcon} w="12px" h="12px" me="0px" />}
        >
          <Text>Home</Text>
        </Button>
      </NavLink>
    </HStack>
  );
  return (
    <Flex
      position={navbarPosition}
      top="16px"
      left="50%"
      transform="translate(-50%, 0px)"
      background={navbarBg}
      border={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="15px"
      px="16px"
      py="22px"
      mx="auto"
      width="1044px"
      maxW="90%"
      alignItems="center"
    >
      <Flex w="100%" justifyContent={{ sm: "start", lg: "space-between" }}>
        {brand}
        <Box
          ms={{ base: "auto", lg: "0px" }}
          display={{ base: "flex", lg: "none" }}
        >
          <SidebarResponsive
            logoText={props.logoText}
            // logo={logo}
            {...rest}
          />
        </Box>
        {linksUser}
        <NavLink to="/dashboard">
          <Button
            fontSize="xs"
            variant="no-hover"
            px="30px"
            borderRadius="0px"
          >
            Dashboard
          </Button>
        </NavLink>
      </Flex>
    </Flex>
  );
}

UserNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
};
