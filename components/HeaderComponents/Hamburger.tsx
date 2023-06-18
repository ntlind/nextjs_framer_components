import { motion } from "framer-motion";

interface HamburgerProps {
    path01Variants: any,
    path02Variants: any,
    path01Controls: any,
    path02Controls: any,
    textControls: any,
    onClick: object
}

export default function Hamburger({ path01Variants, path02Variants, path01Controls, path02Controls, textControls, onClick }: HamburgerProps) {
    return (
        // @ts-ignore
        <button onClick={onClick} className="flex flex-row items-center justify-center">
            <motion.div initial="initial"
                animate={textControls}
                className="mx-4">
                Menu
            </motion.div>
            <svg width="28" height="28" viewBox="0 0 24 24">
                <motion.path
                    {...path01Variants.closed}
                    animate={path01Controls}
                    transition={{ duration: 0.2 }}
                    className='stroke-white'
                />
                <motion.path
                    {...path02Variants.closed}
                    animate={path02Controls}
                    transition={{ duration: 0.2 }}
                    className='stroke-white'
                />
            </svg>
        </button>
    );
};
