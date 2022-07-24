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
    const [postCount, setPostCount] = useState(localStorage.getItem("createPostCount"));
    const [formData, setformData] = useState({videoHash: "", text: "", title: ""})
    const [selectedFile, setSelectedFile] = useState(null);


    const handleChange = (e, name) => {
        console.log('running', e.target.value);
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const handleFileChange = (e, name) => {
        setSelectedFile((prevState) => ({ ...prevState, [name]: e.target.files[0]}));
    };

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
            setCurrentAccount(accounts[0])
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

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, createPost, postCount, handleChange, handleFileChange, formData, selectedFile}} >
            {children}
        </TransactionContext.Provider>
    );
}