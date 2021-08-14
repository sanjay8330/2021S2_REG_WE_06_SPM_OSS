import React, { Component } from 'react'
import Header from './components/header/header';

export default class home extends Component {
    render() {
        return (
            <div>
                <Header />
                <section class="business-travel-hero media-photo media-photo-block hero-img--sm" data-scroll-tracking="hero" data-reactid="3">
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
                </section>
                <section>
                    <h4>Special Product Offers</h4>
                </section>
                <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br />
            </div>
        )
    }
}
