import React from 'react';
import { Link } from 'react-scroll';

const SmoothScrollLink = ({ href, children }) => {
    return (
        <Link
            to={href.substring(1)} // Remove '#' from the href for scrolling
            smooth={true}
            duration={500}
            offset={-70} // Adjust as needed for fixed headers
            className="cursor-pointer"
        >
            {children}
        </Link>
    );
};

export default SmoothScrollLink;
