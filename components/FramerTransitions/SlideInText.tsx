import { motion, AnimatePresence } from "framer-motion";

interface SlideInTextProps {
    text: Array<any>,
    delay?: number,
    duration?: number,
    initialX?: number,
    fontSize?: string
    className?: string
}

export default function SlideInText({
    text,
    delay = 0.75,
    duration = 1.5,
    initialX = 0,
    fontSize = "120%",
    className = ""
}: SlideInTextProps) {
    const variants = {
        fadeIn: {
            initial: {
                opacity: 1,
                x: initialX,
                y: fontSize,
            },
            animate: {
                opacity: 1,
                y: "-10%",
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
        <AnimatePresence>
            {text.map(({ id, content }) => (
                <div key={id} className="overflow-hidden">
                    <motion.div
                        key={id}
                        initial="initial"
                        variants={variants.fadeIn}
                        animate="animate"
                        className={className}
                    >
                        {content}
                    </motion.div>
                </div>

            ))}
        </AnimatePresence>
    );
}