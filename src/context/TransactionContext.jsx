import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
import web3 from 'web3';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const createPostContract = new ethers.Contract(contractAddress, contractABI, signer);

    return createPostContract;
}

export const TransactionsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [postCount, setPostCount] = useState(0);
    const [formData, setformData] = useState({videoHash: "", text: "", title: ""})
    const handleChange = (e, name) => {
        console.log('running', e.target.value);
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const getBalance = async (address) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
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
            setCurrentAccount(accounts[0])
            setIsLoading(false);
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
            await setCurrentAccount("Sign In");
            if (!ethereum) {
                console.log("Make sure you have metamask!");
            } else {
                console.log("We have the ethereum object", ethereum);
            }
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = await accounts[0];
                await setCurrentAccount(account)
                console.log("Found an authorized account:", account);
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const createPost = async(videoHash) => {
        try{
            const {ethereum} = window;

            if(ethereum){    
                const {text, title} = formData;

                const createPostContract = getEthereumContract();

                const createPostHash = await createPostContract.createPost(videoHash, text, title);

                console.log(`Loading - ${createPostHash.hash}`);
                await createPostHash.wait();
                console.log(`Success - ${createPostHash.hash}`);
        
                const postCount = await createPostContract.getPostCount();
        
                setPostCount(postCount.toNumber());
                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error){
            console.log(error);
        }
    }

    const getPostCount = async() => {
        const createPostContract = getEthereumContract();
        const postCount = await createPostContract.getPostCount();
        setPostCount(postCount.toNumber());
    }
    
    const getAllPosts = async() => {
        const createPostContract = getEthereumContract();
        const posts = await createPostContract.getAllPosts();
        return posts;
    }

    useEffect(async() => {
        await checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ isLoading, connectWallet, currentAccount, createPost, getPostCount, postCount, getAllPosts, handleChange, formData}} >
            {children}
        </TransactionContext.Provider>
    );
}