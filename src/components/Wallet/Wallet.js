import React from "react";
import { useEagerConnect, useInactiveListener } from "../../utils/wallet";

function Wallet(props) {
  const { children } = props;
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  return <>{children}</>;
}
export default Wallet;
