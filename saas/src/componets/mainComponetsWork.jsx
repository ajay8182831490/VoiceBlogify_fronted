import React from 'react';
import HowVoiceBlogifyHelps from './HowVoiceBlogifyHelpU';
import VisualPath from './HowItWork';

const MainComponent = () => {
    return (
        <>
            <VisualPath />
            <HowVoiceBlogifyHelps />
        </>

    );
};

export default React.memo(MainComponent);
