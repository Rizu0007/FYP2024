import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useStateContext } from '../../components/Context';

import { LoginContext } from '../../components/ContextProvider';
function Stop() {

  // const {
  //   transferNativeToken,
  //   currentHolder,
  //   tokenSale,
  //   tokenHolders,
  //   nativeToken,
  //   balance,
  //   tokenBalance,
  //   address,
  //   buyToken,
  //   ConnectWallet,
  //   setAddress,
  //   mintToken,
  //   transferToken,
  //   buyProduct,
  // } = useStateContext();

  const { buyProduct } = useContext(LoginContext);

  const [activeTab, setActiveTab] = useState("mess");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentInvoice, setCurrentInvoice] = useState(null);



  const tabClass = (tabName) => {
    return `flex items-center text-white justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 ${activeTab === tabName ? 'bg-black text-white border-2 border-[#00FFA2]' : 'bg-inherit'}`;
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchProducts();
  }, []);

  const generateInvoice = (product) => {
    const invoice = {
      productName: product.name,
      price: product.price
      // add more details as necessary
    };

    setCurrentInvoice(invoice);
    // Show the invoice modal (or handle the invoice display differently)
  };

  useEffect(() => {
    if (currentInvoice) {
      alert(`Invoice\nProduct: ${currentInvoice.productName}\nPrice: ${currentInvoice.price}`);
      // After displaying the invoice, clear the current invoice state
      setCurrentInvoice(null);
    }
  }, [currentInvoice]);

  return (
    <>
      <div className="feature-card rounded-md">
        <div className="border-2 min-h-[150px] flex flex-col gap-4 border-[#393939] p-5 rounded-r rounded-b">
          <div class="w-full">
            <div class="relative right-0">
              <ul class="relative flex flex-wrap p-1 list-none rounded-xl bg-blue-gray-50/60" data-tabs="tabs" role="list">
                <li class="z-30 flex-auto text-center">
                  <a
                    className={tabClass('mess')}
                    onClick={() => setActiveTab('mess')}
                    role="tab"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                      class="w-5 h-5">
                      <path
                        d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z">
                      </path>
                      <path
                        d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z">
                      </path>
                      <path
                        d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z">
                      </path>
                    </svg>
                    <span class="ml-1 text-white">Mess</span>
                  </a>
                </li>

                <li class="z-30 flex-auto text-center">
                  <a
                    className={tabClass('mess2')}
                    onClick={() => setActiveTab('mess2')}
                    role="tab"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                      class="w-5 h-5">
                      <path
                        d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z">
                      </path>
                      <path
                        d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z">
                      </path>
                      <path
                        d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z">
                      </path>
                    </svg>
                    <span class="ml-1">E-Shop</span>
                  </a>
                </li>
                <li class="z-30 flex-auto text-center">
                  <a
                    className={tabClass('profile')}
                    onClick={() => setActiveTab('profile')}
                    role="tab"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                      class="w-5 h-5">
                      <path fill-rule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-1">Profile</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-4">
            {activeTab === 'mess' && <div><div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">

              <div class="border-b mb-5 flex justify-between text-sm">
                <div class="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">

                  <a href="#" class="font-semibold inline-block">All the Product</a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  placeholder-shown:">
              {products.filter(product => product.category === 'mess').map(product => (
                  <div key={product._id} className="rounded overflow-hidden shadow-lg flex flex-col border-2 border-[#00FFA2]">
                    <div className="relative">
                      <img className="w-full" src={product.image} alt={product.name} />

                      <div className="px-6 py-4 mb-auto">
                        <h2 className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2">
                          {product.name}
                        </h2>
                        <div className="text-gray-500 text-xl
    
           
          
          
           flex items-baseline">
                          <p className="mr-2">Price:</p>
                          <h1 className="font-bold text-[#00FFA2] text-xl">{product.price}</h1>
                        </div>
                      </div>

                      <div className="px-6 py-3 flex flex-row items-center justify-between bg-black border-[#00FFA2]">
                        <button className="w-32 text-white py-3 border-2 border-[#00FFA2] hover:bg-red-700"
                          onClick={() => { setShowModal(true); setSelectedProduct(product) }}
                        >
                          View Detail
                        </button>

                        <button 
                          className="w-32 text-white py-3 border-2 border-[#00FFA2] hover:bg-red-700 flex items-center justify-center" 
                          onClick={() => buyProduct(product.price)}
                        >
                          <img src="https://img.icons8.com/plasticine/100/shopping-cart-loaded.png" alt="shopping-cart" className="animate-bounce" width="30" height="30" />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {showModal && selectedProduct && (
                <>
                        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-4/5 my-6 mx-auto max-w-3xl bg-black rounded-lg shadow-xl border-4 border-[#00FFA2] transition duration-500 ease-in-out transform">
                <div className="p-5 border-b border-[#00FFA2]  rounded-t">
                    <div className="flex items-start justify-between">
                        <h3 className="text-2xl font-semibold text-[#00FFA2]">Product Details</h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-gray-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="text-gray-500 hover:text-gray-700 h-6 w-6 text-2xl block rounded-full transition duration-150 ease-in-out">
                                ×
                            </span>
                        </button>
                    </div>
                </div>

                <div className="relative p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img className="w-full h-64 object-cover rounded-lg" src={selectedProduct.image} alt={selectedProduct.name} />
                        <div className="mt-4 flex justify-between items-center">
                            <button 
                                onClick={() => buyProduct(selectedProduct.price)} 
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition duration-150 ease-in-out">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-2 text-blue-400">{selectedProduct.name}</h2>
                        <div className="mb-4">
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Price:</span>
                                <span className="ml-2 text-[#00FFA2] font-semibold">{selectedProduct.price}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Availability:</span>
                                <span className="ml-2 text-gray-600">In Stock</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Category:</span>
                                <span className="ml-2 text-[#00FFA2]">{selectedProduct.category}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Food Type:</span>
                                <span className="ml-2 text-[#00FFA2]">{selectedProduct.size}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Category:</span>
                                <span className="ml-2 text-[#00FFA2]">{selectedProduct.location}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Category:</span>
                                <span className="ml-2 text-[#00FFA2]">{selectedProduct.category}</span>
                            </div>
                        </div>

                        <div className="text-gray-700">
                            <span className="font-semibold">Product Description:</span>
                            <p className="text-white mt-2">
                                {selectedProduct.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 transition duration-150 ease-in-out"
                        type="button"
                        onClick={() => { setShowModal(false); }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

                </>
              )}
            </div>
            </div>
            }

            {activeTab === 'mess2' && <div>

            <div class="border-b mb-5 flex justify-between text-sm">
                <div class="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">

                  <a href="#" class="font-semibold inline-block">ALL Product</a>
                </div>
                {/* <a href="#">See All</a> */}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  placeholder-shown:">
              {products.filter(product => product.category === 'eshop').map(product => (
                  <div key={product._id} className="rounded overflow-hidden shadow-lg flex flex-col border-2 border-[#00FFA2]">
                    <div className="relative">
                      <img className="w-full" src={product.image} alt={product.name} />

                      <div className="px-6 py-4 mb-auto">
                        <h2 className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2">
                          {product.name}
                        </h2>
                        <div className="text-gray-500 text-xl
    
           
          
          
           flex items-baseline">
                          <p className="mr-2">Price:</p>
                          <h1 className="font-bold text-[#00FFA2] text-xl">{product.price}</h1>
                        </div>
                      </div>

                      <div className="px-6 py-3 flex flex-row items-center justify-between bg-black border-[#00FFA2]">
                        <button className="w-32 text-white py-3 border-2 border-[#00FFA2] hover:bg-red-700"
                          onClick={() => { setShowModal(true); setSelectedProduct(product) }}
                        >
                          View Detail
                        </button>

                        <button 
                          className="w-32 text-white py-3 border-2 border-[#00FFA2] hover:bg-red-700 flex items-center justify-center" 
                          onClick={() => buyProduct(product.price)}
                        >
                          <img src="https://img.icons8.com/plasticine/100/shopping-cart-loaded.png" alt="shopping-cart" className="animate-bounce" width="30" height="30" />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {showModal && selectedProduct && (
                <>
                     <div className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-4/5 my-6 mx-auto max-w-3xl bg-black rounded-lg shadow-xl border-4 border-[#00FFA2] transition duration-500 ease-in-out transform">
                <div className="p-5 border-b border-[#00FFA2]  rounded-t">
                    <div className="flex items-start justify-between">
                        <h3 className="text-2xl font-semibold text-[#00FFA2]">Product Details</h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-gray-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="text-gray-500 hover:text-gray-700 h-6 w-6 text-2xl block rounded-full transition duration-150 ease-in-out">
                                ×
                            </span>
                        </button>
                    </div>
                </div>

                <div className="relative p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img className="w-full h-64 object-cover rounded-lg" src={selectedProduct.image} alt={selectedProduct.name} />
                        <div className="mt-4 flex justify-between items-center">
                            <button 
                                onClick={() => buyProduct(selectedProduct.price)} 
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition duration-150 ease-in-out">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-2 text-blue-400">{selectedProduct.name}</h2>
                        <div className="mb-4">
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Price:</span>
                                <span className="ml-2 text-[#00FFA2] font-semibold">{selectedProduct.price}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Availability:</span>
                                <span className="ml-2 text-gray-600">In Stock</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Category:</span>
                                <span className="ml-2 text-[#00FFA2]">{selectedProduct.category}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Food Type:</span>
                                <span className="ml-2 text-[#00FFA2]">{selectedProduct.size}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Category:</span>
                                <span className="ml-2 text-[#00FFA2]">{selectedProduct.location}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Category:</span>
                                <span className="ml-2 text-[#00FFA2]">{selectedProduct.category}</span>
                            </div>
                        </div>

                        <div className="text-gray-700">
                            <span className="font-semibold">Product Description:</span>
                            <p className="text-white mt-2">
                                {selectedProduct.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 transition duration-150 ease-in-out"
                        type="button"
                        onClick={() => { setShowModal(false); }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
                </>
              )}


            </div>}


            {activeTab === 'profile' && (
              <div>
                {currentInvoice ? (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold">Invoice</h2>
                      <p><strong>Product:</strong> {currentInvoice.productName}</p>
                      <p><strong>Price:</strong> {currentInvoice.price}</p>
                      <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => setCurrentInvoice(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>No Invoice Generated</div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Stop;
