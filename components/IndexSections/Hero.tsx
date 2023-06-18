import React from "react";
import SlideinText from "../FramerTransitions/SlideInText";
import SmoothScrollButton from "../SmoothScrollButton";
import { useAnimation, AnimatePresence, motion } from "framer-motion";
import Topology from "../CanvasAnimations/Topology";
import { useWindowSize } from "../CustomHooks";

const animationDuration = 1.1;
const variants = {
  initial: { x: "-100vw" },
  open: {
    x: 0,
    transition: {
      delay: 0.7,
      duration: animationDuration,
      ease: [0.85, 0, 0.15, 1],
      staggerChildren: 0.1,
    },
  },
  close: {
    x: "-100vw",
    transition: {
      delay: 0.7,
      duration: animationDuration,
      ease: [0.85, 0, 0.15, 1],
      staggerChildren: 0.1,
    },
  },
  textinitial: {
    x: 0,
  },
  textopen: {
    x: "-52%",
    transition: {
      delay: 0.7,
      duration: animationDuration,
      ease: [0.85, 0, 0.15, 1],
      staggerChildren: 0.1,
    },
  },
  textclose: {
    x: 0,
    transition: {
      delay: 0.7,
      duration: animationDuration,
      ease: [0.85, 0, 0.15, 1],
      staggerChildren: 0.1,
    },
  },
  contentinitial: {
    x: 0,
  },
  contentopen: {
    x: "120%",
    transition: {
      delay: 0.7,
      duration: animationDuration - 0.3,
      ease: [0.85, 0, 0.15, 1],
      staggerChildren: 0.1,
    },
  },
  contentclose: {
    x: 0,
    transition: {
      delay: 0.7 + 0.3,
      duration: animationDuration,
      ease: [0.85, 0, 0.15, 1],
      staggerChildren: 0.1,
    },
  },
};

function ScrollArrow() {
  return (
    <SmoothScrollButton
      children={
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      }
      section="about"
    />
  );
}

export default function Hero() {
  const contentControls = useAnimation();
  let size = useWindowSize();

  return (
    <div id="hero" className={size.width > 1023 ? "bg-[#111]" : "bg-hero"}>
      <div id="topology" className="z-0"></div>
      <div className="flex flex-col justify-between h-screen section">
        <div></div>
        <div className="hidden lg:flex"></div>
        <div className="z-40 text-6xl font-bold lg:hidden leading-12 text-contrast">
          Run your business on accurate, reliable forecasts.
        </div>
        <div className="hidden font-bold lg:flex lg:flex-col text-title-responsive leading-12">
          <SlideinText
            delay={0.25}
            duration={1.5}
            className="leading-none text-contrast"
            text={[
              {
                id: 11,
                content: "Run your business on",
              },
              { id: 22, content: "accurate, reliable forecasts" },
            ]}
          />
        </div>
        <div className="z-40 text-xl font-bold lg:hidden leading-12 text-contrast">
          <div>Predict the future and explain your</div>
          <div>results in minutes, not months.</div>
          <div>No code or PhD rqeuired.</div>
        </div>
        <div className="hidden lg:flex lg:flex-col">
          <AnimatePresence>
            <motion.div
              key="content"
              initial={variants.contentinitial}
              animate={contentControls}
              exit={variants.contentclose}
              className=""
            >
              <div className="flex items-center justify-between text-contrast">
                <span className="font-medium">
                  <SlideinText
                    delay={1}
                    duration={1.5}
                    className="text-2xl text-contrast"
                    text={[
                      {
                        id: 1,
                        content: "Predict the future and explain your",
                      },
                      {
                        id: 2,
                        content: "results in minutes, not months.",
                      },
                      {
                        id: 3,
                        content: "No code or PhD required.",
                      },
                    ]}
                  />
                </span>
                <div className="hidden text-right sm:block">
                  <ScrollArrow />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Topology />
    </div>
  );
}
