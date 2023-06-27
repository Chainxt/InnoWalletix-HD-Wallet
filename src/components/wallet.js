/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {exportHDWallet, createOrImportHDWallet, importAccountFromPrivateKey } from "../utils/createWallet";
import { getBalance, sendEthersToAccount, isConnectedToNetwork, setProvider } from "../utils/transactions";
import { Spinner } from 'react-bootstrap'
import "../css/wallet.css";
import Alert from './alert';
import AddAccountPopup from './add-account-popup';
import ImportAccountPopup from './import-account-popup';
import Dropdown from './dropdown';
import CryptoJS from 'crypto-js';
import chainxt_logo from '../assets/chainxt_logo.png';

// To be consumed by App.js for the accounts info
export const retrieveAccountsInfo = () =>{
  const encryptedData = localStorage.getItem('hdWalletAccounts');
  const salt = "hd-wallet";
  let decryptedData;
  try{
    decryptedData = encryptedData ? CryptoJS.AES.decrypt(encryptedData, 'secret_key', { iv: salt }).toString(CryptoJS.enc.Utf8) : null;
  }
  catch(err){
    decryptedData = null;
  }
  return decryptedData;
}

// contains the UI and logic containing all the wallet related functionalities
function HDWalletForm({ isPasscodeEntered,  setIsPasscodeEntered}) {
  const [mnemonic, setMnemonic] = useState("");
  const [importMnemonic, setImportMnemonic] = useState("");
  const [exportedMnemonic, setExportedMnemonic] = useState("");
  const [exportedPrivateKey, setExportedPrivateKey] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [selectedAccountObject, setSelectedAccountObject] = useState(null)
  const [showAccountList, setShowAccountList] = useState(false);
  const [currentAccountBalance, setCurrentAccountBalance] = useState("0");
  const [showImportWalletScreen, setShowImportWalletScreen] = useState(false);
  const [showSendEthersComponent, setShowSendEthersComponent] = useState(false);
  const [recipientAccount, setRecipientAccount] = useState("");
  const [etherTransferValue, setEtherTransferValue] = useState("");
  const textAreaRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [showImportPopup, setShowImportPopup] = useState(false);
  const [importPrivateKey, setImportPrivateKey] = useState("");
  const [connectedToNetwork, setConnectedToNetwork] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedNetworkProvider, setSelectedNetworkProvider] = useState(localStorage.getItem('networkProvider') ? localStorage.getItem('networkProvider'): "ganache");
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [isPasscodeMatched, setIsPasscodeMatched] = useState(true);
  const [validatePasscodeValue, setValidatePasscodeValue] = useState("");

  const networkOptions = [
    { value: 'ganache', label: 'Ganache Network' },
    { value: 'goerli', label: 'Goerli Network' },
    { value: 'polygon', label: 'Polygon Network' },
  ];

  // called when network is switched
  const handleNetworkChange = async (newNetwork) => {
    console.log(`Selected network: ${newNetwork}`);
    setConnectedToNetwork(false);
    await setProvider(newNetwork);
    localStorage.setItem("networkProvider",newNetwork);
    if(selectedAccountObject){
      await getAccountBalance(selectedAccountObject.address);
    }
    setConnectedToNetwork(true);
  };


  const storeAccountsInfo = async(data) =>{
    const salt = "hd-wallet";
    const encryptedData = CryptoJS.AES.encrypt(data, 'secret_key', { iv: salt }).toString();
    localStorage.setItem('hdWalletAccounts', encryptedData);
  }

  const disconnectWallet = () =>{
    localStorage.removeItem("networkProvider");
    localStorage.removeItem("hdWalletAccounts");
    localStorage.removeItem("passcode");
    localStorage.removeItem("selectedAccountIndex");
    setMnemonic("");
    setImportMnemonic("");
    setExportedMnemonic("");
    setExportedPrivateKey("");
    setAddressList([]);
    setSelectedAccountObject(null);
    setShowAccountList(false);
    setCurrentAccountBalance("0");
    setShowImportWalletScreen(false);
    setShowSendEthersComponent(false);
    setRecipientAccount("");
    setEtherTransferValue("");
    setShowAlert(false);
    setAlertMessage("");
    setShowAccountPopup(false);
    setNewAccountName("");
    setShowImportPopup(false);
    setImportPrivateKey("");
    setConnectedToNetwork(false);
    setPasscode("");
    setConfirmPasscode("");
    setIsPasscodeMatched(true);
    setValidatePasscodeValue("");
  }

  const handlePasscodeInputChange = (event) =>{
    setPasscode(event.target.value);
  }

  const handleConfirmPasscodeInputChange = (event) =>{
    setConfirmPasscode(event.target.value);
  }

  // called when user sets the password
  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode === confirmPasscode) {
      setIsPasscodeMatched(true);
      const hashedPasscode = CryptoJS.SHA256(passcode).toString();
      localStorage.setItem('passcode', hashedPasscode);
      setIsPasscodeEntered(true);
    } else {
      setIsPasscodeMatched(false);
    }
  };
  
  const handleValidatePasscodeChange = (event) =>{
    setValidatePasscodeValue(event.target.value);
  }

  // validates the submitted passcode
  const handleValidatePasscodeClicked = async() =>{
    const storedPasscode = localStorage.getItem('passcode');
    const hashedPasscode = CryptoJS.SHA256(validatePasscodeValue).toString();
    if (hashedPasscode === storedPasscode) {
      setIsPasscodeEntered(true);
    } else {
      setAlertMessage("Incorrect Password!!");
      setShowAlert(true);
    }
  }
  
  // checks if the wallet is connected to the network
  const isConnected = async () =>{
    try{
      setShowLoader(true);
      setProvider(selectedNetworkProvider);
      const isConnected = await isConnectedToNetwork(selectedNetworkProvider);
      setConnectedToNetwork(isConnected);
      setShowLoader(false);
    }
    catch(err){
      console.log("Error connecting to network:", err);
      setShowLoader(false);
    }
  }

  // get balance for the selected account
  const getAccountBalance = async (address) => {
    try{
      setShowLoader(true);
      const balance = await getBalance(address);
      setCurrentAccountBalance(balance)
      setShowLoader(false);
      return balance;
    }
    catch(err){
      console.log("Error connecting to network:", err);
      setShowLoader(false);
    }
  };

  // exports mnemonic of current wallet
  const handleExportMnemonicButtonClick = () => {
    const exportedMnemonic = exportHDWallet({ mnemonic });
    setExportedMnemonic(exportedMnemonic);
  };

  // exports private key
  const handleExportPKButtonClick = () => {
    const exportedPK = selectedAccountObject.privateKey;
    setExportedPrivateKey(exportedPK);
  };

  // Import an existing HD wallet from a mnemonic
  const handleImportClicked = () => {
    if(!importMnemonic){
      setAlertMessage("Mnemonic can not be empty");
      setShowAlert(true);
      return;
    }
    createNewHDWallet(importMnemonic);
  }
  
  const handleCreateNewWalletClick = async() => {
    // setShowLoader(true);
    await createNewHDWallet();
    // setShowLoader(false);
    setAlertMessage("New wallet created");
    setShowAlert(true);
  }

  // Create a new HD wallet or the imported wallet from mnemonic depending on param
  const createNewHDWallet = async(importMnemonic) => {
    const mnemonicVal = importMnemonic ? importMnemonic : '';
    const wallet = createOrImportHDWallet(addressList.length, mnemonicVal);
    if(!selectedAccountObject){
      setMnemonic(wallet.accountAddress.mnemonic.phrase);
      setSelectedAccountObject(wallet.accountAddress)
    }
    const newItem = wallet.accountAddress;
    // Update the state to add the new item to the list
    setAddressList(prevItems => [...prevItems, newItem]);
    await getAccountBalance(wallet.accountAddress.address);
    storeAccountsInfo(JSON.stringify([...addressList, newItem]));
    localStorage.setItem('selectedAccountIndex',0);
  }

  const handleAddAccountClick = () => {
    setShowAccountPopup(true);
  }

  const handleAddAccountBackClick = () => {
    setShowAccountPopup(false);
    setNewAccountName("");
  }

  const handleAddAccountSaveClick = () => {
    setShowAccountPopup(false);
    createNewAccount(newAccountName);
    setNewAccountName("");
  }

  const handleNewAccountChange = (event) => {
    setNewAccountName(event.target.value);
  }

  // Create a new account for a wallet
  const createNewAccount = async(accountName) => {
    const wallet = createOrImportHDWallet(addressList.length, mnemonic, accountName);
    setMnemonic(wallet.accountAddress.mnemonic.phrase);
    setSelectedAccountObject(wallet.accountAddress);
    const newItem = wallet.accountAddress;
    setAddressList(prevItems => [...prevItems, newItem]);
    await getAccountBalance(wallet.accountAddress.address);
    storeAccountsInfo(JSON.stringify([...addressList, newItem]));
    localStorage.setItem('selectedAccountIndex',addressList.length);
    setAlertMessage("New Account Added - "+wallet.accountAddress.name);
    setShowAlert(true);
  }

  const handleImportAccountChange = (event) => {
    setNewAccountName(event.target.value);
  }

  const handleImportPrivateKeyChange = (event) => {
    setImportPrivateKey(event.target.value);
  }

  const handleImportAccountClick = () => {
    setShowImportPopup(true);
  }

  const handleImportAccountBackClick = () => {
    setShowImportPopup(false);
    setNewAccountName("");
  }

  // handles action for import account button
  const handleImportAccountSaveClick = () => {
    setShowImportPopup(false);
    if(!importPrivateKey){
      setAlertMessage("Enter the private key to be imported");
      setShowAlert(true);
      return;
    }
    importExternalAccount(importPrivateKey, newAccountName);
    setNewAccountName("");
  }

  // imports account by providing private key
  const importExternalAccount = async (importPrivateKey, accountName) =>{
    const account = importAccountFromPrivateKey(addressList.length,accountName,importPrivateKey);
    setSelectedAccountObject(account);
    setAddressList(prevItems => [...prevItems, account]);
    await getAccountBalance(account.address);
    storeAccountsInfo(JSON.stringify([...addressList, account]));
    localStorage.setItem('selectedAccountIndex',addressList.length-1);
    setAlertMessage("New Account Added - "+account.name);
    setShowAlert(true);
  }

  // show accounts list 
  const switchAccount = () => {
    setShowAccountList(!showAccountList);
  }

  // switches account
  const accountSelected = async (account, index) =>{
    setSelectedAccountObject(account)
    setShowAccountList(false);
    await getAccountBalance(account.address);
    localStorage.setItem('selectedAccountIndex',index);
    setAlertMessage("Switched to account "+account.name);
    setShowAlert(true);
  }
  
  const handleEtherInputChange = (event) => {
    setEtherTransferValue(event.target.value);
  }

  const handlePopupClose = () => {
    setShowAccountList(false);
  };

  // Send ethers from the selected account to the recipient address
  const sendEthers = async () => {
    if(!etherTransferValue || isNaN(etherTransferValue)){
      setAlertMessage("Ether value should be a number!!");
      setShowAlert(true);
      return;
    }
    if(!recipientAccount){
      setAlertMessage("Enter the recipient account!!");
      setShowAlert(true);
      return;
    }
    setShowLoader(true);
    const transactionMessage = await sendEthersToAccount(selectedAccountObject.privateKey, recipientAccount, etherTransferValue);
    if(transactionMessage){
      await getAccountBalance(selectedAccountObject.address);
      setAlertMessage("Transaction successful with hash: "+transactionMessage);
      setShowSendEthersComponent(false);
      setShowAlert(true);
    }
    else{
      setAlertMessage("Transaction failed!! Kindly check account balance");
      setShowAlert(true);
    }
    setShowLoader(false);
   };

  //  Copy contents of mnemonic to clipboard
   const handleCopyMnemonicClick = async () => {
    try {
      await navigator.clipboard.writeText(exportedMnemonic);
      setExportedMnemonic('');
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  //  Copy contents of private key to clipboard
  const handleCopyPrivateKeyClick = async () => {
    try {
      await navigator.clipboard.writeText(exportedPrivateKey);
      setExportedPrivateKey('');
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  function LoadSpinner({message}){
    return (
      <div className="SpinnerOverlay">
        <div className="SpinnerCls" >
          <Spinner animation="border" />
          <p>{message}</p>
        </div>
      </div>
    )
  }

   // update account and network data on page load
   useEffect(() => {
    const storedAccounts = retrieveAccountsInfo();
    const selectedNetwork = localStorage.getItem('networkProvider');
    const selectedAccountIndex = localStorage.getItem('selectedAccountIndex');
    if(selectedNetwork){
      setSelectedNetworkProvider(selectedNetwork);
    }
    else{
      localStorage.setItem("networkProvider","ganache");
    }
    isConnected();
    if (storedAccounts) {
      setAddressList(JSON.parse(storedAccounts));
      setMnemonic(JSON.parse(storedAccounts)[0].mnemonic.phrase);
      setSelectedAccountObject(JSON.parse(storedAccounts)[selectedAccountIndex]);
      getAccountBalance(JSON.parse(storedAccounts)[selectedAccountIndex].address);
    }
  }, []);

  if(!localStorage.getItem('passcode')){
    return (
      <div className="parent-container">
        <div className='logo_container'>
        <a href="https://www.chainxt.io" target="_blank" rel="noopener noreferrer">
          <img src={chainxt_logo} className='logo_image'></img>
        </a>
      </div>
      <div className='product_title_container'>
        <a className="product_title_text" href="https://www.chainxt.io/2023/06/25/introduction-to-innowalletix-hd-wallet/" target="_blank" rel="noopener noreferrer">
          InnoWalletix - HD Wallet
        </a>
      </div>
      <div className='product_footer_container'>
        Source Code @ 
        <a className="product_footer_text" href="https://github.com/Chainxt/InnoWalletix-HD-Wallet" target="_blank" rel="noopener noreferrer">
          Chainxt Github
        </a>
      </div>
        <div className="validate-passcode-container">
        <div className="passcode-title">Set Passcode</div>
         <form onSubmit={handlePasscodeSubmit}>
            <div>
              <input
                type="password"
                placeholder="Enter Passcode"
                value={passcode}
                onChange={handlePasscodeInputChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Passcode"
                value={confirmPasscode}
                onChange={handleConfirmPasscodeInputChange}
              />
            </div>
            {!isPasscodeMatched && <p className="passwordMismatchLabel">Passwords do not match</p>}
            <button className="add-passcode-button" type="submit">Submit</button>
       </form>
        </div>
      </div>
    )
  }
  

  return (
    <div className="parent-container">
      <div className='logo_container'>
        <a href="https://www.chainxt.io" target="_blank" rel="noopener noreferrer">
          <img src={chainxt_logo} className='logo_image'></img>
        </a>
      </div>
      <div className='product_title_container'>
        <a className="product_title_text" href="https://www.chainxt.io/2023/06/25/introduction-to-innowalletix-hd-wallet/" target="_blank" rel="noopener noreferrer">
          InnoWalletix - HD Wallet
        </a>
      </div>
      <div className='product_footer_container'>
        Source Code @ 
        <a className="product_footer_text" href="https://github.com/Chainxt/InnoWalletix-HD-Wallet" target="_blank" rel="noopener noreferrer">
          Chainxt Github
        </a>
      </div>
      {showAlert && (
            <Alert
              message={alertMessage}
              onClose={handleCloseAlert}
            />
          )}
      {!isPasscodeEntered && 
      <div className="child-container"> 
        <div className="validate-passcode-container">
          <div className="passcode-title">Validate Password</div>
          <input className="validate-passcode-input" type="password" placeholder="Validate Passcode" value={validatePasscodeValue} onChange={handleValidatePasscodeChange}/>
          <button className="add-passcode-button" onClick={handleValidatePasscodeClicked}>Submit</button>
      </div>
      </div>}
      {isPasscodeEntered &&  
      <div className="child-wallet-container"> 
          {showAccountPopup && (
            <AddAccountPopup
              index={addressList.length+1}
              onCancel = {handleAddAccountBackClick}
              onSave = {handleAddAccountSaveClick}
              handleChange = {handleNewAccountChange}
              accountName = {newAccountName}
            />
          )}

          {showImportPopup && (
            <ImportAccountPopup
              index={addressList.length+1}
              onCancel = {handleImportAccountBackClick}
              onSave = {handleImportAccountSaveClick}
              handleAccountChange = {handleImportAccountChange}
              handleKeyChange = {handleImportPrivateKeyChange}
              accountName = {newAccountName}
              importPrivateKey = {importPrivateKey}
            />
          )}
          <div className="wallet-dropdown-container">
            <Dropdown networks={networkOptions} defaultOption={selectedNetworkProvider} onChange={handleNetworkChange} />
          </div>
          {showLoader ? <LoadSpinner message={"Loading..."}/> : <></>}
          {connectedToNetwork ? <span className="connected-text">Connected</span> : <span className="not-connected-text">Not Connected</span>}
          <div hidden={selectedAccountObject}>
            {!showImportWalletScreen && <div className="wallet-buttons-container">
              <button onClick={handleCreateNewWalletClick}>Create New HD Wallet</button>
              <button onClick={() => setShowImportWalletScreen(true)}>Import HD Wallet</button>
            </div>}
            {showImportWalletScreen &&
              <div className="import-screen-container">
                <textarea placeholder="Enter the mnemonic to be imported"  className="mnemonic-textarea" value={importMnemonic} onChange={(e) => setImportMnemonic(e.target.value)} />
                <div className="import-screen-btn-container">
                  <button onClick={()=>setShowImportWalletScreen(false)}>Back</button>
                  <button onClick={handleImportClicked}>Import</button>
                </div>
              </div>
            }
          </div>
          {selectedAccountObject &&
            <div className="wallet-container" hidden={!selectedAccountObject}>
            <div className="account-detail-container">
                  {selectedAccountObject && <h3>{selectedAccountObject.name}</h3>}
                  {selectedAccountObject && <span>{selectedAccountObject.address}</span>}
                  <h4>{currentAccountBalance}{' ETH'}</h4>
                  <button  onClick={switchAccount}>
                    Switch Account
                  </button>
                  <button  onClick={handleAddAccountClick}>
                    Add Account
                  </button>
                  <button  onClick={handleImportAccountClick}>
                    Import Account
                  </button>
                  {showAccountList && (
                    <div className="overlay" onClick={handlePopupClose}>
                      <div className="popup">
                        <h2>Accounts</h2>
                        <div>
                        <ul>
                        {addressList.map((account, index) => (
                          <li key={account.name} onClick={() => accountSelected(account, index)} className={selectedAccountObject.name === account.name ? 'selected' : ''}>
                            {account.name}
                          </li>
                        ))}
                      </ul>
                        </div>
                        
                      </div>
                    </div>
                  )}
            </div>
            <div>
              <button hidden={exportedMnemonic} onClick={handleExportMnemonicButtonClick}>Export Mnemonic</button>
              {exportedMnemonic && <div className="export-mnemonic-container">
                {<textarea style={{width:400 + 'px'}} value={exportedMnemonic} ref={textAreaRef} disabled />}
                <button onClick={handleCopyMnemonicClick}>Copy</button>
              </div>}
            </div>
            <div>
              <button hidden={exportedPrivateKey} onClick={handleExportPKButtonClick}>Export Private Key</button>
                {exportedPrivateKey && <div className="export-mnemonic-container">
                  {<textarea style={{width:400 + 'px'}} value={exportedPrivateKey} ref={textAreaRef} disabled />}
                  <button onClick={handleCopyPrivateKeyClick}>Copy</button>
                </div>}
            </div>
              <div>
                <button hidden={showSendEthersComponent}  onClick={() => setShowSendEthersComponent(true)}>
                  Send Ethers
                </button>
                {showSendEthersComponent && 
                  <div className="send-ether-container">
                    <textarea className="send-ether-textarea" placeholder="Enter the recipient account" value={recipientAccount} onChange={(e) => setRecipientAccount(e.target.value)} />
                    <input style={{width:50 + 'px'}}  type="text" placeholder="Amount in ETH" value={etherTransferValue} onChange={handleEtherInputChange}/>
                    <div>
                      <button onClick={() => setShowSendEthersComponent(false)}>Cancel</button>
                      <button onClick={sendEthers}>Send</button>
                    </div>
                  </div>}
              </div>
              <div>
                <button onClick={() => disconnectWallet()}>
                    Logout
                </button>
              </div>
          </div>}
      </div>}
    </div>
  );
}

export default HDWalletForm;
