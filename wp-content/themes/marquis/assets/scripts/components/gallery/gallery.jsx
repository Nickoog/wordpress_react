import React from 'react';
import Loader from '../Loader';
import GalleryPhoto from 'react-photo-gallery';
import Lightbox from 'react-images';

class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gallery: {},
            //imagesArray: [],
            currentImage: 0
        }
        this.goBack = this.goBack.bind(this);
        this.imageObject = this.imageObject.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }

    componentDidMount() {
        const that = this;
        that.getGallery();
    }
    
    getGallery () {
        const that = this;
        const url = window.location.href.split('/');
        const slug = url.pop() || url.pop();

        fetch(MarquisSettings.URL.api + "gallery?slug=" + slug)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (res) {
                that.setState({ 
                    gallery: res[0],
                })
            });
    }

    imageObject = (imageArray) => {
        const newArray = [];
        if (imageArray !== null) {
            imageArray.forEach( objetData => {
                const newObject = {
                    src: objetData.url,
                    width: objetData.width,
                    height: objetData.height,
                } 
                newArray.push(newObject);
            });
            return newArray;
        }
        return
    }

    goBack(){
        this.props.history.goBack();
    }

    openLightbox(event, obj) {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true,
        });
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    renderGallery() {
        const {title, slug, acf, content} = this.state.gallery;
        const photos = this.imageObject(this.state.gallery.acf.gallery);
        if (!photos) {
            return null;
        }
        return (
            <div 
                id={`gallery-${slug}`}
                className="gallery-container"
            >
                <div className="title-wrapper">
                    <h4>{title.rendered}</h4>
                </div>
                <div className="content-wrapper">
                    <p
                    className="content"
                    dangerouslySetInnerHTML={{
                    __html: content.rendered
                    }}
                    />
                </div>
                <GalleryPhoto 
                    photos={photos}
                    onClick={this.openLightbox} 
                />
                <Lightbox 
                    images={photos}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                />
            </div>
        );
    }

    renderLoader() {
        return (
            <Loader/>
        );
    }

    render() {
        return (
            <div className="container gallery">
                <div className="button-wrapper">
                    <button onClick={this.goBack}>
                        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                    </button>
                </div>
                {this.state.gallery.title ? this.renderGallery() : this.renderLoader()}
            </div>
        );
    }
}

export default Gallery;