import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import QRCode from 'react-qr-code';


const WalletHome = (props) => {
  const location = useLocation();
  const get = location.state?.initialSeedPhrase;
  const [seedPhrase, setSeedPhrase] = useState(get);
  const [walletAddress, setWalletAddress] = useState('');
  const { recoveredSeedPhrase } = location.state;
 
  // Function to generate the wallet address
  const generateWalletAddress = () => {
    if (recoveredSeedPhrase ) {
      try {
        // Create a wallet instance from the provided seed phrase
        const wallet = ethers.Wallet.fromMnemonic(recoveredSeedPhrase );

        // Get the wallet address
        const address = wallet.address;
        setWalletAddress(address);
      } catch (error) {
        console.error('Error generating wallet address:', error);
      }
    }
  };

  useEffect(() => {
    generateWalletAddress();
  }, [recoveredSeedPhrase ]);
console.log(recoveredSeedPhrase)
  return (
    <div>
      <body>
      <nav class="relative px-8 py-7 flex justify-center items-center bg-black border-2 border-[#00FFA2]">


<ul class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex items-center space-x-6 lg:static lg:flex-row lg:space-x-6 lg:transform-none ">
    <li><Link class="text-sm text-gray-400 hover:text-gray-500" to="/home/walletHome">DEPOSIT</Link></li>
    <li class="text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
    </li>
    <li><Link class="text-sm text-blue-600 font-bold" href="#">Withdraw</Link></li>
    <li class="text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
    </li>
    <li><Link class="py-6 text-sm text-gray-400 hover:text-gray-500" href="#">START BOT</Link></li>
    <li class="text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
    </li>
    <li><Link class="text-sm text-gray-400 hover:text-gray-500" href="#">HISTORY</Link></li>
</ul>

</nav>

	
</body>

      <div className="flex items-center justify-center md-screen p-28">
      <div className="bg-black shadow-md w-70 h-30 rounded-xl bg-clip-border border-4 border-[#00FFA2]">
        <div className="p-6">
          <h5 className=" flex items-center justify-center py-4 text-2xl mb-2 font-sans  antialiased  underline  text-[#00FFA2] leading-snug tracking-normal text-blue-gray-900">
          DEPOSIT

          </h5>
          <div className='text-left py-3 flex items-center justify-center'>
            <h1>Use this ETHEREUM address to top up your balance</h1>
          </div>
          <div className='flex items-center justify-center py-1 font-bold text-xl'>
            Account
          </div>
          <div className='flex items-center justify-center'>
          <QRCode
                        title="Mev"
                        value={walletAddress}
                        bgColor='white'
                        fgColor='150'
                        size="150"
                    />
          </div>
          <div className='py-16'>
          <div className='text-white flex items-center justify-center py-2 gap-10 border-2 border-[#00FFA2] '>
          <p> {walletAddress}</p>

          </div>
          </div>
        
     
        </div>
        <div className=" flex items-center justify-center p-6 pt-0">
          <button
            className=" select-none rounded-lg hover:bg-[#92cfab] bg-black border-2 border-[#00FFA2]   py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
           
          >
              Import Wallet
          </button>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default WalletHome;
