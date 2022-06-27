import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
//import { Provider } from 'react-redux'
import { Provider } from "@ethersproject/abstract-provider";
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

// const getEthereumContract = () => {
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

//     console.log((
//         provider,
//         signer,
//         transactionContract
//     ))
// }

export const TransactionsProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    // const [currentBalance, balanceInEth] = useState("");

    const getBalance = async (address) => {
        // const network = 'rinkeby'; // use rinkeby testnet
        // const provider = ethers.getDefaultProvider(network);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //const balanceInEth = ethers.utils.formatEther(contractAddress);
        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.utils.formatEther(balance, { pad: true });
        console.log("The balance is", balanceInEth);
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected", accounts[0]);

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }
    const checkIfWalletIsConnected = async () => {
        try {
            /*
            * First make sure we have access to window.ethereum
            */
            const { ethereum } = window;
            setCurrentAccount("Sign In");
            if (!ethereum) {
                console.log("Make sure you have metamask!");
            } else {
                console.log("We have the ethereum object", ethereum);
            }
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                const bal = await getBalance(contractAddress);
                console.log("Found an authorized account:", account);
                //console.log("The balance of the account is", bal);
                setCurrentAccount(account)
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }
    }

    // const createPost = async(video, title, text) => {
    //     try{
    //         const {ethereum} = window;

    //         if(ethereum){    
    //             const provider = new ethers.providers.Web3Provider(ethereum);
    //             const signer = provider.getSigner();
    //             const createPostContract = new ethers.Contract(contractAddress,contractABI,signer);

    //             createPostContract.createPost(video, title, text);

    //             console.log("created new post");
    //         }
    //     } catch (error){
    //         console.log(error);
    //     }

    // }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount }} >
            {children}
        </TransactionContext.Provider>
    );
}
