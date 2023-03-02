import React from "react";
import "./Status.css";
import { QRCodeCanvas } from "qrcode.react";
import { useParams } from "react-router-dom";
import { dummyData } from "../utils/dummyData";

const Status = () => {
  const { id } = useParams();
  let data = dummyData.filter((item) => item.id == id);
  return (
    <>
      <div className="p-4 w-full border flex justify-center items-center">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center pb-10 mt-10">
            <img
              class="w-40 h-40 mb-3 rounded-full shadow-lg"
              src={data[0].imageUrl}
              alt="Bonnie image"
            />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {data[0].name}
            </h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {data[0].category}
            </span>
            <div class="flex mt-4 space-x-3 md:mt-3">
              <div className="order-track">
                <div className="order-track-step">
                  <div className="order-track-status">
                    <span className="order-track-status-dot"></span>
                    <span className="order-track-status-line"></span>
                  </div>
                  <div className="order-track-text flex ">
                    <div className="flex flex-col">
                      <p className="order-track-text-stat">Order Received</p>
                      <span className="order-track-text-sub">
                        21st November, 2019
                      </span>
                    </div>
                    <QRCodeCanvas
                      id="qrCode"
                      value={data[0].name}
                      size={50}
                      bgColor={"#ffffff"}
                      level={"L"}
                      className="mx-10"
                    />
                  </div>
                </div>
                <div className="order-track-step">
                  <div className="order-track-status">
                    <span className="order-track-status-dot"></span>
                    <span className="order-track-status-line"></span>
                  </div>
                  <div className="order-track-text flex">
                    <div className="flex flex-col">
                      {" "}
                      <p className="order-track-text-stat">Order Processed</p>
                      <span className="order-track-text-sub">
                        21st November, 2019
                      </span>
                    </div>
                  </div>
                  <QRCodeCanvas
                    id="qrCode"
                    value={data[0].name}
                    size={50}
                    bgColor={"#ffffff"}
                    level={"L"}
                    className="mx-10"
                  />
                </div>
                <div className="order-track-step">
                  <div className="order-track-status">
                    <span className="order-track-status-dot"></span>
                    <span className="order-track-status-line"></span>
                  </div>
                  <div className="order-track-text">
                    <p className="order-track-text-stat">
                      Manufracturing In Progress
                    </p>
                    <span className="order-track-text-sub">
                      21st November, 2019
                    </span>
                  </div>
                </div>
                <div className="order-track-step">
                  <div className="order-track-status">
                    <span className="order-track-status-dot"></span>
                    <span className="order-track-status-line"></span>
                  </div>
                  <div className="order-track-text">
                    <p className="order-track-text-stat">Order Dispatched</p>
                    <span className="order-track-text-sub">
                      21st November, 2019
                    </span>
                  </div>
                </div>
                <div className="order-track-step">
                  <div className="order-track-status">
                    <span className="order-track-status-dot"></span>
                    <span className="order-track-status-line"></span>
                  </div>
                  <div className="order-track-text">
                    <p className="order-track-text-stat">Order Deliverd</p>
                    <span className="order-track-text-sub">
                      21st November, 2019
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Status;
