import React from 'react';
import PropTypes from 'prop-types';

const PictureSet = ( {photo} ) => {
    return (
        <div className="col-md-6">
            <div className="image-wrapper">
                <img src= {photo.url}/>
            </div>
        </div>    
    )
}

PictureSet.propTypes = {
    photo: PropTypes.object.isRequired
}

export default PictureSet;