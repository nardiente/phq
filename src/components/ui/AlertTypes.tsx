import React from 'react';

export const AlertTypes = () => {
  return (
    <div className="flex flex-col gap-7 items-start w-full">
      <div className="flex flex-col gap-2.5 items-start w-full">
        <p className="text-lg leading-[22px] tracking-[0.005em] text-black">
          <span className="text-black text-lg tracking-[0.005em] font-medium">
            Types
          </span>
        </p>
        <div className="w-full h-px bg-gray-200"></div>
      </div>
      <div className="flex gap-9 items-start">
        <div className="flex flex-col gap-[15px] items-start">
          <div className="relative w-full h-[17px]">
            <p className="text-sm leading-[18px] tracking-[0.005em] text-slate-600">
              <span className="text-slate-600 text-sm tracking-[0.005em] font-medium">
                Solid
              </span>
            </p>
          </div>
          <div className="flex items-start w-full">
            <div className="rounded-md p-4 flex gap-5 items-start flex-1 w-full bg-primary">
              <div className="flex flex-col gap-[5px] items-start flex-1 w-full">
                <div className="pr-[35px] flex gap-2.5 items-start w-full">
                  <p className="text-lg leading-[22px] tracking-[0.005em] text-white">
                    <span className="text-white text-lg tracking-[0.005em] font-bold">
                      Solid Purple Alert
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[15px] items-start">
          <div className="relative w-full h-[17px]">
            <p className="text-sm leading-[18px] tracking-[0.005em] text-slate-600">
              <span className="text-slate-600 text-sm tracking-[0.005em] font-medium">
                Soft
              </span>
            </p>
          </div>
          <div className="flex items-start w-full">
            <div className="rounded-md p-4 flex gap-5 items-start flex-1 w-full bg-primary-light">
              <div className="flex flex-col gap-[5px] items-start flex-1 w-full">
                <div className="pr-[35px] flex gap-2.5 items-start w-full">
                  <p className="text-lg leading-[22px] tracking-[0.005em] text-neutral-text">
                    <span className="text-neutral-text text-lg tracking-[0.005em] font-bold">
                      Soft Purple Alert
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[15px] items-start">
          <div className="relative w-full h-[17px]">
            <p className="text-sm leading-[18px] tracking-[0.005em] text-slate-600">
              <span className="text-slate-600 text-sm tracking-[0.005em] font-medium">
                White
              </span>
            </p>
          </div>
          <div className="flex items-start w-full">
            <div className="rounded-md border border-gray-200 px-6 py-4 flex gap-5 items-start flex-1 w-full bg-white">
              <div className="flex flex-col gap-[5px] items-start flex-1 w-full">
                <div className="pr-[35px] flex gap-2.5 items-start w-full">
                  <p className="text-lg leading-[22px] tracking-[0.005em] text-neutral-text">
                    <span className="text-neutral-text text-lg tracking-[0.005em] font-bold">
                      White Alert
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 