import {
  Button,
  Text,
  Flex,
  Image,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from "@chakra-ui/react";
import { CHAIN_INFO } from "../../utils/constants";

function SwitchNetwork(props) {
  const { text, ...rest } = props;
  if (window.ethereum) {
    return (
      <Flex flexDirection="row">
        {text && (
          <Text {...rest}>You're connected to an unsupported network.</Text>
        )}
        <Menu>
          <MenuButton
            fontSize="sm"
            border='1px solid black'
            px="8px"
            borderRadius="11px"
          >
            Switch Networks
          </MenuButton>
          <MenuList borderRadius="20px" alignItems="center">
            <Flex flexDirection="column">
              {Object.keys(CHAIN_INFO).map((id) => {
                return (
                  <MenuItem
                    borderRadius="20px"
                    onClick={async () => {
                      try {
                        // check if the chain to connect to is installed
                        await window.ethereum.request({
                          method: "wallet_switchEthereumChain",
                          params: [{ chainId: "0x" + parseInt(id).toString(16) }], // chainId must be in hexadecimal numbers
                        });
                      } catch (error) {
                        // This error code indicates that the chain has not been added to MetaMask
                        // if it is not, then install it into the user MetaMask
                        if (error.code === 4902) {
                          try {
                            await window.ethereum.request({
                              method: "wallet_addEthereumChain",
                              params: [
                                {
                                  chainId: "0x" + id,
                                  rpcUrl: CHAIN_INFO[id].rpcUrl,
                                },
                              ],
                            });
                          } catch (addError) {
                            console.error(addError);
                          }
                        }
                        console.error(error);
                      }
                    }}
                  >
                    <Image
                      w="18px"
                      h="18px"
                      me="10px"
                      src={CHAIN_INFO[id].logo}
                    />
                    <Text fontSize="15px">{CHAIN_INFO[id].name}</Text>
                  </MenuItem>
                );
              })}
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    );
  } else {
    // if no window.ethereum then MetaMask is not installed
    console.log(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
}

export default SwitchNetwork;
