import React from 'react';

const AlertExamples = () => {
  return (
    <div className="flex flex-col gap-10 items-start w-full">
      <div className="flex flex-col gap-10 items-start relative">
        <div className="flex flex-col gap-[20px] items-start relative">
          <div className="relative w-full h-[17px] bg-transparent">
            <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
              <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
                Link on right
              </span>
            </p>
          </div>
          <div className="flex gap-0 items-start self-stretch relative w-full bg-transparent">
            <div className="rounded-md p-4 flex gap-5 items-start flex-1 relative w-full bg-gray-50">
              <div className="pt-[3px] pb-0 flex gap-0 items-start relative">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1734_26146)">
                    <path
                      d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM8.93 6.588L7.93 11.293C7.86 11.633 7.959 11.826 8.234 11.826C8.428 11.826 8.721 11.756 8.92 11.58L8.832 11.996C8.545 12.342 7.912 12.594 7.367 12.594C6.664 12.594 6.365 12.172 6.559 11.275L7.297 7.807C7.361 7.514 7.303 7.408 7.01 7.337L6.559 7.256L6.641 6.875L8.931 6.588H8.93ZM8 5.5C7.73478 5.5 7.48043 5.39464 7.29289 5.20711C7.10536 5.01957 7 4.76522 7 4.5C7 4.23478 7.10536 3.98043 7.29289 3.79289C7.48043 3.60536 7.73478 3.5 8 3.5C8.26522 3.5 8.51957 3.60536 8.70711 3.79289C8.89464 3.98043 9 4.23478 9 4.5C9 4.76522 8.89464 5.01957 8.70711 5.20711C8.51957 5.39464 8.26522 5.5 8 5.5Z"
                      fill="#4D4566"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1734_26146">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col gap-[5px] items-start flex-1 relative w-full">
                <div className="flex gap-2.5 items-start self-stretch relative w-full">
                  <p className="text-lg leading-[22px] tracking-[0.005em] text-[#110733]">
                    <span className="text-[#110733] text-lg tracking-[0.005em] font-normal">
                      A new software update is available.
                    </span>
                  </p>
                  <div className="pt-0.5 pb-0 flex gap-2.5 items-start relative">
                    <p className="text-base leading-6 tracking-[0.005em] text-[#5a00cd]">
                      <span className="text-[#5a00cd] text-base tracking-[0.005em] font-medium">
                        Details
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] items-start relative">
          <div className="relative w-full h-[17px] bg-transparent">
            <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
              <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
                Discover
              </span>
            </p>
          </div>
          <div className="flex gap-0 items-start self-stretch relative w-full bg-transparent">
            <div className="rounded-md border border-gray-200 px-6 py-4 flex gap-5 items-start flex-1 relative w-full bg-white">
              <div className="pt-[3px] pb-0 flex gap-0 items-start relative">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1734_28228)">
                    <path
                      d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM8.93 6.588L7.93 11.293C7.86 11.633 7.959 11.826 8.234 11.826C8.428 11.826 8.721 11.756 8.92 11.58L8.832 11.996C8.545 12.342 7.912 12.594 7.367 12.594C6.664 12.594 6.365 12.172 6.559 11.275L7.297 7.807C7.361 7.514 7.303 7.408 7.01 7.337L6.559 7.256L6.641 6.875L8.931 6.588H8.93ZM8 5.5C7.73478 5.5 7.48043 5.39464 7.29289 5.20711C7.10536 5.01957 7 4.76522 7 4.5C7 4.23478 7.10536 3.98043 7.29289 3.79289C7.48043 3.60536 7.73478 3.5 8 3.5C8.26522 3.5 8.51957 3.60536 8.70711 3.79289C8.89464 3.98043 9 4.23478 9 4.5C9 4.76522 8.89464 5.01957 8.70711 5.20711C8.51957 5.39464 8.26522 5.5 8 5.5Z"
                      fill="#4D4566"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1734_28228">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col gap-[5px] items-start flex-1 relative w-full">
                <div
                  className="pl-0 pr-[35px] flex gap-2.5 items-start self-stretch relative w-full">
                  <p className="text-lg leading-[22px] tracking-[0.005em] text-[#110733]">
                    <span className="text-[#110733] text-lg tracking-[0.005em] font-bold">
                      New version published
                    </span>
                  </p>
                </div>
                <p className="text-base leading-6 tracking-[0.005em] text-[#4d4566]">
                  <span
                    className="text-[#4d4566] text-base tracking-[0.005em] font-normal"
                    >John Does published a new version of this page. Refresh to see
                    the changes.</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] items-start relative">
          <div className="relative w-full h-[17px] bg-transparent">
            <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
              <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
                Dismiss button
              </span>
            </p>
          </div>
          <div className="flex gap-0 items-start self-stretch relative w-full bg-transparent">
            <div className="rounded-md p-4 flex gap-5 items-start flex-1 relative w-full bg-teal-50">
              <div className="pt-[3px] pb-0 flex gap-0 items-start relative">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1734_26381)">
                    <path
                      d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM12.03 4.97C11.9586 4.89882 11.8735 4.84277 11.7799 4.80522C11.6863 4.76766 11.5861 4.74936 11.4853 4.75141C11.3845 4.75347 11.2851 4.77583 11.1932 4.81717C11.1012 4.85851 11.0185 4.91797 10.95 4.992L7.477 9.417L5.384 7.323C5.24183 7.19052 5.05378 7.1184 4.85948 7.12183C4.66518 7.12525 4.47979 7.20397 4.34238 7.34138C4.20497 7.47879 4.12625 7.66418 4.12283 7.85848C4.1194 8.05278 4.19152 8.24083 4.324 8.383L6.97 11.03C7.04128 11.1012 7.12616 11.1572 7.21958 11.1949C7.313 11.2325 7.41305 11.2509 7.51375 11.2491C7.61444 11.2472 7.71374 11.2251 7.8057 11.184C7.89766 11.1429 7.9804 11.0837 8.049 11.01L12.041 6.02C12.1771 5.8785 12.2523 5.68928 12.2504 5.49296C12.2485 5.29664 12.1698 5.10888 12.031 4.97H12.03Z"
                      fill="#2DD4BF" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1734_26381">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col gap-[5px] items-start flex-1 relative w-full">
                <div
                  className="pl-0 pr-[35px] flex gap-2.5 items-start self-stretch relative w-full">
                  <p className="text-lg leading-[22px] tracking-[0.005em] text-teal-800">
                    <span className="text-teal-800 text-lg tracking-[0.005em] font-bold">
                      File has been successfully uploaded.</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-9 items-start relative">
        <div className="flex flex-col gap-[20px] items-start relative">
          <div className="relative w-full h-[17px] bg-transparent">
            <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
              <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
                Description
              </span>
            </p>
          </div>
          <div className="flex gap-0 items-start self-stretch relative w-full bg-transparent">
            <div className="rounded-md p-4 flex gap-5 items-start flex-1 relative w-full bg-[#5a00cd]">
              <div className="flex gap-0 items-start relative bg-transparent">
                <div
                  className="rounded-full border-[5px] border-[#ebdff9] flex gap-0 justify-center items-center relative w-[38px] h-[38px] bg-[#d6bff3]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.92 4.96248C16.0053 4.87544 16.1071 4.80629 16.2195 4.75908C16.3318 4.71188 16.4525 4.68756 16.5744 4.68756C16.6962 4.68756 16.8169 4.71188 16.9293 4.75908C17.0416 4.80629 17.1434 4.87544 17.2287 4.96248C17.5862 5.32373 17.5912 5.90748 17.2412 6.27498L9.85 15.0125C9.76608 15.1046 9.66424 15.1787 9.55072 15.2301C9.4372 15.2816 9.31437 15.3093 9.18976 15.3117C9.06514 15.314 8.94136 15.2909 8.82599 15.2437C8.71061 15.1966 8.60607 15.1264 8.51875 15.0375L4.02125 10.48C3.84779 10.3031 3.75063 10.0652 3.75063 9.81748C3.75063 9.56973 3.84779 9.33187 4.02125 9.15498C4.10656 9.06794 4.20837 8.99879 4.32073 8.95158C4.4331 8.90438 4.55375 8.88006 4.67562 8.88006C4.7975 8.88006 4.91815 8.90438 5.03051 8.95158C5.14288 8.99879 5.24469 9.06794 5.33 9.15498L9.145 13.0212L15.895 4.98998C15.9028 4.98032 15.9111 4.97113 15.92 4.96248Z"
                      fill="#5A00CD" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-[5px] items-start flex-1 relative w-full">
                <div
                  className="pl-0 pr-[35px] flex gap-2.5 items-start self-stretch relative w-full">
                  <p className="text-lg leading-[22px] tracking-[0.005em] text-white">
                    <span className="text-white text-lg tracking-[0.005em] font-bold">
                      Upload successful</span
                    >
                  </p>
                </div>
                <p className="text-base leading-6 tracking-[0.005em] text-[#d6bff3]">
                  <span
                    className="text-[#d6bff3] text-base tracking-[0.005em] font-medium">
                    ProductHQ.zip</span
                  ><span
                    className="text-[#d6bff3] text-base tracking-[0.005em] font-normal">
                    was uploaded successfully.</span
                  >
                </p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.854 2.14598C13.9006 2.19242 13.9375 2.2476 13.9627 2.30834C13.9879 2.36909 14.0009 2.43421 14.0009 2.49998C14.0009 2.56575 13.9879 2.63087 13.9627 2.69161C13.9375 2.75236 13.9006 2.80753 13.854 2.85398L2.85399 13.854C2.7601 13.9479 2.63277 14.0006 2.49999 14.0006C2.36721 14.0006 2.23988 13.9479 2.14599 13.854C2.0521 13.7601 1.99936 13.6328 1.99936 13.5C1.99936 13.3672 2.0521 13.2399 2.14599 13.146L13.146 2.14598C13.1924 2.09941 13.2476 2.06247 13.3084 2.03727C13.3691 2.01206 13.4342 1.99908 13.5 1.99908C13.5658 1.99908 13.6309 2.01206 13.6916 2.03727C13.7524 2.06247 13.8075 2.09941 13.854 2.14598Z"
                  fill="#4D4566" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.14601 2.14598C2.09945 2.19242 2.0625 2.2476 2.0373 2.30834C2.01209 2.36909 1.99911 2.43421 1.99911 2.49998C1.99911 2.56575 2.01209 2.63087 2.0373 2.69161C2.0625 2.75236 2.09945 2.80753 2.14601 2.85398L13.146 13.854C13.2399 13.9479 13.3672 14.0006 13.5 14.0006C13.6328 14.0006 13.7601 13.9479 13.854 13.854C13.9479 13.7601 14.0006 13.6328 14.0006 13.5C14.0006 13.3672 13.9479 13.2399 13.854 13.146L2.85401 2.14598C2.80756 2.09941 2.75239 2.06247 2.69164 2.03727C2.6309 2.01206 2.56578 1.99908 2.50001 1.99908C2.43424 1.99908 2.36912 2.01206 2.30838 2.03727C2.24763 2.06247 2.19245 2.09941 2.14601 2.14598Z"
                  fill="#4D4566" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] items-start relative">
          <div className="relative w-full h-[17px] bg-transparent">
            <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
              <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
                Actions
              </span>
            </p>
          </div>
          <div className="flex gap-0 items-start self-stretch relative w-full bg-transparent">
            <div className="rounded-md border border-gray-200 px-6 py-4 flex gap-5 items-start flex-1 relative w-full bg-white">
              <div className="flex gap-0 items-start relative bg-transparent">
                <div
                  className="rounded-full border-[5px] border-[#ebdff9] flex gap-0 justify-center items-center relative w-[38px] h-[38px] bg-[#d6bff3]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.4175 8.75003H19.3325C19.3919 8.75005 19.45 8.76699 19.5001 8.79887C19.5502 8.83074 19.5902 8.87623 19.6154 8.93C19.6406 8.98378 19.6499 9.04361 19.6423 9.1025C19.6347 9.1614 19.6105 9.2169 19.5725 9.26253L17.115 12.2125C17.0857 12.2477 17.049 12.276 17.0075 12.2954C16.966 12.3148 16.9208 12.3249 16.875 12.3249C16.8292 12.3249 16.784 12.3148 16.7425 12.2954C16.701 12.276 16.6643 12.2477 16.635 12.2125L14.1775 9.26253C14.1395 9.2169 14.1153 9.1614 14.1077 9.1025C14.1001 9.04361 14.1094 8.98378 14.1346 8.93C14.1598 8.87623 14.1998 8.83074 14.2499 8.79887C14.3 8.76699 14.3581 8.75005 14.4175 8.75003V8.75003ZM0.667486 11.25H5.58249C5.64187 11.25 5.70001 11.2331 5.75011 11.2012C5.80021 11.1693 5.84019 11.1238 5.86537 11.0701C5.89056 11.0163 5.8999 10.9564 5.8923 10.8976C5.88471 10.8387 5.86049 10.7832 5.82249 10.7375L3.36499 7.78753C3.33566 7.75236 3.29896 7.72407 3.25749 7.70465C3.21601 7.68524 3.17078 7.67517 3.12499 7.67517C3.07919 7.67517 3.03396 7.68524 2.99249 7.70465C2.95101 7.72407 2.91431 7.75236 2.88499 7.78753L0.427486 10.7375C0.389483 10.7832 0.365266 10.8387 0.35767 10.8976C0.350074 10.9564 0.359415 11.0163 0.384597 11.0701C0.40978 11.1238 0.449762 11.1693 0.499862 11.2012C0.549962 11.2331 0.608106 11.25 0.667486 11.25V11.25Z"
                      fill="#5A00CD" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 3.74999C8.06001 3.74999 6.32501 4.63374 5.17876 6.02249C5.12758 6.08883 5.06357 6.1442 4.99056 6.18531C4.91755 6.22642 4.83701 6.25243 4.75375 6.26179C4.67048 6.27115 4.58618 6.26368 4.50586 6.2398C4.42554 6.21593 4.35084 6.17616 4.28621 6.12284C4.22157 6.06952 4.16831 6.00374 4.1296 5.92943C4.0909 5.85511 4.06753 5.77377 4.06088 5.69025C4.05424 5.60672 4.06446 5.52271 4.09094 5.44321C4.11742 5.36371 4.15961 5.29035 4.21501 5.22749C5.13025 4.11939 6.3445 3.2975 7.71334 2.85956C9.08218 2.42161 10.548 2.38605 11.9365 2.7571C13.3249 3.12815 14.5776 3.89019 15.5455 4.95259C16.5134 6.015 17.1558 7.33305 17.3963 8.74999H16.125C15.8364 7.3385 15.0692 6.06998 13.9532 5.15892C12.8371 4.24786 11.4407 3.75016 10 3.74999V3.74999ZM3.87501 11.25C4.11165 12.4058 4.67045 13.471 5.48686 14.3227C6.30326 15.1743 7.34396 15.7776 8.48871 16.0628C9.63347 16.3481 10.8356 16.3036 11.9561 15.9346C13.0767 15.5656 14.07 14.8871 14.8213 13.9775C14.8724 13.9111 14.9364 13.8558 15.0095 13.8147C15.0825 13.7735 15.163 13.7475 15.2463 13.7382C15.3295 13.7288 15.4138 13.7363 15.4942 13.7602C15.5745 13.784 15.6492 13.8238 15.7138 13.8771C15.7785 13.9305 15.8317 13.9962 15.8704 14.0705C15.9091 14.1449 15.9325 14.2262 15.9391 14.3097C15.9458 14.3932 15.9356 14.4773 15.9091 14.5568C15.8826 14.6363 15.8404 14.7096 15.785 14.7725C14.8698 15.8806 13.6555 16.7025 12.2867 17.1404C10.9178 17.5784 9.45201 17.6139 8.06354 17.2429C6.67507 16.8718 5.42239 16.1098 4.4545 15.0474C3.4866 13.985 2.84422 12.6669 2.60376 11.25H3.87501Z"
                      fill="#5A00CD" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-[5px] items-start flex-1 relative w-full">
                <div
                  className="pl-0 pr-[35px] flex gap-2.5 items-start self-stretch relative w-full">
                  <p className="text-lg leading-[22px] tracking-[0.005em] text-[#110733]">
                    <span className="text-[#110733] text-lg tracking-[0.005em] font-bold">
                      Update available
                    </span>
                  </p>
                </div>
                <p className="text-base leading-6 tracking-[0.005em] text-[#4d4566]">
                  <span
                    className="text-[#4d4566] text-base tracking-[0.005em] font-normal">
                    A new software version is available for download.</span
                  >
                </p>
                <div className="pt-2.5 pb-0 flex gap-[5px] items-start self-stretch relative w-full">
                  <button className="flex gap-0 items-start relative bg-transparent">
                    <div className="overflow-hidden rounded-md px-3 py-2 flex gap-2 justify-center items-center relative bg-transparent">
                      <small className="text-sm leading-[17px] tracking-[0.005em] text-center text-[#5a00cd]">
                        <span className="text-[#5a00cd] text-sm tracking-[0.005em] font-medium">
                          Button-sm
                        </span>
                      </small>
                    </div>
                  </button>
                  <button className="flex gap-0 items-start relative bg-transparent">
                    <div className="overflow-hidden rounded-md px-3 py-2 flex gap-2 justify-center items-center relative bg-transparent">
                      <small className="text-sm leading-[17px] tracking-[0.005em] text-center text-[#888399]">
                        <span className="text-[#888399] text-sm tracking-[0.005em] font-medium">
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
        <div className="flex flex-col gap-[20px] items-start relative">
          <div className="relative w-full h-[17px] bg-transparent">
            <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
              <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
                Actions
              </span>
            </p>
          </div>
          <div className="flex gap-0 items-start self-stretch relative w-full bg-transparent">
            <div className="rounded-md p-4 flex gap-5 items-start flex-1 relative w-full bg-red-50">
              <div className="flex gap-0 items-start relative bg-transparent">
                <div
                  className="rounded-full border-[5px] border-red-50 flex gap-0 justify-center items-center relative w-[38px] h-[38px] bg-red-100">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.92 4.96248C16.0053 4.87544 16.1071 4.80629 16.2195 4.75908C16.3318 4.71188 16.4525 4.68756 16.5743 4.68756C16.6962 4.68756 16.8169 4.71188 16.9292 4.75908C17.0416 4.80629 17.1434 4.87544 17.2287 4.96248C17.5862 5.32373 17.5912 5.90748 17.2412 6.27498L9.84997 15.0125C9.76606 15.1046 9.66422 15.1787 9.5507 15.2301C9.43717 15.2816 9.31435 15.3093 9.18973 15.3117C9.06512 15.314 8.94134 15.2909 8.82596 15.2437C8.71059 15.1966 8.60604 15.1264 8.51872 15.0375L4.02123 10.48C3.84777 10.3031 3.75061 10.0652 3.75061 9.81748C3.75061 9.56973 3.84777 9.33187 4.02123 9.15498C4.10653 9.06794 4.20835 8.99879 4.32071 8.95158C4.43307 8.90438 4.55372 8.88006 4.6756 8.88006C4.79748 8.88006 4.91813 8.90438 5.03049 8.95158C5.14285 8.99879 5.24467 9.06794 5.32998 9.15498L9.14497 13.0212L15.895 4.98998C15.9027 4.98032 15.9111 4.97113 15.92 4.96248Z"
                      fill="#EF4444" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-[5px] items-start flex-1 relative w-full">
                <div
                  className="pl-0 pr-[35px] flex gap-2.5 items-start self-stretch relative w-full">
                  <p className="text-lg leading-[22px] tracking-[0.005em] text-red-800">
                    <span className="text-red-800 text-lg tracking-[0.005em] font-bold">
                      User deleted
                    </span>
                  </p>
                </div>
                <p className="text-base leading-6 tracking-[0.005em] text-red-700">
                  <span
                    className="text-red-700 text-base tracking-[0.005em] font-normal">
                    User </span>
                  <span
                    className="text-red-700 text-base tracking-[0.005em] font-medium">
                    John Doe</span>
                  <span
                    className="text-red-700 text-base tracking-[0.005em] font-normal">
                    has been successfully deleted.</span>
                </p>
                <div className="pt-2.5 pb-0 flex gap-[5px] items-start self-stretch relative w-full">
                  <button className="flex gap-0 items-start relative bg-transparent">
                    <div className="overflow-hidden rounded-md px-3 py-2 flex gap-2 justify-center items-center relative bg-red-100">
                      <small className="text-sm leading-[17px] tracking-[0.005em] text-center text-red-500">
                        <span className="text-red-500 text-sm tracking-[0.005em] font-medium">
                          Button-sm
                        </span>
                      </small>
                    </div>
                  </button>
                  <button className="flex gap-0 items-start relative bg-transparent">
                    <div className="overflow-hidden rounded-md px-3 py-2 flex gap-2 justify-center items-center relative bg-transparent">
                      <small className="text-sm leading-[17px] tracking-[0.005em] text-center text-red-500">
                        <span className="text-red-500 text-sm tracking-[0.005em] font-medium">
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
    </div>
  );
};

export default AlertExamples;