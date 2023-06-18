// @ts-nocheck

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { VideoComponent } from "../VideoComponent"

export const tabs = [
  { title: "Upload", child: <VideoComponent video_name={'intake'} />, description: "Drag and drop your file, or connect directly to over a dozen cloud databases." },
  { title: "Configure", child: <VideoComponent video_name={'configure'} />, description: "Customize every aspect of your pipelines, or let us automate the process for you." },
  { title: "Explore", child: <VideoComponent video_name={'analyze'} />, description: "We distill dozens of diagnostic tests into intuitive recommendations designed for business users." }
];


const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 50 : -50,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    };
  }
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
    <div id="about" className="section bg-white mx-auto flex flex-col items-center justify-center">
      <div className="tracking-tight font-bold text-4xl md:text-5xl text-center mb-8">
        Machine learning made easy
        {/* TODO update */}
      </div>
      <AnimateSharedLayout>
        <ul className="text-gray-500 flex my-2 mx-8 p-0 relative w-full md:w-7/12 max-w-4xl z-20">
          {tabs.map(({ title }, i) => {
            const isActive = i === page;
            return (
              <li
                key={i}
                className={isActive ? "text-theme list-none w-full text-center relative z-50" : "list-none w-full text-center relative z-50"}
                onClick={() => {
                  setPage([i, i - page]);
                }}
              >
                <h4 className="m-4 text-responsive cursor-pointer">{title}</h4>
                {isActive && (
                  <motion.div className="w-full max-w-4 h-1 rounded bg-theme relative z-10" layoutId="underline" />
                )}
              </li>
            );
          })}
          <div className="w-full h-1 rounded bg-gray-200 absolute bottom-0 z-0" />
        </ul>
        {/* TODO add mission statement stuff */}
        {/* TODO add other TODOs */}
        <div className="w-full md:w-7/12 max-w-4xl mt-4" style={{ aspectRatio: "366 / 205.88" }}>
          <AnimatePresence exitBeforeEnter initial={false} custom={direction}>
            <motion.section
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              className='w-full'
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30, duration: .1 },
                opacity: { duration: 0.2 }
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
      <div className="text-center pt-6 text-responsive">{tabs[page].description}</div>
    </div>
  );
};
