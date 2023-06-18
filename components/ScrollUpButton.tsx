import React from "react";
import { FaArrowUp } from "react-icons/fa";



export default function ScrollButton() {

    const [isVisible, setIsVisible] = React.useState(false)

    function toggleVisibility() {
        if (window.pageYOffset > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    React.useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)

        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])


    return (
        <div className="flex fixed bottom-8 right-8 z-50">
            <button
                type="button"
                onClick={scrollToTop}
                className={isVisible ? 'opacity-75 inline-flex  rounded-full items-center p-2 shadow-sm text-white bg-gray-500 hover:bg-theme-darker hover:ring-2 hover:ring-offset-2 transition duration-200 cursor-pointer'
                    : 'opacity-0 inline-flex items-center p-2 rounded-full shadow-sm text-white bg-gray-500 hover:bg-theme-darker hover:ring-2 hover:ring-offset-2 transition duration-200 cursor-pointer '}
            >
                <FaArrowUp />
            </button>
        </div>
    )
}