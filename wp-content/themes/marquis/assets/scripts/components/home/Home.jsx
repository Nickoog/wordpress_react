import React from 'react';
import Loader from '../Loader';
import Banner from './Banner';
import DuoSection from './DuoSection';
import TextSection from './TextSection';
import Slider from 'react-slick';

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
                that.setState({ 
                    acf: results[0].acf,
                    loading: false,
                });
                console.log(results);
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });

    }

    componentDidMount() {
        const that = this;
        that.getHome();
    }

    renderHome() {
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
        
        return (
            <div className="home-container">
                <Slider {...settings}>
                    {
                        carousel.map(image => <Banner key={image.id} image={image} />)
                    }
                </Slider>
                <TextSection content={acf} />
                {section_duo.map((section, i) => <DuoSection key={i} section={section} />)}
            </div>
        );    
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader/>
            )
        }
        return (
            <div className="home">
                { this.renderHome() }
            </div>
        );
    }
}

export default Home;