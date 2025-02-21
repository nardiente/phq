import React from 'react';

const AccordionNested = () => {
    return (
        <div className="flex flex-col gap-[15px] items-start relative">
            {/* Nested Heading */}
            <div className="relative w-full h-[17px] bg-transparent">
                <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
                    <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
                        Nested
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
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8 2C8.13261 2 8.25979 2.05268 8.35355 2.14645C8.44732 2.24021 8.5 2.36739 8.5 2.5V7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H8.5V13.5C8.5 13.6326 8.44732 13.7598 8.35355 13.8536C8.25979 13.9473 8.13261 14 8 14C7.86739 14 7.74021 13.9473 7.64645 13.8536C7.55268 13.7598 7.5 13.6326 7.5 13.5V8.5H2.5C2.36739 8.5 2.24021 8.44732 2.14645 8.35355C2.05268 8.25979 2 8.13261 2 8C2 7.86739 2.05268 7.74021 2.14645 7.64645C2.24021 7.55268 2.36739 7.5 2.5 7.5H7.5V2.5C7.5 2.36739 7.55268 2.24021 7.64645 2.14645C7.74021 2.05268 7.86739 2 8 2Z"
                                fill="#110733"
                            />
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
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2 8.5C2 8.36739 2.05268 8.24021 2.14645 8.14645C2.24021 8.05268 2.36739 8 2.5 8H13.5C13.6326 8 13.7598 8.05268 13.8536 8.14645C13.9473 8.24021 14 8.36739 14 8.5C14 8.63261 13.9473 8.75979 13.8536 8.85355C13.7598 8.94732 13.6326 9 13.5 9H2.5C2.36739 9 2.24021 8.94732 2.14645 8.85355C2.05268 8.75979 2 8.63261 2 8.5Z"
                                fill="#44009A"
                            />
                        </svg>
                        <div className="flex gap-3 items-center flex-1 relative w-full">
                            <p className="text-base leading-6 tracking-[0.005em] text-[#44009a] font-bold">
                                What makes ProductHQ different??
                            </p>
                        </div>
                    </div>
                </div>

                {/* Nested Content */}
                <div className="pl-14 pr-5 pt-0 pb-[15px] flex flex-col gap-[15px] items-start self-stretch relative w-full">
                    <p className="text-base leading-6 tracking-[0.005em] text-[#4d4566] font-medium">
                        Lorem ipsum dolor sit amet consectetur. Feugiat euismod ante proin nunc leo sed. Ultrices nisi eget lectus vulputate.
                    </p>

                    {/* Nested Accordion Items */}
                    <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[29px]">
                        <div className="py-[5px] flex gap-[15px] items-center self-stretch relative w-full">
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
                                    d="M8 2.5C8.13261 2.5 8.25979 2.55268 8.35355 2.64645C8.44732 2.74021 8.5 2.86739 8.5 3V8H13.5C13.6326 8 13.7598 8.05268 13.8536 8.14645C13.9473 8.24021 14 8.36739 14 8.5C14 8.63261 13.9473 8.75979 13.8536 8.85355C13.7598 8.94732 13.6326 9 13.5 9H8.5V14C8.5 14.1326 8.44732 14.2598 8.35355 14.3536C8.25979 14.4473 8.13261 14.5 8 14.5C7.86739 14.5 7.74021 14.4473 7.64645 14.3536C7.55268 14.2598 7.5 14.1326 7.5 14V9H2.5C2.36739 9 2.24021 8.94732 2.14645 8.85355C2.05268 8.75979 2 8.63261 2 8.5C2 8.36739 2.05268 8.24021 2.14645 8.14645C2.24021 8.05268 2.36739 8 2.5 8H7.5V3C7.5 2.86739 7.55268 2.74021 7.64645 2.64645C7.74021 2.55268 7.86739 2.5 8 2.5Z"
                                    fill="#110733"
                                />
                            </svg>
                            <div className="flex gap-3 items-center flex-1 relative w-full">
                                <p className="text-base leading-6 tracking-[0.005em] text-[#110733] font-bold">
                                    Accordion Item
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[29px]">
                        <div className="py-[5px] flex gap-[15px] items-center self-stretch relative w-full">
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
                                    d="M8 2.5C8.13261 2.5 8.25979 2.55268 8.35355 2.64645C8.44732 2.74021 8.5 2.86739 8.5 3V8H13.5C13.6326 8 13.7598 8.05268 13.8536 8.14645C13.9473 8.24021 14 8.36739 14 8.5C14 8.63261 13.9473 8.75979 13.8536 8.85355C13.7598 8.94732 13.6326 9 13.5 9H8.5V14C8.5 14.1326 8.44732 14.2598 8.35355 14.3536C8.25979 14.4473 8.13261 14.5 8 14.5C7.86739 14.5 7.74021 14.4473 7.64645 14.3536C7.55268 14.2598 7.5 14.1326 7.5 14V9H2.5C2.36739 9 2.24021 8.94732 2.14645 8.85355C2.05268 8.75979 2 8.63261 2 8.5C2 8.36739 2.05268 8.24021 2.14645 8.14645C2.24021 8.05268 2.36739 8 2.5 8H7.5V3C7.5 2.86739 7.55268 2.74021 7.64645 2.64645C7.74021 2.55268 7.86739 2.5 8 2.5Z"
                                    fill="#110733"
                                />
                            </svg>
                            <div className="flex gap-3 items-center flex-1 relative w-full">
                                <p className="text-base leading-6 tracking-[0.005em] text-[#110733] font-bold">
                                    Accordion Item
                                </p>
                            </div>
                        </div>
                    </div>
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
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8 2C8.13261 2 8.25979 2.05268 8.35355 2.14645C8.44732 2.24021 8.5 2.36739 8.5 2.5V7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H8.5V13.5C8.5 13.6326 8.44732 13.7598 8.35355 13.8536C8.25979 13.9473 8.13261 14 8 14C7.86739 14 7.74021 13.9473 7.64645 13.8536C7.55268 13.7598 7.5 13.6326 7.5 13.5V8.5H2.5C2.36739 8.5 2.24021 8.44732 2.14645 8.35355C2.05268 8.25979 2 8.13261 2 8C2 7.86739 2.05268 7.74021 2.14645 7.64645C2.24021 7.55268 2.36739 7.5 2.5 7.5H7.5V2.5C7.5 2.36739 7.55268 2.24021 7.64645 2.14645C7.74021 2.05268 7.86739 2 8 2Z"
                                fill="#110733"
                            />
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

export default AccordionNested;