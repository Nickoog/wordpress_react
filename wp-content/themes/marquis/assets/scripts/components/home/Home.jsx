import React, { Component, lazy, Suspense } from "react";


import Loader from '../Loader';
import Banner from './Banner';
import DuoSection from './DuoSection';
import TextSection from './TextSection';
import Slider from 'react-slick';

// const Banner = lazy(() => import('./Banner'));
// const DuoSection = lazy(() => import('./DuoSection'));
// const TextSection = lazy(() => import('./TextSection'));
// const Slider = lazy(() => import('react-slick'));

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            acf: [],
            loading: true,
        } 
        this.getHome = this.getHome.bind(this);
    }

    getHome() {
        const that = this;
        fetch(MarquisSettings.URL.api + "pages?slug=home")
            .then(function (response) {        
                return response.json();
            })
            .then(function (results) {
                console.log(results);
                that.setState({ 
                    acf: results[0].acf,
                    loading: false,
                });
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });

    }

    componentDidMount() {
        console.log('hello');
        const that = this;
        that.getHome();
    }

    renderHome() {
        
    }

    render() {
        const { carousel } = this.state.acf;
        const { section_duo } = this.state.acf;
        const { acf } = this.state;
        const settings = {
            dots: true,
            infinite: true,
            lazyLoad: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 3000,
            cssEase: "linear",
        };

        if (this.state.loading) {
            return (
                <Loader/>
            )
        }
        return (
            <div className="home-container">
                <Slider {...settings}>
                    {
                        carousel.map(image => 
                            <Suspense fallback={<div>Loading.....</div>}>
                                <Banner key={image.id} image={image} />
                            </Suspense>
                        )
                    }
                </Slider>
                <Suspense fallback={<div>Loading.....</div>}>
                    <TextSection content={acf} />
                </Suspense>
                <TextSection content={acf} />
                {section_duo.map((section, i) => 
                    <Suspense fallback={<div>Loading.....</div>}>
                        <DuoSection key={i} section={section} />
                    </Suspense>
                )}
            </div>
        ); 
    }   
}

export default Home;