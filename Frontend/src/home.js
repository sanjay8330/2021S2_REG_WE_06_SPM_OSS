import React, { Component } from 'react'
import Header from './components/header/header';
import ss from '../src/images/aaa.jpg';

export default class home extends Component {
    render() {
        return (
            <div>
                <Header />
              
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src={ss} alt="First slide" style={{ filter: 'blur(1px)' }} />
                        </div>
                        <div class="bg-text">
                            <h2>Online Shopping Store</h2>
                            <h1>FASHIONZ</h1>
                            <p>Shop Now</p>
                        </div>
                        {/* <div class="carousel-item">
                                <img class="d-block w-40" src={aa} alt="Second slide" style = {{margin: '0 auto'}}/>
                            </div>
                                <div class="carousel-item">
                                    <img class="d-block w-10" src={dd} alt="Third slide" style = {{margin: '0 auto'}}/>
                                </div> */}
                    </div>
               
                {/* <section class="business-travel-hero media-photo media-photo-block hero-img--sm" data-scroll-tracking="hero" data-reactid="3">
                                <div class="media-cover pretzel-header-module"></div>
                                <div class="row row-table row-full-height" data-reactid="5">
                                    <div class="col-12 col-middle text-center" data-reactid="6">
                                        <div class="page-container-responsive" data-reactid="7">
                                            <div class="text-contrast" data-reactid="8">
                                                <h1 class="text-jumbo space-1" data-reactid="9">FASHIONZ CLUB</h1>
                                                <h3 class="space-6 space-top-1" data-reactid="10" style={{ color: "purple" }}>Online Shopping Store</h3>
                                                <div class="landing-enroll-app" data-reactid="12">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section> */}
                {/* <section>
                                <h4>Special Product Offers</h4>
                            </section> */}
                <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br />
            </div>
        )
    }
}
