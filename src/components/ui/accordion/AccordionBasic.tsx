// src/components/ui/AccordionBasic.tsx
import React from 'react';

const AccordionBasic = () => {
 return (
        <div className="flex flex-col gap-[15px] items-start">
            <div className="relative w-full h-[17px] bg-transparent">
                <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
                    <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">
                        Basic usage
                    </span>
                </p>
            </div>
            <div className="flex flex-col gap-5 items-start relative w-[475px]">
                <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[19px]">
                    <div className="flex gap-5 items-center self-stretch relative w-full">
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_1738_77604)">
                                <path
                                    d="M8 15.5C6.14348 15.5 4.36301 14.7625 3.05025 13.4497C1.7375 12.137 1 10.3565 1 8.5C1 6.64348 1.7375 4.86301 3.05025 3.55025C4.36301 2.2375 6.14348 1.5 8 1.5C9.85652 1.5 11.637 2.2375 12.9497 3.55025C14.2625 4.86301 15 6.64348 15 8.5C15 10.3565 14.2625 12.137 12.9497 13.4497C11.637 14.7625 9.85652 15.5 8 15.5ZM8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.37827 15.1571 4.34344 13.6569 2.84315C12.1566 1.34285 10.1217 0.5 8 0.5C5.87827 0.5 3.84344 1.34285 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 10.6217 0.842855 12.6566 2.34315 14.1569C3.84344 15.6571 5.87827 16.5 8 16.5Z"
                                    fill="#110733"
                                />
                                <path
                                    d="M8 4.5C8.13261 4.5 8.25979 4.55268 8.35355 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H8.5V12C8.5 12.1326 8.44732 12.2598 8.35355 12.3536C8.25979 12.4473 8.13261 12.5 8 12.5C7.86739 12.5 7.74021 12.4473 7.64645 12.3536C7.55268 12.2598 7.5 12.1326 7.5 12V9H4.5C4.36739 9 4.24021 8.94732 4.14645 8.85355C4.05268 8.75979 4 8.63261 4 8.5C4 8.36739 4.05268 8.24021 4.14645 8.14645C4.24021 8.05268 4.36739 8 4.5 8H7.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74021 4.55268 7.86739 4.5 8 4.5Z"
                                    fill="#110733"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1738_77604">
                                    <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="flex gap-3 items-center flex-1">
                            <p className="text-base leading-6 tracking-[0.005em] text-[#110733] font-bold">
                                Accordion Item
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[19px]">
                    <div className="flex gap-5 items-center self-stretch relative w-full">
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_1738_77581)">
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
                                <clipPath id="clip0_1738_77581">
                                    <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="flex gap-3 items-center flex-1">
                            <p className="text-base leading-6 tracking-[0.005em] text-[#44009a] font-bold">
                                What makes ProductHQ different??
                            </p>
                        </div>
                    </div>
                </div>
                <p className="text-base leading-6 tracking-[0.005em] text-[#4d4566] font-medium">
                    Lorem ipsum dolor sit amet consectetur. Feugiat euismod ante proin nunc leo sed. Ultrices nisi eget lectus vulputate.
                </p>
                <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[19px]">
                    <div className="flex gap-5 items-center self-stretch relative w-full">
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_1738_77569)">
                                <path
                                    d="M8 15.5C6.14348 15.5 4.36301 14.7625 3.05025 13.4497C1.7375 12.137 1 10.3565 1 8.5C1 6.64348 1.7375 4.86301 3.05025 3.55025C4.36301 2.2375 6.14348 1.5 8 1.5C9.85652 1.5 11.637 2.2375 12.9497 3.55025C14.2625 4.86301 15 6.64348 15 8.5C15 10.3565 14.2625 12.137 12.9497 13.4497C11.637 14.7625 9.85652 15.5 8 15.5ZM8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.37827 15.1571 4.34344 13.6569 2.84315C12.1566 1.34285 10.1217 0.5 8 0.5C5.87827 0.5 3.84344 1.34285 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 10.6217 0.842855 12.6566 2.34315 14.1569C3.84344 15.6571 5.87827 16.5 8 16.5Z"
                                    fill="#110733"
                                />
                                <path
                                    d="M8 4.5C8.13261 4.5 8.25979 4.55268 8.35355 4.64645C8.44732 4.74021 8.5 4.86739 8.5 5V8H11.5C11.6326 8 11.7598 8.05268 11.8536 8.14645C11.9473 8.24021 12 8.36739 12 8.5C12 8.63261 11.9473 8.75979 11.8536 8.85355C11.7598 8.94732 11.6326 9 11.5 9H8.5V12C8.5 12.1326 8.44732 12.2598 8.35355 12.3536C8.25979 12.4473 8.13261 12.5 8 12.5C7.86739 12.5 7.74021 12.4473 7.64645 12.3536C7.55268 12.2598 7.5 12.1326 7.5 12V9H4.5C4.36739 9 4.24021 8.94732 4.14645 8.85355C4.05268 8.75979 4 8.63261 4 8.5C4 8.36739 4.05268 8.24021 4.14645 8.14645C4.24021 8.05268 4.36739 8 4.5 8H7.5V5C7.5 4.86739 7.55268 4.74021 7.64645 4.64645C7.74021 4.55268 7.86739 4.5 8 4.5Z"
                                    fill="#110733"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1738_77569">
                                    <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="flex gap-3 items-center flex-1">
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

export default AccordionBasic;