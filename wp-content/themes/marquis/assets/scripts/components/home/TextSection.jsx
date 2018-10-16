import React from 'react';

const TextSection = ({ content }) => (
    <div className="text-section">
        <div
        className="content-container"
        dangerouslySetInnerHTML={{
        __html: content.text
        }}
        />
    </div>
);

export default TextSection;