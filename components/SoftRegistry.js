import { ProofOfHumanitySoftABI, pohSoftMapping } from "../constants";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import AccountManagementDeclaration from "./AccountManagementDeclaration";

export default function SoftRegistry() {
    const { chainId: chaindIdHex, account: initialAccount, isWeb3Enabled, Moralis } = useMoralis();
    const chainId = parseInt(chaindIdHex);
    const pohSoftContractAddress =
        chainId in pohSoftMapping ? pohSoftMapping[chainId]["ProofOfHumanitySoft"][0] : null;
    const [isRegistered, setIsRegistered] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(initialAccount);

    const {
        runContractFunction: isRegisteredCall,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: ProofOfHumanitySoftABI,
        contractAddress: pohSoftContractAddress,
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
        <div>
            {isLoading || isFetching ? (
                <div> Loading... </div>
            ) : isRegistered ? (
                <div>You are registered in Proof of Humanity Soft Registry</div>
            ) : (
                <div>
                    You are not registered in any Proof of Humanity Registry
                    <AccountManagementDeclaration />
                </div>
            )}
        </div>
    );
}
