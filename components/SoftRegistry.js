import { ProofOfHumanitySoftABI, pohSoftMapping } from "../constants";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import AccountManagementDeclaration from "./AccountManagementDeclaration";

export default function SoftRegistry({ currentAccount }) {
    const { chainId: chaindIdHex } = useMoralis();
    const chainId = parseInt(chaindIdHex);
    const pohSoftContractAddress =
        chainId in pohSoftMapping ? pohSoftMapping[chainId]["ProofOfHumanitySoft"][0] : null;
    const [isRegistered, setIsRegistered] = useState(false);

    const { runContractFunction, isLoading, isFetching } = useWeb3Contract({
        abi: ProofOfHumanitySoftABI,
        contractAddress: pohSoftContractAddress,
        functionName: "isRegistered",
        params: { _submissionID: currentAccount },
    });

    useEffect(() => {
        updateIsRegistered();
    }, [currentAccount]);

    async function updateIsRegistered() {
        const isRegisteredResult = await runContractFunction();
        setIsRegistered(isRegisteredResult);
    }

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
