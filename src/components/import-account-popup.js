export default function ImportAccountPopup({index, onSave, handleAccountChange,handleKeyChange, accountName, onCancel, importPrivateKey}){
    return (
      <div className="custom-modal">
        <div className="custom-modal-content">
          <h4>Import Account</h4>
          <div className="add-account-container">
            <input type="text" placeholder={"Enter the private key"} value={importPrivateKey} onChange={handleKeyChange}/>
            <input type="text" placeholder={"Account"+index} value={accountName} onChange={handleAccountChange}/>
            <div className="add-account-buttons-container">
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  