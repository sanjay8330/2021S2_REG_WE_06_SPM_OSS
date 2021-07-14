import React, { Component } from 'react'
import '../../css/style.css';

export default class footer extends Component {
    render() {
        return (
            <div>
                <div class="footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <p class="footer-head">About</p>
                                <p class="about">Lorem Ipsum is simply dummy text of the printing and typesetting. <br />Lorem Ipsum is simply dummy text of the printing and typesetting.<br /> Lorem Ipsum is simply dummy text of the printing and typesetting. <br />Lorem Ipsum is simply dummy text of the printing and typesetting. </p>
                                <br/>
                                <div class="copyright">
                                    &copy; Copyright <strong>SPM SLIIT PROJECT - 2021</strong>. All Rights Reserved
                                </div>
                                <div class="credits">
                                    Designed by: <a href="/">Group - TEAM S3K</a>
                                </div>

                            </div>
                            <div class="col-lg-2 col-lg-offset-2 col-md-2 col-sm-3">
                                <p class="footer-head">Learn more</p>
                                <ul class="list-unstyled page-links">
                                    <li><a href="/privacy">HOME</a></li>
                                    <li><a href="/terms">ABOUT</a></li>
                                    <li><a href="/become-a-partner">CONTACT</a></li>
                                    <li><a href="http://help.kfit.com/">FAQ</a></li>
                                    <li><a href="http://press.kfit.com">LOGIN</a></li>
                                    <li><a href="http://careers.kfit.com">SIGNUP</a></li>
                                </ul>
                            </div>

                            <div class="col-lg-2 col-md-3 col-sm-3">
                                <p class="footer-head">Contact</p>
                                <ul class="list-unstyled social-links">
                                    <a href="mailto:ask@kfit.com">0773452221</a>
                                </ul>

                                <p class="footer-head">Email</p>
                                <ul class="list-unstyled social-links">
                                    <a href="mailto:ask@kfit.com">Fashionz@gmail.com</a>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
