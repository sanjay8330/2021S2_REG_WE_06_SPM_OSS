import React, { Component } from 'react';
import '../../css/style.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (

            <div class="clone-airbnb">
                <div id="header" class="airbnb-header airbnb-business-header hide-print">
                    <header class="small-business-header show-sm" aria-hidden="true" role="banner">
                        <div class="header-flyout-app">
                        </div>
                        <div class="title--sm text-center">
                            <a class="link-reset belo-container" href="/business">
                                <i class="icon icon-white icon-airbnb"></i><span class="word-business">FASHIONZ</span>
                            </a>
                        </div>
                    </header>
                    <div class="hide-sm regular-header regular-business-header clearfix">
                        <div class="comp comp--border-none comp--background-transparent pull-left">
                            <a class="link-reset belo-container" href="/business-travel">
                                <i class="icon icon-white icon-airbnb"></i><span class="word-business">FASHIONZ</span>
                            </a>
                        </div>
                        <div class="comp comp--background-transparent comp--border-none pull-left">
                            <a href="/" class="hdr-btn link-reset active">
                                HOME
                            </a>
                        </div>
                        <div class="comp comp--background-transparent comp--border-none pull-left">
                            <a href="/business/signup" class="hdr-btn link-reset ">
                                ABOUT
                            </a>
                        </div>
                        <div class="comp comp--background-transparent comp--border-none pull-left">
                            <a href="/business-travel-ready" class="hdr-btn link-reset ">
                                CONTACT
                            </a>
                        </div>
                        <div class="comp pull-right show-logout">
                            <a href="/login" class="hdr-btn link-reset" data-login-modal="">
                                LOGIN
                            </a>
                        </div>
                        <div class="comp pull-right show-logout">
                            <a href="/register" class="hdr-btn link-reset" data-header-view="true" data-signup-modal="">
                                SIGNUP
                            </a>
                        </div>
                        <div class="search-bar-container pull-right">
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header;