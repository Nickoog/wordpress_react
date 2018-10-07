import React from 'react';
import { Link } from 'react-router-dom';
import LoadingIcon from '../../loading-icon.gif';
import Placeholder from '../../placeholder.jpg';
import NotFound from '../not-found';
import CardGallery from './CardGallery';

class Galleries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            galleries: [],
            gallery: {},
            //page: 0,
            //getGalleries: true,
            controller: false,
            
        } 
        this.getMoreGalleries = this.getMoreGalleries.bind(this);
    }

    // componentWillUnmount() {
    //     this.getMoreGalleries = null;
    // }
    nextGallery = () => {
        var that = this;
        const newIndex = this.state.gallery.index+1;
        console.log(newIndex)
        this.setState({
            gallery: that.state.galleries[newIndex]
        })
    }
    
    prevGallery = () => {
        var that = this;
        const newIndex = this.state.gallery.index-1;
        console.log(newIndex)
        this.setState({
            gallery: that.state.galleries[newIndex]
        })
    }
    getMoreGalleries() {
        var that = this;
        //var totalPages;

        //this.setState({ page: this.state.page + 1 });

        fetch(MarquisSettings.URL.api + "gallery?per_page=100")
            .then(function (response) {
                // for (var pair of response.headers.entries()) {

                //     // getting the total number of pages
                //     if (pair[0] == 'x-wp-totalpages') {
                //         totalPages = pair[1];
                //         console.log()
                //     }

                //     if (that.state.page >= totalPages) {
                //         that.setState({ getGalleries: false })
                //     }
                // }
                // if (!response.ok) {
                //     throw Error(response.statusText);
                // }
                
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
                that.setState({ 
                    galleries: allGalleries,
                    gallery: allGalleries[0]
                });
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });

    }
    componentDidMount() {
        var that = this;
        that.getMoreGalleries();
        // // init ScrollMagic Controller
        // that.state.controller = new ScrollMagic.Controller();

        // // build scene
        // var scene = new ScrollMagic.Scene({ triggerElement: "#colophon", triggerHook: "onEnter" })
        //     .addTo(that.state.controller)
        //     .on("enter", function (e) {
        //         if (that.state.getGalleries && that.getMoreGalleries !== null) {
        //             that.getMoreGalleries();
        //         }
        //     });
    }

    

    componentDidUpdate() {
        var fadeInController = new ScrollMagic.Controller();
        document.querySelectorAll('.container .col-md-4.card-outer').forEach(function (item) {
            var ourScene2 = new ScrollMagic.Scene({
                triggerElement: item.children[0],
                reverse: false,
                triggerHook: 1
            })
                .setClassToggle(item, 'fade-in')
                .addTo(fadeInController);
        });
    }

    renderGalleries() {
        console.log(this.state.gallery);
        const {galleries, gallery} = this.state;
        console.log(this.state.galleries.length);
        return (
        <div className="App">

            <button 
                onClick={() => this.prevGallery()} 
                disabled={gallery.index === 0}
            >Prev</button>
            <button 
                onClick={() => this.nextGallery()} 
                disabled={gallery.index === galleries.length-1}
            >Next</button>

            <div className="page">
                <div className="col">
                    <div className={`cards-slider active-slide-${gallery.index}`}>
                        <div className="cards-slider-wrapper" style={{
                        'transform': `translateX(-${gallery.index*(100/galleries.length)}%)`
                        }}>
                        {
                            galleries.map(gallery => <CardGallery key={gallery.id} gallery={gallery} />)
                        }
                        </div>
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
        return (
            <div className="container post-entry">
                {this.state.galleries ?
                    this.renderGalleries() :
                    this.renderEmpty()
                }
            </div>
        );
    }

}

export default Galleries;