import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import Hamburger from "../HeaderComponents/Hamburger";
import NavBar from "../HeaderComponents/NavBar";
import SmoothScrollButton from "../SmoothScrollButton";

import Link from "next/link";
import { useRouter } from "next/router";

const menuLinks = [
  { title: "Home", path: "/", id: 1, scrollLink: false },
  { title: "Walkthrough", path: "/walkthrough", id: 2, scrollLink: false },
  {
    title: "FAQ",
    path: "https://quantile.app/walkthrough#faq",
    id: 3,
    scrollLink: false,
  },
];

function HeaderLinks({ links }) {
  const router = useRouter();

  var activeFontColor = "text-white";
  var passiveFontColor = "text-gray-300";

  return (
    <div className="flex flex-row items-center space-x-10">
      {links.map(({ title, path, id, scrollLink }) => (
        <div key={id}>
          {scrollLink ? (
            <SmoothScrollButton
              children={
                <a
                  className={
                    "md:text-gray-300 md:cursor-pointer md:slide-left-right md:hover:text-white"
                  }
                >
                  {title}
                </a>
              }
              section={path}
            />
          ) : (
            <Link key={id} href={path}>
              <a
                className={`cursor-pointer ${
                  router.pathname === path
                    ? activeFontColor + " cursor-pointer slide-constant"
                    : passiveFontColor +
                      " cursor-pointer slide-left-right hover:text-white"
                }`}
              >
                {title}
              </a>
            </Link>
          )}
        </div>
      ))}

      <a href="/auth" target="_blank">
        <button className="text-base theme-button-white-outline btn-sm">
          {" "}
          Launch App{" "}
        </button>
      </a>
    </div>
  );
}

interface HeaderInterface {
  text_contrast?: boolean;
}

export default function Header({ text_contrast = true }: HeaderInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();
  const textControls = useAnimation();

  const { scrollY } = useViewportScroll();
  const o1 = useTransform(
    scrollY,
    text_contrast ? [0, 300, 400] : [0, 50, 100],
    [1, 1, 0]
  );

  const path01Variants = {
    open: { d: "M3.06061 2.99999L21.0606 21" },
    closed: { d: "M0 9.5L24 9.5" },
  };

  const path02Variants = {
    open: { d: "M3.00006 21.0607L21 3.06064" },
    moving: { d: "M0 14.5L24 14.5" },
    closed: { d: "M0 14.5L15 14.5" },
  };

  const textVariants = {
    fadeOut: {
      opacity: 0,
      y: 0,
      transition: {
        delay: 0,
        duration: 0.25,
        ease: "easeOut",
      },
    },
    fadeIn: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0,
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const onClick = async () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      await path02Controls.start(path02Variants.moving);
      path01Controls.start(path01Variants.open);
      path02Controls.start(path02Variants.open);
      textControls.start(textVariants.fadeOut);
    } else {
      path01Controls.start(path01Variants.closed);
      await path02Controls.start(path02Variants.moving);
      path02Controls.start(path02Variants.closed);
      textControls.start(textVariants.fadeIn);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className={
            text_contrast
              ? "bg-transparent w-screen fixed section z-50 text-contrast"
              : "bg-transparent w-screen fixed section z-50 text-white"
          }
          style={{ opacity: o1 }}
          key="header"
        >
          <div className="flex items-center justify-between py-2 border-gray-100 md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                <span className="text-xl font-medium md:text-3xl">
                  Quantile
                </span>
              </a>
            </div>
            <div className="hidden md:flex">
              <HeaderLinks links={menuLinks} />
            </div>
            <div className="md:hidden">
              <Hamburger
                path01Variants={path01Variants}
                path02Variants={path02Variants}
                path01Controls={path01Controls}
                path02Controls={path02Controls}
                textControls={textControls}
                onClick={onClick}
              />
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          {isOpen && <NavBar links={menuLinks} onClick={onClick} />}
        </AnimatePresence>
      </AnimatePresence>
    </>
  );
}
