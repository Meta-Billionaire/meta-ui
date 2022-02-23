import React from "react";
import {
  Flex,
  Link,
  Menu,
  Text,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
// Chakra Icons
import { ItemContent } from "../Menu/ItemContent";
import { useNotifs } from "../../utils/offchain";

export function Notifs(props) {
  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;

  let activeColor = useColorModeValue("gray.700", "white");
  //fetch notifs
  const notifs = useNotifs();

  return (
    <>
      {notifs ? (
        <Flex flexDirection="column"
        mt={{
          xl: "20px",
          sm: "20px",
        }}>
          {/*<Text
            color={activeColor}
            fontWeight="bold"
            mt={{
              xl: "10px",
            }}
            mx="auto"
            ps={{
              sm: "10px",
              xl: "16px",
            }}
            py="12px"
          >
            NEWS
          </Text>*/}
          <Menu>
            {notifs.map((notif) => {
              return (
                <Link href={notif.link} isExternal>
                  <MenuItem borderRadius="8px" mb="10px">
                    <ItemContent
                      time={
                        Math.floor(
                          (Date.now() / 1000 - notif.date) / 60 / 60 / 24
                        ) > 1 ? (
                          <>
                            {Math.floor(
                              (Date.now() / 1000 - notif.date) /
                              60 /
                              60 /
                              24
                            )}{" "}
                            days ago
                          </>
                        ) : Math.floor(
                          (Date.now() / 1000 - notif.date) / 60 / 24
                        ) > 1 ? (
                          <>
                            {Math.floor(
                              (Date.now() / 1000 - notif.date) / 60 / 24
                            )}{" "}
                            hours ago
                          </>
                        ) : Math.floor(
                          (Date.now() / 1000 - notif.date) / 24
                        ) > 1 ? (
                          <>
                            {Math.floor(
                              (Date.now() / 1000 - notif.date) / 24
                            )}{" "}
                            minutes ago
                          </>
                        ) : (
                          <>just now</>
                        )
                      }
                      info={notif.subTitle}
                      boldInfo={notif.title}
                      aSrc={notif.logo}
                    />
                  </MenuItem>
                </Link>
              );
            })}
          </Menu>
        </Flex>
      ) : (<> </>)}
    </>
  );
}
