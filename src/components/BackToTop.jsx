import { useState, useEffect } from "react";

function BackToTop() {
    const [backToTop, setBackToTop] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTop(true);
            } else {
                setBackToTop(false);
            }
        });
    },
        []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div>
            {backToTop && (
                <button onClick={scrollUp} className="fixed bottom-20 right-20 py-3 px-4 rounded-lg bg-yellow-300 shadow-md border-none cursor-pointer z-50 hover:bg-gray-900 hover:text-white">
                    To Top
                </button>
            )
            }
        </div >
    );
}

export default BackToTop;