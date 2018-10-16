import React from 'react';

const Banner = ({image}) => (
    <div
        className="banner-wrapper"
        style={{'backgroundImage': `url(${image.url}`}}
    >
        <h1>Logo</h1>
    </div>
);

export default Banner;