import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CardGallery = ({gallery}) => {
    const {index, title, slug, featured_image_src} = gallery;
    return (
        <div 
            id={`card-${index}`} 
            className="card-gallery"
            style={{'backgroundImage': `url(${featured_image_src}`}}
        >
            <Link to={slug}>
                <div className="details">
                    <h3>{title.rendered}</h3>
                </div>
            </Link>
        </div>
    )
}

CardGallery.propTypes = {
    gallery: PropTypes.object.isRequired
}

export default CardGallery;