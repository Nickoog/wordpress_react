import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';



const DuoSection = ({ section, index}) => {
    const {text_duo, image_duo, link, position_image, button_text} = section;
    let settings = '';
    position_image === '-1'? settings = 'bounceInRight': settings = 'bounceInLeft';
    return (
        <div className="duo-section">
            <ScrollAnimation 
                animateIn={settings} 
                animateOut='fadeOut'>
                <div 
                className="cta-container"
                >
                    <div
                        className="cta-content"
                        dangerouslySetInnerHTML={{
                        __html: text_duo
                    }}
                    />
                    <div className="button-wrapper">
                        <Link
                            className="cta-button" 
                            to={link}
                        >{button_text}
                        </Link>
                    </div>
                </div>
            </ScrollAnimation>
            <div 
                className="image-wrapper"
                style={{'order': position_image}}
            >
                <img src={image_duo} />
            </div>
        </div>
    )
}

export default DuoSection;