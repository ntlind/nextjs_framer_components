// @ts-nocheck

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { VideoComponent } from "../VideoComponent";

export const tabs = [
  {
    title: "Upload",
    child: <VideoComponent video_name={"intake"} />,
    description:
      "Drag and drop your file, or connect directly to over a dozen cloud databases.",
  },
  {
    title: "Configure",
    child: <VideoComponent video_name={"configure"} />,
    description:
      "Customize every aspect of your pipelines, or let us automate the process for you.",
  },
  {
    title: "Explore",
    child: <VideoComponent video_name={"analyze"} />,
    description:
      "We distill dozens of diagnostic tests into intuitive recommendations designed for business users.",
  },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function About() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div
      id="about"
      className="flex flex-col items-center justify-center mx-auto bg-white section"
    >
      <div className="mb-8 text-4xl font-bold tracking-tight text-center md:text-5xl">
        Machine learning made easy
      </div>
      <AnimateSharedLayout>
        <ul className="relative z-20 flex w-full max-w-4xl p-0 mx-8 my-2 text-gray-500 md:w-7/12">
          {tabs.map(({ title }, i) => {
            const isActive = i === page;
            return (
              <li
                key={i}
                className={
                  isActive
                    ? "text-theme list-none w-full text-center relative z-50"
                    : "list-none w-full text-center relative z-50"
                }
                onClick={() => {
                  setPage([i, i - page]);
                }}
              >
                <h4 className="m-4 cursor-pointer text-responsive">{title}</h4>
                {isActive && (
                  <motion.div
                    className="relative z-10 w-full h-1 rounded max-w-4 bg-theme"
                    layoutId="underline"
                  />
                )}
              </li>
            );
          })}
          <div className="absolute bottom-0 z-0 w-full h-1 bg-gray-200 rounded" />
        </ul>
        <div
          className="w-full max-w-4xl mt-4 md:w-7/12"
          style={{ aspectRatio: "366 / 205.88" }}
        >
          <AnimatePresence exitBeforeEnter initial={false} custom={direction}>
            <motion.section
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              className="w-full"
              exit="exit"
              transition={{
                x: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.1,
                },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              {tabs[page].child}
            </motion.section>
          </AnimatePresence>
        </div>
      </AnimateSharedLayout>
      <div className="pt-6 text-center text-responsive">
        {tabs[page].description}
      </div>
    </div>
  );
}
