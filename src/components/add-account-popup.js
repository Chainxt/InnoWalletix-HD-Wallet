export default function AddAccountPopup({index, onSave, handleChange, accountName, onCancel}){
    return (
      <div className="custom-modal">
        <div className="custom-modal-content">
          <h4>Add Account</h4>
          <div className="add-account-container">
            <input type="text" placeholder={"Account"+index} value={accountName} onChange={handleChange}/>
            <div className="add-account-buttons-container">
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onSave}>Add</button>
            </div>
          </div>
        </div>
      </div>
    );
  };