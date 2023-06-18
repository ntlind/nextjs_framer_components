import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";


export default function Hero() {
  const { scrollY } = useViewportScroll();
  const [scroll, setScroll] = useState(0);
  let [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  })

  scrollY.onChange((e) => setScroll(-1 * (e - windowHeight * 2.5) / 50))

  return (
    <div id="customerIcons" className="flex justify-center">
      <div className="w-full flex flex-row justify-between">
        <AnimatePresence>
          {['m.png', 'c.svg', 'uv.png', 'bd.png', 'w.svg', 'ptya.png'].map(x =>
            <motion.img
              className="h-4 sm:h-6 md:h-10 opacity-50 transform grayscale"
              style={{ translateX: scroll }}
              src={`./client_logos/${x}`}
            />
          )}
        </AnimatePresence>
      </div >
    </div>

  );
}
