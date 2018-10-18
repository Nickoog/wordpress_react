import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const TextSection = ({ content }) => (
    <div className="text-section">
        <ScrollAnimation animateIn='fadeIn' animateOut='fadeOut'>
            <div
            className="content-container"
            dangerouslySetInnerHTML={{
            __html: content.text
            }}
            />
        </ScrollAnimation>
    </div>

);

export default TextSection;