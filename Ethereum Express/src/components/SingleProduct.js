import React from "react";
import { useParams } from "react-router-dom";
import { dummyData } from "../utils/dummyData";
function SingleProduct() {
  let { id } = useParams();
  let data = dummyData.filter((item) => item.id == id);

  return (
    <>
      <div className="flex justify-center w-full h-full sm:p-10 sm:mt-10 mt-12">
        <div className="flex flex-col w-1/1 items-center bg-white rounded-lg  md:flex-row shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <img
            className="object-cover w-full rounded-t-lg h-96  md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg"
            src={data[0].imageUrl}
            alt={data[0].name}
          />
          <div className="flex flex-col p-10 w-full leading-normal">
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data[0].name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {data[0].category}
            </p>
            <div className="flex items-center">
              {new Array(+data[0].ratings).fill(0).map((item, i) => (
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>{i} star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}

              {new Array(5 - +data[0].ratings).fill(0).map((item, i) => (
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-300 dark:text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>

            <div className="flex items-center mb-5 mt-3 ">
              <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {data[0].excellent}
              </p>
              <p className="ml-2 font-medium text-gray-900 dark:text-white">
                Excellent
              </p>
              <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {data[0].reviews} reviews
              </p>
              <a
                href="#"
                className="ml-2 text-sm font-medium  text-blue-600 hover:underline dark:text-blue-500"
              >
                Read all reviews
              </a>
            </div>
            <div className="gap-10 sm:grid sm:grid-cols-2">
              <div>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Chances
                  </dt>
                  <dd className="flex items-center mb-3">
                    <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                        style={{ width: `${data[0].chances * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {data[0].chances}
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Comfort
                  </dt>
                  <dd className="flex items-center mb-3">
                    <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                        style={{ width: `${data[0].comfort * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {data[0].comfort}
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Easy To Use
                  </dt>
                  <dd className="flex items-center mb-3">
                    <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                        style={{ width: `${data[0].easytouse * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {data[0].easytouse}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Value for money
                  </dt>
                  <dd className="flex items-center mb-3">
                    <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                        style={{ width: `${data[0].valueformoney * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {data[0].valueformoney}
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Cleanliness
                  </dt>
                  <dd className="flex items-center mb-3">
                    <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                        style={{ width: `${data[0].cleanliness * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {data[0].cleanliness}
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Accuracy
                  </dt>
                  <dd className="flex items-center">
                    <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                        style={{ width: `${data[0].accuracy * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {data[0].accuracy}
                    </span>
                  </dd>
                </dl>
              </div>
            </div>

            <div className="flex justify-between mt-10 w-1/1">
              <button
                className="px-6 py-2.5 bg-green-800 text-white font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-green-900 hover:shadow-lg
            focus:bg-green-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-900 
            active:shadow-lg transition duration-150 ease-in-out"
                disabled={true}
              >
                <span className="font-extrabold">{data[0].price} ETH</span>
              </button>
              <button
                className="px-6 py-2.5 bg-blue-800 text-white font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg
            focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 
            active:shadow-lg transition duration-150 ease-in-out"
              >
                Order Placed
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
