import { ProofOfHumanityLevelABI, pohLevelMapping } from "../constants";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import SoftRegistry from "./SoftRegistry";
import AccountManagementDeclaration from "./AccountManagementDeclaration";

export default function CoreRegistry({ currentAccount }) {
    const { chainId: chaindIdHex } = useMoralis();
    const chainId = parseInt(chaindIdHex);
    const pohLevelContractAddress =
        chainId in pohLevelMapping ? pohLevelMapping[chainId]["ProofOfHumanityLevel"][0] : null;
    const [isRegistered, setIsRegistered] = useState(false);

    const { runContractFunction, isLoading, isFetching } = useWeb3Contract({
        abi: ProofOfHumanityLevelABI,
        contractAddress: pohLevelContractAddress,
        functionName: "isRegistered",
        params: { _submissionID: currentAccount },
    });

    useEffect(() => {
        updateIsRegistered();
    }, [currentAccount]);

    async function updateIsRegistered() {
        const isRegisteredResult = await runContractFunction();
        console.log(`in core registry is registered ? ${isRegisteredResult}`);
        setIsRegistered(isRegisteredResult);
    }

    return (
        <div className="py-4">
            {isLoading || isFetching ? (
                <div> Loading... </div>
            ) : isRegistered ? (
                <div>
                    <div>You are registered in Proof of Humanity Core Registry</div>
                    <AccountManagementDeclaration />
                </div>
            ) : (
                <SoftRegistry currentAccount={currentAccount} />
            )}
        </div>
    );
}
