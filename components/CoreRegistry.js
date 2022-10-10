import { ProofOfHumanityLevelABI, pohLevelMapping } from "../constants";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import SoftRegistry from "./SoftRegistry";

export default function CoreRegistry() {
    const { chainId: chaindIdHex, account: initialAccount, isWeb3Enabled, Moralis } = useMoralis();
    const chainId = parseInt(chaindIdHex);
    const pohLevelContractAddress =
        chainId in pohLevelMapping ? pohLevelMapping[chainId]["ProofOfHumanityLevel"][0] : null;
    const [isRegistered, setIsRegistered] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(initialAccount);

    const {
        runContractFunction: isRegisteredCall,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: ProofOfHumanityLevelABI,
        contractAddress: pohLevelContractAddress,
        functionName: "isRegistered",
        params: { _submissionID: currentAccount },
    });

    async function updateUIValues() {
        const isRegisteredFromCall = await isRegisteredCall();
        setIsRegistered(isRegisteredFromCall);
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues();
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                deactivateWeb3();
            } else {
                setCurrentAccount(account);
                updateUIValues();
            }
        });
    }, []);

    return (
        <div className="py-4">
            {isLoading || isFetching ? (
                <div> Loading... </div>
            ) : isRegistered ? (
                <div>You are registered in Proof of Humanity Core Registry</div>
            ) : (
                <SoftRegistry />
            )}
        </div>
    );
}
