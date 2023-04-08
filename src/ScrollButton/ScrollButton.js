import { useState, useEffect } from 'react';
function ScrollButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [isVisible])

    const listenToScroll = () => {
        let heightToHideFrom = 200;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;

        if (winScroll < heightToHideFrom) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {
                isVisible &&
                <button className="main-buttons__scroll-to-top" onClick={goToTop}></button>
            }
        </>
    );
}

export default ScrollButton;
