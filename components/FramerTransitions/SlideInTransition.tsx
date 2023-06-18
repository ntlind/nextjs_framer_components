import { motion, AnimatePresence } from "framer-motion";

interface SlideInTransitionProps {
    children: any,
    delay: number,
    duration: number,
    initialX: number,
    fontSize: string,
}
// @ts-nocheck

export default function SlideInTransition({
    children,
    delay = 0.75,
    duration = 1.5,
    initialX = 0,
    fontSize = "100%",
}: SlideInTransitionProps) {

    const variants = {
        fadeIn: {
            initial: {
                opacity: 1,
                x: initialX,
                y: fontSize,
            },
            animate: {
                opacity: 1,
                y: 0,
                transition: {
                    delay: delay,
                    duration: duration,
                    ease: [0.85, 0, 0.15, 1],
                    staggerChildren: 0.1,
                },
            },
        },
    };

    return (
        <div className="overflow-hidden mt-4">
            <AnimatePresence>
                <motion.div
                    initial="initial"
                    variants={variants.fadeIn}
                    animate="animate"
                    className=""
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}