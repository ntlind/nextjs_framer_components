import React from "react";
import fs from "fs"
import MarkdownPost from "../components/MarkdownPost";
import matter from "gray-matter";

import Footer from "../components/IndexSections/Footer";
import Header from "../components/IndexSections/Header";
import { VideoComponent } from "../components/VideoComponent";
import Topology from "../components/CanvasAnimations/Topology"

interface PostProps {
  content: any;
  frontmatter: any;
}

function Hero() {
  return (
    <>
      <Topology backgroundColor={0xffffff} opacity={.07} number_of_particles={200}
        num_iterations={150} />
      <div id="topology" className="bg-white flex flex-col relative w-full h-screen-11/12 text-center justify-center">
        <div className='section'>
          <div className="flex flex-col relative z-20 justify-center mt-36">
            <div className="tracking-tight font-bold text-6xl xl:text-5xl relative">
              A better way to forecast
            </div>
            <div className="sm:text-lg text-gray-500 my-6 mx-auto">
              Quantile is a forecasting GUI that makes it easy for analysts and ML
              engineers alike to predict <br className="hidden xl:flex" /> future
              events. Read on to learn why we're building it and how it works.
            </div>
          </div>
          <div>
            <div className="mt-0 mx-12 xl:ml-12 xl:mr-0 flex sm:h-5/12h xl:h-6/12h justify-center relative z-20">
              <VideoComponent
                video_name="short_demo"
                poster="/images/screenshots/iphone_and_ipad.webp"
                alt="iPad and iPhone screenshots of the Quantile app"
              />
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  )
}


export default function Walkthrough({ content, frontmatter }: PostProps) {
  return (
    <>
      {/* NOTE: SEO is defined within MarkdownPost */}
      <Header text_contrast={true} />
      <Hero />
      <MarkdownPost content={content} frontmatter={frontmatter} hero={false} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const markdownWithMetadata = fs
    .readFileSync("./public/markdown/walkthrough.md")
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  // Convert post date to format: Month day, Year
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = data.date.toLocaleDateString("en-US", options);

  const frontmatter = {
    ...data,
    date: formattedDate,
  };

  return {
    props: {
      content: `${content}`,
      frontmatter,
    },
  };
}