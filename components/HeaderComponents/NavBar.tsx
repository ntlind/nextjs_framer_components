import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SmoothScrollButton from "../SmoothScrollButton";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

interface NavbarProps {
  onClick: any;
  links: Array<any>;
}

export default function NavBar({ onClick, links }: NavbarProps) {
  return (
    <>
      <motion.aside
        initial={{ width: 0 }}
        key="navbar"
        animate={{
          width: 450,
        }}
        exit={{
          width: 0,
          transition: { delay: 0.7, duration: 0.2 },
        }}
        className="fixed top-0 left-0 z-50 h-screen text-4xl text-white bg-theme"
      >
        <motion.div
          className="mx-12 my-24 space-y-12"
          initial="closed"
          animate="open"
          exit="closed"
          variants={sideVariants}
        >
          {links.map(({ title, path, id, scrollLink }) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              variants={itemVariants}
              className="block"
              key={id}
            >
              {scrollLink ? (
                <SmoothScrollButton
                  children={<button>{title}</button>}
                  section={path}
                  callback={onClick}
                />
              ) : (
                <Link key={id} href={path}>
                  {title}
                </Link>
              )}
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.1 }}
            variants={itemVariants}
            className="absolute block text-xl bottom-24"
          >
            <button onClick={onClick}>Close Menu</button>
          </motion.div>
        </motion.div>
      </motion.aside>
    </>
  );
}
