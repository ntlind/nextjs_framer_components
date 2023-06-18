import React from "react";

import SEO from "../components/SEO";

import Header from "../components/IndexSections/Header";
import Hero from "../components/IndexSections/Hero";
import About from "../components/IndexSections/About";
import Value from "../components/IndexSections/Value";
import Pricing from "../components/IndexSections/Pricing";
import CallToAction from "../components/IndexSections/CallToAction";
import ScrollButton from "../components/ScrollUpButton";
import Footer from "../components/IndexSections/Footer";

export default function Home() {
  return (
    <div id="top" className="overflow-x-hidden font-sans">
      <SEO
        title="A better way to forecast"
        description="An interactive GUI to simplify hierarchical forecasting"
      />
      <ScrollButton />
      <Header />
      <Hero />
      <About />
      <Value />
      <CallToAction />
      <Pricing />
      <div className="bg-blue-50">
        <Footer />
      </div>
    </div>
  );
}
