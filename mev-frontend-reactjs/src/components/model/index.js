import React from 'react';

const Modal = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed inset-0 overflow-y-auto z-50`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="modal">
          {/* Modal content */}
          <div className="bg-white p-4">
            <p>Modal Content</p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
