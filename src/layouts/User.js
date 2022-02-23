import React, { useEffect, createRef, useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// chakra imports
import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
// core components
import UserNavbar from "../components/Navbars/UserNavbar.js";

import Connect from "../views/Connect/Connect.js";

import '@fontsource/montserrat/400.css'

import theme from "../theme/theme.js";

export default function Pages() {
  // ref for the wrapper div
  const wrapper = createRef();
  useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  const navRef = useRef();

  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box ref={navRef} w="100%">
        <Portal containerRef={navRef}>
          <UserNavbar logoText="METABILLIONAIRE" />
        </Portal>
        <Box w="100%">
          <Box ref={wrapper} w="100%">
            <Switch>
            <Route
              path="/user/connect"
              component={Connect}
              key="0"
            />
              <Redirect from="/user/" to="/user/connect" />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
