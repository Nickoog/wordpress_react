import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


// return this.state.galleries.map((gallery, i) => {
//     return (
//         <div className="col-md-4 card-outer" key={i}>
//             <div className="card">
//                 <div className="img-outer">
//                     <Link to={gallery.slug}>
//                         <img className="card-img-top" src={gallery.images ? gallery.images[0].src : Placeholder} alt="Featured Image" />
//                     </Link>
//                 </div>
//                 <div className="card-body">
//                     <h4 className="card-title"><Link to={gallery.slug}>{gallery.name}</Link></h4>
//                     <p className="card-text"><small className="text-muted">$ {gallery.price}</small></p>
//                     <p dangerouslySetInnerHTML={{ __html: gallery.description }} />
//                 </div>
//             </div>
//         </div>
//     )
// });

const CardGallery = ({gallery}) => {
    const {index, title, slug, featured_image_src} = gallery;
    return (
        <div id={`card-${index}`} className="card">
            <Link to={slug}>
                <img src={featured_image_src} alt={title} />
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