import React from "react";

interface AddManagerModalProps {
  setModal: (value: boolean) => void;
}

const Addmanagermodal: React.FC<AddManagerModalProps> = ({ setModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setModal(false)}
      />

      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Confirm Manager Addition
          </h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to add this manager? This action cannot be
            undone.
          </p>
        </div>

        <div className="flex justify-end gap-4">
          {/* Cancel Button */}
          <button
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={() => setModal(false)}
          >
            Cancel
          </button>

          {/* Confirm Button */}
          <button
            className="rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            onClick={() => {
              // Add confirmation logic here (e.g., API call)
              console.log("Manager added!");
              setModal(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addmanagermodal;
