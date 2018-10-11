import React from 'react';
import NotFound from '../not-found';
import CardGallery from './CardGallery';
import Loader from '../Loader';

class Galleries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            galleries: [],
            gallery: {},
            loading: true,
        } 
        this.getGalleries = this.getGalleries.bind(this);
    }

    nextGallery = () => {
        var that = this;
        const newIndex = this.state.gallery.index+1;
        this.setState({
            gallery: that.state.galleries[newIndex]
        })
    }
    
    prevGallery = () => {
        var that = this;
        const newIndex = this.state.gallery.index-1;
        this.setState({
            gallery: that.state.galleries[newIndex]
        })
    }

    getGalleries() {
        var that = this;
        fetch(MarquisSettings.URL.api + "gallery?per_page=100")
            .then(function (response) {        
                return response.json();
            })
            .then(function (results) {
                var allGalleries = that.state.galleries.slice();
                var index = -1;
                results.forEach(function (single) {
                    index++;
                    single.index = index;
                    allGalleries.push(single);
                })
                //const middle = Math.floor(allGalleries.length/2);
                that.setState({ 
                    galleries: allGalleries,
                    gallery: allGalleries[0],
                    loading: false,
                });
                console.log(allGalleries);
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });

    }

    componentDidMount() {
        var that = this;
        that.getGalleries();
    }

    renderGalleries() {
        const {galleries, gallery} = this.state;
        
        return (
            <div className="galleries-container">
                <div className="chevron-container">
                    <button 
                        className="chevron-wrapper"
                        onClick={() => this.prevGallery()} 
                        disabled={gallery.index === 0}
                    ><i className="fa fa-angle-left" aria-hidden="true"></i>
                    </button>
                    <button
                        className="chevron-wrapper" 
                        onClick={() => this.nextGallery()} 
                        disabled={gallery.index === galleries.length-1}
                    ><i className="fa fa-angle-right" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="col">
                    <div className={`cards-slider active-slide-${gallery.index}`}>
                        <div 
                            className="cards-slider-wrapper" 
                            style={{'transform': `translateX(-${gallery.index*(100/galleries.length)}%)`}}
                        >
                            {
                                galleries.map(gallery => <CardGallery key={gallery.id} gallery={gallery} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );    
    }

    renderEmpty() {
        return (
            <NotFound />
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader/>
            )
        }
        return (
            <div className="galleries">
                {this.state.galleries ?
                    this.renderGalleries() :
                    this.renderEmpty()
                }
            </div>
        );
    }
}

export default Galleries;