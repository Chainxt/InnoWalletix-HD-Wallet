const ethers = require("ethers");
const { REACT_APP_ALCHEMY_API_URL, REACT_APP_GANACHE_ENDPOINT, REACT_APP_SEPOLIA_ENDPOINT, REACT_APP_POLYGON_ENDPOINT } = process.env;

let provider;

// gets provider for a network
const getProviderForNetwork = (network) => {
  switch (network) {
    case 'goerli':
      return new ethers.providers.JsonRpcProvider(REACT_APP_ALCHEMY_API_URL);
    case 'ganache':
      return new ethers.providers.JsonRpcProvider(REACT_APP_GANACHE_ENDPOINT);
    case 'sepolia':
      return new ethers.providers.JsonRpcProvider(REACT_APP_SEPOLIA_ENDPOINT);
    case 'polygon':
    return new ethers.providers.JsonRpcProvider(REACT_APP_POLYGON_ENDPOINT);
    default:
      return new ethers.providers.JsonRpcProvider(REACT_APP_GANACHE_ENDPOINT);
  }
};

// sets provider for a network
export const setProvider = async (network) => {
  try{
    provider = getProviderForNetwork(network);
  }
  catch(err){
    console.log("Error while setting provider",network);
  }
};

// gets current provider
const getProvider = async (network) => {
  if (!provider) {
    provider = getProviderForNetwork(network);
  }
  return provider;
};

// checks if wallet is connected to network
export const isConnectedToNetwork = async (networkProvider) =>{
  try {
    provider = await getProvider(networkProvider);
    const network = await provider.getNetwork();
    console.log("Connected to network:", network.name);
    return true;
  } catch (error) {
    console.log("Error connecting to network:", error);
    return false;
  }
}

// gets balance for an address
export const getBalance = async(address) =>{
  try{
    const balanceInWei = await provider.getBalance(address);
    const balance = ethers.utils.formatEther(balanceInWei);
    return balance.toString();
  }
  catch(err){
    console.log(err)
    return '0'
  }
};

// transfers ether across accounts
export const sendEthersToAccount = async(sourceAccountPrivateKey, recipientAddress, amountInEth) => {
  try{
    const sourceAccount = new ethers.Wallet(sourceAccountPrivateKey, provider);
    const amount = ethers.utils.parseEther(amountInEth);
    const toAddress = recipientAddress;
    const transaction = await sourceAccount.sendTransaction({
      to: toAddress,
      value: amount
    });
    console.log('tx hash:', transaction.hash);
    return transaction.hash;
  }
  catch(e){
    return '';
  }
}





