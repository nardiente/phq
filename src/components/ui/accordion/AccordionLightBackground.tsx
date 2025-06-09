const AccordionLightBackground = () => {
  return (
    <div className="flex flex-col gap-[15px] items-start relative">
      {/* Light Background Heading */}
      <div className="relative w-full h-[17px] bg-transparent">
        <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
          <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
            Light Background
          </span>
        </p>
      </div>

      {/* Accordion Container */}
      <div className="overflow-hidden rounded-xl border border-gray-200 flex flex-col gap-0 items-start relative w-[475px] bg-white">
        {/* First Accordion Item */}
        <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-5">
          <div className="px-5 py-[15px] flex gap-5 items-center self-stretch relative w-full">
            <div className="flex gap-3 items-center flex-1 relative w-full">
              <p className="text-base leading-6 tracking-[0.005em] text-[#110733] font-bold">
                Accordion Item
              </p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.64598 4.64599C1.69242 4.59943 1.7476 4.56249 1.80834 4.53728C1.86909 4.51207 1.93421 4.4991 1.99998 4.4991C2.06575 4.4991 2.13087 4.51207 2.19161 4.53728C2.25236 4.56249 2.30753 4.59943 2.35398 4.64599L7.99998 10.293L13.646 4.64599C13.6925 4.59951 13.7477 4.56263 13.8084 4.53747C13.8691 4.51231 13.9342 4.49936 14 4.49936C14.0657 4.49936 14.1308 4.51231 14.1916 4.53747C14.2523 4.56263 14.3075 4.59951 14.354 4.64599C14.4005 4.69248 14.4373 4.74767 14.4625 4.80841C14.4877 4.86915 14.5006 4.93425 14.5006 4.99999C14.5006 5.06574 14.4877 5.13084 14.4625 5.19158C14.4373 5.25232 14.4005 5.30751 14.354 5.35399L8.35398 11.354C8.30753 11.4006 8.25236 11.4375 8.19161 11.4627C8.13087 11.4879 8.06575 11.5009 7.99998 11.5009C7.93421 11.5009 7.86909 11.4879 7.80834 11.4627C7.7476 11.4375 7.69242 11.4006 7.64598 11.354L1.64598 5.35399C1.59942 5.30755 1.56247 5.25237 1.53727 5.19163C1.51206 5.13088 1.49908 5.06576 1.49908 4.99999C1.49908 4.93423 1.51206 4.8691 1.53727 4.80836C1.56247 4.74761 1.59942 4.69244 1.64598 4.64599Z"
                fill="#110733"
              />
            </svg>
          </div>
        </div>

        {/* Second Accordion Item */}
        <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[50px] bg-gray-50">
          <div className="w-full h-px bg-gray-200"></div>
          <div className="px-5 py-[15px] flex gap-5 items-center self-stretch relative w-full">
            <div className="flex gap-3 items-center flex-1 relative w-full">
              <p className="text-base leading-6 tracking-[0.005em] text-[#5a00cd] font-bold">
                What makes ProductHQ different??
              </p>
            </div>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.64602 5.14599C7.69247 5.09943 7.74764 5.06249 7.80839 5.03728C7.86913 5.01207 7.93425 4.9991 8.00002 4.9991C8.06579 4.9991 8.13091 5.01207 8.19165 5.03728C8.2524 5.06249 8.30758 5.09943 8.35402 5.14599L14.354 11.146C14.4479 11.2399 14.5007 11.3672 14.5007 11.5C14.5007 11.6328 14.4479 11.7601 14.354 11.854C14.2601 11.9479 14.1328 12.0006 14 12.0006C13.8672 12.0006 13.7399 11.9479 13.646 11.854L8.00002 6.20699L2.35402 11.854C2.26013 11.9479 2.1328 12.0006 2.00002 12.0006C1.86725 12.0006 1.73991 11.9479 1.64602 11.854C1.55213 11.7601 1.49939 11.6328 1.49939 11.5C1.49939 11.3672 1.55213 11.2399 1.64602 11.146L7.64602 5.14599Z"
                fill="#5A00CD"
              />
            </svg>
          </div>
        </div>

        {/* Accordion Content */}
        <div className="px-5 pt-0 pb-[15px] flex flex-col gap-2.5 items-start self-stretch relative w-full bg-gray-50">
          <p className="text-base leading-6 tracking-[0.005em] text-[#4d4566] font-medium">
            Lorem ipsum dolor sit amet consectetur. Feugiat euismod ante proin
            nunc leo sed. Ultrices nisi eget lectus vulputate.
          </p>
        </div>

        {/* Third Accordion Item */}
        <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[39px]">
          <div className="w-full h-px bg-gray-200"></div>
          <div className="px-5 py-[15px] flex gap-5 items-center self-stretch relative w-full">
            <div className="flex gap-3 items-center flex-1 relative w-full">
              <p className="text-base leading-6 tracking-[0.005em] text-[#110733] font-bold">
                Accordion Item
              </p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.64598 4.646C1.69242 4.59944 1.7476 4.56249 1.80834 4.53729C1.86909 4.51208 1.93421 4.49911 1.99998 4.49911C2.06575 4.49911 2.13087 4.51208 2.19161 4.53729C2.25236 4.56249 2.30753 4.59944 2.35398 4.646L7.99998 10.293L13.646 4.646C13.6925 4.59951 13.7477 4.56264 13.8084 4.53748C13.8691 4.51232 13.9342 4.49937 14 4.49937C14.0657 4.49937 14.1308 4.51232 14.1916 4.53748C14.2523 4.56264 14.3075 4.59951 14.354 4.646C14.4005 4.69249 14.4373 4.74768 14.4625 4.80842C14.4877 4.86916 14.5006 4.93426 14.5006 5C14.5006 5.06574 14.4877 5.13085 14.4625 5.19158C14.4373 5.25232 14.4005 5.30751 14.354 5.354L8.35398 11.354C8.30753 11.4006 8.25236 11.4375 8.19161 11.4627C8.13087 11.4879 8.06575 11.5009 7.99998 11.5009C7.93421 11.5009 7.86909 11.4879 7.80834 11.4627C7.7476 11.4375 7.69242 11.4006 7.64598 11.354L1.64598 5.354C1.59942 5.30756 1.56247 5.25238 1.53727 5.19163C1.51206 5.13089 1.49908 5.06577 1.49908 5C1.49908 4.93423 1.51206 4.86911 1.53727 4.80837C1.56247 4.74762 1.59942 4.69245 1.64598 4.646Z"
                fill="#110733"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionLightBackground;
