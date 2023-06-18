// @ts-nocheck

import React from "react";
import CalendlyLink from "../CalendlyLink";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

function BenefitListItem({ description }) {
  return (
    <li className="flex items-center mb-3">
      <FaPlusCircle className="w-5 h-5 mr-3" fill="#10b981" />
      {description}
    </li>
  );
}

function NegativeListItem({ description }) {
  return (
    <li className="flex items-center mb-3">
      <FaMinusCircle className="w-5 h-5 mr-3 opacity-50" fill="red" />
      <span className="text-gray-600">{description}</span>
    </li>
  );
}

function PricingCard({
  title,
  price,
  price_period = "/ month",
  benefits,
  for_statement = "For those businesses who want to.... PLACEHOLDER",
  negatives,
  border_color = " border-theme-lighter",
  children,
}) {
  return (
    <div
      className={
        "flex flex-col justify-between shadow-sm bg-white transition duration-500 w-full lg:w-6/12 min-w-64 px-8 py-8 pb-4 border-t-2 " +
        border_color
      }
    >
      <div className="">
        <p className="mb-6 text-2xl tracking-wider text-gray-500">{title}</p>
        <div className="">
          <p className="justify-center text-5xl font-bold text-gray-900 lg:text-4xl">
            {price}
            <span className="text-2xl text-gray-400 lg:text-xl">
              {" " + price_period}
            </span>
          </p>
          <p className="mt-4 text-gray-600">{for_statement}</p>
        </div>
        <ul className="w-full mt-8 text-base text-gray-900">
          {benefits.map((description, index) => (
            <BenefitListItem description={description} />
          ))}

          {negatives
            ? negatives.map((description, index) => (
                <NegativeListItem description={description} />
              ))
            : null}
        </ul>
      </div>
      <div className="flex items-center justify-center my-6">{children}</div>
    </div>
  );
}

export default function PricingComponent() {
  return (
    <div className="section bg-blue-50">
      <div id="pricing" className="container pb-4 ">
        <div className="mb-12 text-4xl font-bold tracking-tight text-center lg:text-5xl md:text-left">
          Best of all, it's (mostly) free
        </div>
        <div className="flex flex-col justify-center space-y-12 lg:flex-row lg:space-y-0 lg:space-x-12">
          <PricingCard
            title="Pro"
            for_statement="For professionals who need to forecast on large datasets"
            price="Free"
            price_period=""
            border_color="border-theme"
            benefits={[
              "23+ feature engineering functions",
              "LightGBM modeling algorithm",
              "Configurable cross-validation pipeline",
              "Full diagnostic suite",
            ]}
            negatives={["Web-hosted", "Dataset must be ≤ 50MB"]}
          >
            <button
              className="w-full theme-button text-responsive"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/auth";
              }}
            >
              Get started today
            </button>
          </PricingCard>
          <PricingCard
            title="Enterprise"
            for_statement="For businesses that want to protect their proprietary data"
            price="$1,999"
            price_period="/ month"
            border_color="border-gray-500"
            benefits={[
              "23+ feature engineering functions",
              "5 built-in modeling algorithms",
              "Configurable cross-validation pipeline",
              "Full diagnostic suite",
              "Technical support, with responses in < 12 hours",
              "Direct connect to AWS, GCP, and Azure",
              "Self-host on any Linux cluster",
              "No dataset size limit",
              "Automate your forecasting jobs",
            ]}
          >
            <CalendlyLink
              url="{TODO REPLACE WITH YOUR CALENDLY URL}"
              text="Schedule introductory call"
              class_style="theme-button-outline text-responsive w-full"
            />
          </PricingCard>
        </div>
      </div>
    </div>
  );
}
