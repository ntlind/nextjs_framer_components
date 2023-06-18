import React from "react";

export default function SmoothScrollButton({ children, section, callback = null, }) {
    const scrollTo = (ref) => {
        let element = document.getElementById(section);
        element && element.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    function onClick() {
        if (callback) {
            callback();
            scrollTo(section);
        } else {
            scrollTo(section);
        }
    }
    return (
        <button className="cursor-pointer" onClick={onClick}>
            {children}
        </button>
    );
}