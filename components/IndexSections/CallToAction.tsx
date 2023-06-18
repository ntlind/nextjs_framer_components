import React from "react";
import CustomerIcons from "./CustomerIcons";
import { useRouter } from "next/router";

export default function Clients() {
  const router = useRouter();

  const Quote = ({ avatarAlt, avatarUrl, company, linkUrl, name, quote }) => (
    <div className="relative text-left py-7">
      <div className="relative z-20 items-center px-4 my-auto xl:px-8">
        <div className="text-responsive"> {quote} </div>
        <cite className="flex items-center mt-12 text-gray-800">
          <img
            alt={avatarAlt}
            className="w-16 mr-4 rounded-full shadow-inner"
            src={avatarUrl}
          />
          <div className="flex flex-col items-start text-responsive">
            <span className="mb-1 not-italic font-bold">{name}</span>
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="not-italic cursor-pointer slide-left-right-black"
            >
              {company}
            </a>
          </div>
        </cite>
      </div>
      <div
        className="absolute top-0 z-0 flex mr-2 font-serif leading-none text-gray-300 text-7xl"
        aria-hidden="true"
      >
        &ldquo;{" "}
      </div>
    </div>
  );

  return (
    <div className="flex section" id="clients">
      <div className="space-y-12">
        <div className="grid items-center grid-cols-1 md:grid-cols-12 md:gap-6 ">
          <div className="col-span-6 text-center md:text-left">
            <div className="text-4xl font-bold tracking-tight lg:text-5xl">
              See how easy <br /> forecasting can be
            </div>
            <div className="flex flex-col w-full mx-0 my-6 space-y-2 xl:flex-row xl:space-y-0 xl:space-x-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/auth";
                }}
                className="relative z-50 w-full theme-button xl:w-7/12 text-responsive"
              >
                Launch app
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/walkthrough";
                }}
                className="relative z-50 w-full theme-button-outline xl:w-5/12 text-responsive"
              >
                Read walkthrough
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full col-span-6 md:mt-0">
            <div className="items-center justify-center">
              <Quote
                avatarAlt={`Avatar`}
                avatarUrl={"/images/faces/brs.jfif"}
                company={"Director, BI & Analytics at Pantaya"}
                linkUrl={"https://www.linkedin.com/in/britt-lauren-smith/"}
                name={"Britt Smith"}
                quote={
                  "It's hard to overstate how important Quantile was in supporting our growth at Pantaya. Their self-service app completely changed the way our executives and product team think about our consumption forecasts."
                }
              />{" "}
            </div>
          </div>
        </div>
        <CustomerIcons />
      </div>
    </div>
  );
}
