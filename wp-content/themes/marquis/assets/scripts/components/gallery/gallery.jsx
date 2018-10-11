import React from 'react';
import Loader from '../Loader';

class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gallery: {},
        }
        this.goBack = this.goBack.bind(this);
    }
    

    componentDidMount() {
        const that = this;
        const url = window.location.href.split('/');
        const slug = url.pop() || url.pop();

        fetch(MarquisSettings.URL.api + "gallery?slug=" + slug)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                //console.log(reponse);
                return response.json();
            })
            .then(function (res) {
                console.log(res);
                that.setState({ 
                    gallery: res[0],
                })
            });
    }

    goBack(){
        this.props.history.goBack();
    }

    renderGallery() {
        return (
            <div className="gallery-container">
                <p
                    className="card-text"
                    dangerouslySetInnerHTML={{
                    __html: this.state.gallery.content.rendered
                    }}
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
                <button onClick={this.goBack}>Go Back</button>
                {this.state.gallery.title ? this.renderGallery() : this.renderLoader()}
            </div>
        );
    }
}

export default Gallery;