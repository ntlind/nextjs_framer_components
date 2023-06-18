import { motion } from "framer-motion";

interface EaseInTransitionProps {
    children: any,
    delay: number,
    duration: number,
    initialX: number,
    initialY: number
    renderOnce: boolean
}

export default function EaseInTransition({ children, delay = .25, duration = .45, initialX = 0, initialY = -20, renderOnce = true }: EaseInTransitionProps) {
    const variants = {
        fadeIn: {
            initial: {
                opacity: 0,
                x: initialX,
                y: initialY,
            },
            animate: {
                opacity: 1,
                y: 0,
                transition: {
                    delay: delay,
                    duration: duration,
                    ease: "easeOut",
                    staggerChildren: 0.1,
                },
            },
        },
    };
    return (
        <>
            <motion.div
                initial="initial"
                variants={variants.fadeIn}
                whileInView="animate"
                viewport={{ once: renderOnce }}
            >
                // @ts-ignore
                {children}
            </motion.div>
        </>
    );
}