
const ethers = require("ethers");
// BIP-44 derivation path
const derivationPathPrefix = "m/44'/60'/0'/0/";

  // Export HD wallet
  export function exportHDWallet(wallet) {
    return wallet.mnemonic;
  }
  
  // create or import HD wallet depending on the mnemonic passed
  export function createOrImportHDWallet(index, mnemonic, accountName){
    let mnemonicPhrase = mnemonic;
    if(!index){
      if(!mnemonicPhrase){
        // Generate a new mnemonic phrase
        const wallet = ethers.Wallet.createRandom();
        mnemonicPhrase = wallet.mnemonic.phrase;
      }
    }
    else{
      mnemonicPhrase = mnemonic;
    }
    const node = ethers.utils.HDNode.fromMnemonic(mnemonicPhrase);
    let accountAddress = node.derivePath(`${derivationPathPrefix}${index}`);
    let accountNumber = index+1;
    let accName = accountName ? accountName : "Account"+accountNumber;
    accountAddress.name = accName;
    return { accountAddress};
  }

  // imports account from private key
  export function importAccountFromPrivateKey(index, accountName, privateKey){
    try{
      const wallet = new ethers.Wallet(privateKey);
      console.log(wallet);
      let accountNumber = index+1;
      let accName = accountName ? accountName : "Account"+accountNumber;
      wallet.name = accName;
      return wallet;
    }
    catch(err){
      return {wallet:null};
    }
  }
  
  
