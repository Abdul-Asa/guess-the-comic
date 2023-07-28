import React from "react";

type comicData = {
  title: string;
  imgSrc: string;
};
const Modal = (answer?: comicData, loadNewRound?: () => void) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      data-modal-placement="center"
      className=" absolute top-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center content-center flex-wrap"
    >
      <div className=" relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-fit ">
        <div className="p-6 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            The answer was <b>{answer?.title}</b>
          </h1>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Would you like to play again
          </h3>
          <div className="flex space-x-4">
            <button
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={loadNewRound}
            >
              Yeah, sure
            </button>
            <a href="/">
              <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                No, I love courting death
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
