import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#111]">
      <div id="footer" className={"section"}>
        <div className="flex flex-col justify-between py-4 text-sm sm:flex-row">
          <div className="flex flex-col items-center justify-center h-full mb-8 sm:mb-0">
            <div className="text-4xl text-white lg:text-5xl">
              Start forecasting today
            </div>
            <div className="flex flex-col w-full mx-0 my-6 space-y-2 xl:flex-row xl:space-y-0 xl:space-x-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/auth";
                }}
                className="w-full theme-button xl:w-7/12"
              >
                Launch app
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/walkthrough";
                }}
                className="w-full text-white theme-button-white-outline xl:w-5/12"
              >
                Read walkthrough
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 space-x-8 text-white lg:space-x-16">
            <div className="flex flex-col space-y-1">
              <div className="mb-4 text-sm uppercase">Contact</div>
              <div className="flex flex-col space-y-1">
                <span>The Lab</span>
                <span>2420 17th St,</span>
                <span>Denver, CO 80202</span>
                <span className="pt-6">hello@quantile.app</span>
                <span> +1 ‪(303) 578-0724‬</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="mb-4 text-sm uppercase">Pages</div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/";
                }}
                className="self-start text-left slide-left-right"
              >
                Home
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/walkthrough";
                }}
                className="self-start text-left slide-left-right"
              >
                Walkthrough
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/privacy";
                }}
                className="self-start text-left slide-left-right"
              >
                Privacy
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/terms";
                }}
                className="self-start text-left slide-left-right"
              >
                Terms
              </button>
            </div>
          </div>
        </div>
        <div className="text-white">© 2022, Quantile LLC</div>
      </div>
    </div>
  );
}
