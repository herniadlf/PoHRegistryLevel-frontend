import { ProofOfHumanitySoftABI, pohSoftMapping } from "../constants";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";

export default function AccountManagementDeclaration() {
    const { chainId: chaindIdHex } = useMoralis();
    const chainId = parseInt(chaindIdHex);
    const contractAddress =
        chainId in pohSoftMapping ? pohSoftMapping[chainId]["ProofOfHumanitySoft"][0] : null;
    const dispatch = useNotification();

    const {
        runContractFunction: addSubmission,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: ProofOfHumanitySoftABI,
        contractAddress: contractAddress,
        functionName: "addSubmission",
        params: { _accountInControl: ethers.constants.AddressZero },
    });

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        });
    };

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1);
            handleNewNotification(tx);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="py-4">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                onClick={async () =>
                    await addSubmission({
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),
                    })
                }
                disabled={isLoading || isFetching}
            >
                {isLoading || isFetching ? (
                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                ) : (
                    "Declare account as managed"
                )}
            </button>
        </div>
    );
}
