import { Flex } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import CoreRegistry from "./CoreRegistry";

export default function Body() {
    const { isWeb3Enabled, account } = useMoralis();

    if (!isWeb3Enabled || !account) {
        return (
            <Flex direction="column" justifyContent="center" alignItems="center">
                <div className="ml-auto">
                    <h2>Please, connect your wallet to begin.</h2>
                </div>
            </Flex>
        );
    }
    return <CoreRegistry currentAccount={account} />;
}
