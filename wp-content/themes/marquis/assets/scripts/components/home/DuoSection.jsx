import React from 'react';

const DuoSection = ({ content }) => (
    <div className="duo-section">
        <div
        className="content-container"
        dangerouslySetInnerHTML={{
        __html: content.text
        }}
        />
        <div className="image-wrapper">
            <img src={content.image_duo} />
        </div>
    </div>
);

export default DuoSection;