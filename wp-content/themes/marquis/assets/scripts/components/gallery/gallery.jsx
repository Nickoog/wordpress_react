import React from 'react';
import NotFound from '../not-found';
import { Link } from 'react-router-dom';

class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        var that = this;
        var url = window.location.href.split('/');
        var slug = url.pop() || url.pop();

        fetch(MarquisSettings.URL.api + "gallery/?page=" + this.state.page)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                //console.log(reponse);
                return response.json();
            })
            .then(function (res) {
                that.setState({ product: res[0] })
            });
    }

    renderProduct() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="col-sm-4"><img className="product-image" src={this.state.product.images ? this.state.product.images[0].src : null} alt={this.state.product.images ? this.state.product.images[0].alt : null } /></div>
                    <div className="col-sm-8">
                        <h4 className="card-title">{this.state.product.name}</h4>
                        <p className="card-text"><strike>${this.state.product.regular_price}</strike> <u>${this.state.product.sale_price}</u></p>
                        <p className="card-text"><small className="text-muted">{this.state.product.stock_quantity} in stock</small></p>
                        <p className="card-text" dangerouslySetInnerHTML={{ __html: this.state.product.description }} />
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
                {this.state.product ?
                    this.renderProduct() :
                    this.renderEmpty()
                }
            </div>
        );
    }
}

export default Gallery;