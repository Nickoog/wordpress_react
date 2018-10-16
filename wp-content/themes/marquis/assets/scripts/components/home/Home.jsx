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
        var that = this;
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
        var that = this;
        that.getHome();
    }

    renderHome() {
        const { carousel } = this.state.acf;
        const { acf } = this.state;
        const settings = {
            dots: true,
            infinite: true,
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
                <DuoSection content={acf} />
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