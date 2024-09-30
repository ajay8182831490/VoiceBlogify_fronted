import React from 'react';
import { Link } from 'react-scroll';

const SmoothScrollLink = ({ href, children }) => {
    return (
        <Link
            to={href.substring(1)}
            smooth={true}
            duration={500}
            offset={-70}
            className="cursor-pointer"
        >
            {children}
        </Link>
    );
};

export default SmoothScrollLink;
