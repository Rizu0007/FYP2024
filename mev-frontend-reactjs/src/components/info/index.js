import React from "react";

const Info = () => {
  const bodyData = [
    "Provide you the Seed Phrase for the Wallet Creation",
    "Easy to use",
    "An enhanced automatic algorithm, allows you to use in the Campus for daily use",
    "Professional Technical Support",
    "User Friendly and intuitive Interface",
    "Free Trial Available"
  ]
  return (
    <div className="info py-6">
      <div className="custom-container">
        <div className="border border-[#393939] rounded-md flex md:flex-row flex-col md:tems-center overflow-hidden">
          <button className="text-white p-4 tab-btn active rounded border-r border-[#393939]">
            Comsats Coin
          </button>

        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-12 md:w-4/5 mx-auto">
          {
            bodyData.map((item, index) => (
              <div className="flex justify-start items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 66 66"
                  className="mr-3 shape"
                >
                  <g
                    id="Group_16220"
                    data-name="Group 16220"
                    transform="translate(-273 -522)"
                  >
                    <g
                      id="Rectangle_10716"
                      data-name="Rectangle 10716"
                      transform="translate(273 522)"
                      fill="#0e1f17"
                      stroke="#589b74"
                      strokeWidth="2"
                    >
                      <rect width="66" height="66" rx="6" stroke="none" />
                      <rect
                        x="1"
                        y="1"
                        width="64"
                        height="64"
                        rx="5"
                        fill="none"
                      />
                    </g>
                    <path
                      id="Subtração_8"
                      data-name="Subtração 8"
                      d="M15.988,31.976h0l-3.587-2.6-4.407.465-1.8-4.052-4.05-1.8.465-4.406L0,15.988,2.6,12.4,2.136,7.994l4.052-1.8,1.8-4.05,4.406.465L15.988,0l3.587,2.6,4.407-.465,1.8,4.052,4.05,1.8L29.37,12.4l2.6,3.588-2.6,3.591.465,4.407-4.052,1.8-1.8,4.05L19.58,29.37l-3.588,2.6ZM9.951,15.838a.514.514,0,0,0-.365.151L8.117,17.446a.517.517,0,0,0,0,.732l4.392,4.4a.518.518,0,0,0,.732,0L23.484,12.335a.518.518,0,0,0,0-.731l-1.462-1.47a.517.517,0,0,0-.732,0l-8.413,8.411-2.56-2.559a.513.513,0,0,0-.369-.148Z"
                      transform="translate(290.324 539.323)"
                      fill="#fff"
                    />
                  </g>
                </svg>

                <p className="text-white text-xl">
                  {item}
                </p>
              </div>
            ))

          }
        </div>
      </div>
    </div>
  );
};

export default Info;
