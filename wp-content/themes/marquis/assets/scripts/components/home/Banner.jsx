import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
const Banner = ({image}) => (
    <div
        className="banner-wrapper"
        style={{'backgroundImage': `url(${image.url}`}}
    >
        <ScrollAnimation animateIn='zoomInDown' animateOut='fadeOut'>
            <h1>Logo</h1>
        </ScrollAnimation>
    </div>
);

export default Banner;