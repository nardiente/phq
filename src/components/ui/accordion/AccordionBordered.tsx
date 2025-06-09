const AccordionBordered = () => {
  return (
    <div className="flex flex-col gap-[15px] items-start relative">
      {/* Bordered Heading */}
      <div className="relative w-full h-[17px] bg-transparent">
        <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
          <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
            Bordered
          </span>
        </p>
      </div>

      {/* Accordion Container */}
      <div className="rounded-xl border border-gray-200 flex flex-col gap-0 items-start relative w-[475px] bg-white">
        {/* First Accordion Item */}
        <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[50px]">
          <div className="px-5 py-[15px] flex gap-5 items-center self-stretch relative w-full">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1738_77508)">
                <path
                  d="M8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
                  fill="#110733"
                />
                <path
                  d="M8 4C8.13261 4 8.25979 4.05268 8.35355 4.14645C8.44732 4.24021 8.5 4.36739 8.5 4.5V7.5H11.5C11.6326 7.5 11.7598 7.55268 11.8536 7.64645C11.9473 7.74021 12 7.86739 12 8C12 8.13261 11.9473 8.25979 11.8536 8.35355C11.7598 8.44732 11.6326 8.5 11.5 8.5H8.5V11.5C8.5 11.6326 8.44732 11.7598 8.35355 11.8536C8.25979 11.9473 8.13261 12 8 12C7.86739 12 7.74021 11.9473 7.64645 11.8536C7.55268 11.7598 7.5 11.6326 7.5 11.5V8.5H4.5C4.36739 8.5 4.24021 8.44732 4.14645 8.35355C4.05268 8.25979 4 8.13261 4 8C4 7.86739 4.05268 7.74021 4.14645 7.64645C4.24021 7.55268 4.36739 7.5 4.5 7.5H7.5V4.5C7.5 4.36739 7.55268 4.24021 7.64645 4.14645C7.74021 4.05268 7.86739 4 8 4Z"
                  fill="#110733"
                />
              </g>
              <defs>
                <clipPath id="clip0_1738_77508">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className="flex gap-3 items-center flex-1 relative w-full">
              <p className="text-base leading-6 tracking-[0.005em] text-[#110733] font-bold">
                Accordion Item
              </p>
            </div>
          </div>
        </div>

        {/* Second Accordion Item */}
        <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[50px]">
          <div className="w-full h-px bg-gray-200"></div>
          <div className="px-5 py-[15px] flex gap-5 items-center self-stretch relative w-full">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1738_77591)">
                <path
                  d="M8 15.5C6.14348 15.5 4.36301 14.7625 3.05025 13.4497C1.7375 12.137 1 10.3565 1 8.5C1 6.64348 1.7375 4.86301 3.05025 3.55025C4.36301 2.2375 6.14348 1.5 8 1.5C9.85652 1.5 11.637 2.2375 12.9497 3.55025C14.2625 4.86301 15 6.64348 15 8.5C15 10.3565 14.2625 12.137 12.9497 13.4497C11.637 14.7625 9.85652 15.5 8 15.5ZM8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.37827 15.1571 4.34344 13.6569 2.84315C12.1566 1.34285 10.1217 0.5 8 0.5C5.87827 0.5 3.84344 1.34285 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 10.6217 0.842855 12.6566 2.34315 14.1569C3.84344 15.6571 5.87827 16.5 8 16.5Z"
                  fill="#44009A"
                />
                <path
                  d="M4 8.5C4 8.36739 4.05268 8.24021 4.14645 8.14645C4.24021 8.05268 4.36739 8 4.5 8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H4.5C4.36739 9 4.24021 8.94732 4.14645 8.85355C4.05268 8.75979 4 8.63261 4 8.5Z"
                  fill="#44009A"
                />
              </g>
              <defs>
                <clipPath id="clip0_1738_77591">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="flex gap-3 items-center flex-1 relative w-full">
              <p className="text-base leading-6 tracking-[0.005em] text-[#44009a] font-bold">
                What makes ProductHQ different??
              </p>
            </div>
          </div>
        </div>

        {/* Accordion Content */}
        <div className="pl-14 pr-5 pt-0 pb-[15px] flex flex-col gap-2.5 items-start self-stretch relative w-full">
          <p className="text-base leading-6 tracking-[0.005em] text-[#4d4566] font-medium">
            Lorem ipsum dolor sit amet consectetur. Feugiat euismod ante proin
            nunc leo sed. Ultrices nisi eget lectus vulputate.
          </p>
        </div>

        {/* Third Accordion Item */}
        <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[39px]">
          <div className="w-full h-px bg-gray-200"></div>
          <div className="px-5 py-[15px] flex gap-5 items-center self-stretch relative w-full">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1738_77498)">
                <path
                  d="M8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
                  fill="#110733"
                />
                <path
                  d="M8 4C8.13261 4 8.25979 4.05268 8.35355 4.14645C8.44732 4.24021 8.5 4.36739 8.5 4.5V7.5H11.5C11.6326 7.5 11.7598 7.55268 11.8536 7.64645C11.9473 7.74021 12 7.86739 12 8C12 8.13261 11.9473 8.25979 11.8536 8.35355C11.7598 8.44732 11.6326 8.5 11.5 8.5H8.5V11.5C8.5 11.6326 8.44732 11.7598 8.35355 11.8536C8.25979 11.9473 8.13261 12 8 12C7.86739 12 7.74021 11.9473 7.64645 11.8536C7.55268 11.7598 7.5 11.6326 7.5 11.5V8.5H4.5C4.36739 8.5 4.24021 8.44732 4.14645 8.35355C4.05268 8.25979 4 8.13261 4 8C4 7.86739 4.05268 7.74021 4.14645 7.64645C4.24021 7.55268 4.36739 7.5 4.5 7.5H7.5V4.5C7.5 4.36739 7.55268 4.24021 7.64645 4.14645C7.74021 4.05268 7.86739 4 8 4Z"
                  fill="#110733"
                />
              </g>
              <defs>
                <clipPath id="clip0_1738_77498">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className="flex gap-3 items-center flex-1 relative w-full">
              <p className="text-base leading-6 tracking-[0.005em] text-[#110733] font-bold">
                Accordion Item
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionBordered;
