import React from 'react';

const AlertDescription = () => {
  return (
    <div className="flex gap-9 items-start">
      <div className="flex flex-col gap-[15px] items-start">
        <div className="relative w-full h-[17px]">
          <p className="text-sm leading-[18px] tracking-[0.005em] text-slate-600">
            <span className="text-slate-600 text-sm tracking-[0.005em] font-medium">
              Description
            </span>
          </p>
        </div>
        <div className="flex items-start w-full">
          <div className="rounded-md p-4 flex gap-5 items-start flex-1 w-full bg-yellow-50">
            <div className="pt-[3px] pb-0 flex gap-0 items-start">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1734_26781)">
                  <path
                    d="M8.982 1.56601C8.88301 1.39358 8.74027 1.25031 8.56821 1.15069C8.39614 1.05106 8.20083 0.998596 8.002 0.998596C7.80317 0.998596 7.60786 1.05106 7.43579 1.15069C7.26372 1.25031 7.12099 1.39358 7.022 1.56601L0.164999 13.233C-0.292001 14.011 0.255999 15 1.145 15H14.858C15.747 15 16.296 14.01 15.838 13.233L8.982 1.56601ZM8 5.00001C8.535 5.00001 8.954 5.46201 8.9 5.99501L8.55 9.50201C8.53824 9.63978 8.4752 9.76813 8.37335 9.86165C8.27151 9.95517 8.13827 10.0071 8 10.0071C7.86173 10.0071 7.72849 9.95517 7.62664 9.86165C7.5248 9.76813 7.46176 9.63978 7.45 9.50201L7.1 5.99501C7.08743 5.86925 7.10134 5.74224 7.14084 5.62218C7.18035 5.50212 7.24456 5.39166 7.32934 5.29792C7.41413 5.20419 7.51761 5.12925 7.63312 5.07794C7.74863 5.02663 7.87361 5.00008 8 5.00001ZM8.002 11C8.26722 11 8.52157 11.1054 8.70911 11.2929C8.89664 11.4804 9.002 11.7348 9.002 12C9.002 12.2652 8.89664 12.5196 8.70911 12.7071C8.52157 12.8947 8.26722 13 8.002 13C7.73678 13 7.48243 12.8947 7.29489 12.7071C7.10736 12.5196 7.002 12.2652 7.002 12C7.002 11.7348 7.10736 11.4804 7.29489 11.2929C7.48243 11.1054 7.73678 11 8.002 11Z"
                    fill="#FACC15"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1734_26781">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col gap-[5px] items-start flex-1 w-full">
              <div className="pr-[35px] flex gap-2.5 items-start w-full">
                <p className="text-lg leading-[22px] tracking-[0.005em] text-yellow-800">
                  <span className="text-yellow-800 text-lg tracking-[0.005em] font-bold">
                    Warning Title
                  </span>
                </p>
              </div>
              <p className="text-base leading-6 tracking-[0.005em] text-yellow-700">
                <span className="text-yellow-700 text-base tracking-[0.005em] font-normal">
                  We are unable to save any progress at this time.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[15px] items-start">
        <div className="relative w-full h-[17px]">
          <p className="text-sm leading-[18px] tracking-[0.005em] text-slate-600">
            <span className="text-slate-600 text-sm tracking-[0.005em] font-medium">
              List
            </span>
          </p>
        </div>
        <div className="flex items-start w-full">
          <div className="rounded-md p-4 flex gap-5 items-start flex-1 w-full bg-red-50">
            <div className="pt-[3px] pb-0 flex gap-0 items-start">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1734_27807)">
                  <path
                    d="M8.98201 1.56601C8.88302 1.39358 8.74028 1.25031 8.56821 1.15069C8.39614 1.05106 8.20084 0.998596 8.00201 0.998596C7.80318 0.998596 7.60787 1.05106 7.4358 1.15069C7.26373 1.25031 7.121 1.39358 7.02201 1.56601L0.165007 13.233C-0.291993 14.011 0.256007 15 1.14501 15H14.858C15.747 15 16.296 14.01 15.838 13.233L8.98201 1.56601ZM8.00001 5.00001C8.53501 5.00001 8.95401 5.46201 8.90001 5.99501L8.55001 9.50201C8.53825 9.63978 8.47521 9.76813 8.37336 9.86165C8.27152 9.95517 8.13828 10.0071 8.00001 10.0071C7.86173 10.0071 7.7285 9.95517 7.62665 9.86165C7.52481 9.76813 7.46177 9.63978 7.45001 9.50201L7.10001 5.99501C7.08744 5.86925 7.10135 5.74224 7.14085 5.62218C7.18035 5.50212 7.24456 5.39166 7.32935 5.29792C7.41414 5.20419 7.51762 5.12925 7.63313 5.07794C7.74864 5.02663 7.87361 5.00008 8.00001 5.00001ZM8.00201 11C8.26722 11 8.52158 11.1054 8.70911 11.2929C8.89665 11.4804 9.00201 11.7348 9.00201 12C9.00201 12.2652 8.89665 12.5196 8.70911 12.7071C8.52158 12.8947 8.26722 13 8.00201 13C7.73679 13 7.48244 12.8947 7.2949 12.7071C7.10736 12.5196 7.00201 12.2652 7.00201 12C7.00201 11.7348 7.10736 11.4804 7.2949 11.2929C7.48244 11.1054 7.73679 11 8.00201 11Z"
                    fill="#F87171"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1734_27807">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col gap-[5px] items-start flex-1 w-full">
              <div className="pr-[35px] flex gap-2.5 items-start w-full">
                <p className="text-lg leading-[22px] tracking-[0.005em] text-red-800">
                  <span className="text-red-800 text-lg tracking-[0.005em] font-bold">
                    Error Title
                  </span>
                </p>
              </div>
              <p className="text-base leading-6 tracking-[0.005em] text-red-700">
                <span className="text-red-700 text-base tracking-[0.005em] font-normal">
                  This username is already in use Email field can't be empty
                  Please enter a valid phone number
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[15px] items-start">
        <div className="relative w-full h-[17px]">
          <p className="text-sm leading-[18px] tracking-[0.005em] text-slate-600">
            <span className="text-slate-600 text-sm tracking-[0.005em] font-medium">
              Actions
            </span>
          </p>
        </div>
        <div className="flex items-start w-full">
          <div className="rounded-md p-4 flex gap-5 items-start flex-1 w-full bg-[#ebdff9]">
            <div className="pt-[3px] pb-0 flex gap-0 items-start">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1734_27762)">
                  <path
                    d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM8.93 6.588L7.93 11.293C7.86 11.633 7.959 11.826 8.234 11.826C8.428 11.826 8.721 11.756 8.92 11.58L8.832 11.996C8.545 12.342 7.912 12.594 7.367 12.594C6.664 12.594 6.365 12.172 6.559 11.275L7.297 7.807C7.361 7.514 7.303 7.408 7.01 7.337L6.559 7.256L6.641 6.875L8.931 6.588H8.93ZM8 5.5C7.73478 5.5 7.48043 5.39464 7.29289 5.20711C7.10536 5.01957 7 4.76522 7 4.5C7 4.23478 7.10536 3.98043 7.29289 3.79289C7.48043 3.60536 7.73478 3.5 8 3.5C8.26522 3.5 8.51957 3.60536 8.70711 3.79289C8.89464 3.98043 9 4.23478 9 4.5C9 4.76522 8.89464 5.01957 8.70711 5.20711C8.51957 5.39464 8.26522 5.5 8 5.5Z"
                    fill="#4D4566"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1734_27762">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col gap-[5px] items-start flex-1 w-full">
              <div className="pr-[35px] flex gap-2.5 items-start w-full">
                <p className="text-lg leading-[22px] tracking-[0.005em] text-[#110733]">
                  <span className="text-[#110733] text-lg tracking-[0.005em] font-bold">
                    Information Title
                  </span>
                </p>
              </div>
              <p className="text-base leading-6 tracking-[0.005em] text-[#4d4566]">
                <span className="text-[#4d4566] text-base tracking-[0.005em] font-normal">
                  Notifications may include alerts, sounds and icon badges.
                  These can be configured in Settings.
                </span>
              </p>
              <div className="pt-2.5 pb-0 flex gap-[5px] items-start w-full">
                <button className="flex items-start bg-transparent">
                  <div className="overflow-hidden rounded-md px-3 py-2 flex gap-2 justify-center items-center bg-[#ebdff9]">
                    <small className="text-sm leading-[17px] tracking-[0.005em] text-center text-[#5a00cd]">
                      <span className="text-[#5a00cd] text-sm tracking-[0.005em] font-medium">
                        Button-sm
                      </span>
                    </small>
                  </div>
                </button>
                <button className="flex items-start bg-transparent">
                  <div className="overflow-hidden rounded-md px-3 py-2 flex gap-2 justify-center items-center bg-transparent">
                    <small className="text-sm leading-[17px] tracking-[0.005em] text-center text-[#5a00cd]">
                      <span className="text-[#5a00cd] text-sm tracking-[0.005em] font-medium">
                        Button-sm
                      </span>
                    </small>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDescription; 