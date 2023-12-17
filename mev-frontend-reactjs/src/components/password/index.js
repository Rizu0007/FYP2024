import React, { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PinInput from 'react-pin-input';

const Password = () => {
  const location = useLocation();
  const initialSeedPhrase = location.state?.seedPhrase;
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const navigate = useNavigate();
  const [local, setlocal] = useState();



   
  useEffect(() => {
    let token = localStorage.getItem('usersdatatoken');
    setlocal(token);
    console.log(token)
  }, []);

  // Function to check if the "Create Wallet" button should be enabled
  const isCreateWalletButtonEnabled = isSaveEnabled && pinCode.length === 4;

  const handleCreateWallet = async () => {
    if (isCreateWalletButtonEnabled) {
      try {
        const response = await axios.post('/store-pin-code', { pinCode } ,{headers:{authorization :local}});

        if (response.status === 201) {
          console.log('Pin code saved successfully');
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error creating wallet:', error);
      }
    } else {
      console.error('Invalid input or "Save" is not enabled.');
    }
    navigate('auth/bot/deposit', { state: { initialSeedPhrase } });

  };

  const handleSaveToggle = (event) => {
    setIsSaveEnabled(event.target.checked);
  };

  return (
    <div className="flex items-center justify-center md:p-28 p-4">
      <div className="bg-black border-4 border-[#00FFA2] shadow-md w-full rounded-xl bg-clip-border p-6">
        <h5 className="text-center font-bold text-3xl mb-2 text-[#00FFA2] underline text-blue-gray-900">
          Step 2. Create Pin Code
        </h5>

        <p className="text-base font-light leading-relaxed text-inherit mt-4">
          The pin code is used for the protection of the application. In case of its loss, you need to reset the bot settings and import the generated wallet using the Mnemonic phrase. Create and save a pin code for your wallet (0-9).
        </p>

        <div className="flex items-center justify-center">
          <PinInput
            length={4}
            initialValue=""
            secret
            secretDelay={800}
            onChange={(value) => setPinCode(value)}
            type="numeric"
            inputMode="number"
            style={{ padding: '10px', borderColor: 'green' }}
            inputStyle={{ borderColor: 'green' }}
            inputFocusStyle={{ borderColor: 'green' }}
            onComplete={(value, index) => {}}
            autoSelect={true}
            regexCriteria={/^\d*$/}
            mask={null}
            placeholder=""
          />
        </div>

        <p className="mt-4">
          I've written down and saved the pin code in a safe place.
        </p>

        <div className="mt-6 flex items-center space-x-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSaveEnabled}
              onChange={handleSaveToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-white rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Save</span>
          </label>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className={`bg-black border-2 py-3 border-[#00FFA2] text-white hover:bg-green-700 focus:outline-none
            md:text-sm md:py-3 md:px-4
            ${!isCreateWalletButtonEnabled && 'opacity-50 cursor-not-allowed'}`}
            onClick={handleCreateWallet}
            disabled={!isCreateWalletButtonEnabled}
          >
            Create Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
