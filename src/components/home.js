import React from "react";
import "../css/style.css";
import "../assets/img/favicon.png";
import "../assets/img/apple-touch-icon.png";
import logo from '../assets/chainxt_logo.png';
// import githubLogo from '../assets/github-icon.png';
import githubLogo from '../assets/github.svg';
import bannerRightImage from '../assets/img/wallet-image1.png'
import { Link, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import GenerateWallet from "../components/wallet";
import { useState , useEffect} from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import "../css/bootstrap-icons/bootstrap-icons.css";

export default function Home({}) {
    return (
        <div>
          {/* Replace the content of the head tag */}
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <title>Chainxt - Blockchain Consulting Simplified - Index</title>
            <meta content="" name="Chainxt - Blockchain Consulting Simplified" />
            <meta content="" name="Chainxt, Blockchain Consulting Simplified, Blockchain, Consulting" />

            <header id="header" className="header fixed-top">

                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                    <div className="header-left-container d-flex align-items-center">
                        <a target={"_blank"} href="https://www.chainxt.io" className="logo d-flex align-items-center">
                            <img src={logo} alt="Chainxt" />
                        </a>
                        {/* <a href="index.html" className="logo logo-innowallet d-flex align-items-center">
                            <div>
                                InnoWalletix - HD Wallet
                            </div>
                        </a> */}
                    </div>
                    <div className="header-right-container">
                        <a target={"_blank"} href="https://github.com/Chainxt/InnoWalletix-HD-Wallet" className="btn btn-secondry"><img className="githubLogoCls" src={githubLogo} alt="Github" />Github</a>
                    </div>

                </div>
              
            </header>
    
            <main id="main">
                <section id="hero" className="hero hero-banner d-flex align-items-center py-3">
                    <div className="container">
                        {
                        <div className="row flex-column-reverse flex-lg-row">
                            <div className="col-lg-7 d-flex flex-column justify-content-center">
                                <h1>InnoWalletix - HD Wallet</h1>
                                <h2>InnoWalletix is a versatile non-custodial HD wallet that seamlessly integrates blockchain transactions into applications.</h2>
                                <div className="button-wrapper">
                                    <div className="text-center text-lg-start">
                                    <Link to="/wallet" className="btn btn-primary btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                                        <span className="letsstartbtn">Let's Start</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </Link>
                                    <a target={"_blank"} href="https://github.com/Chainxt/InnoWalletix-HD-Wallet" className="btn btn-secondry btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center ms-3">
                                        <img className="githubLogoCls" src={githubLogo} alt="Github" />
                                        <span>Github</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </a> 
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 hero-img mb-3 mb-lg-0">
                                <figure>
                                    <img src={bannerRightImage} className="img-fluid" alt="InnoWalletix HT Wallet" />
                                </figure>
                            </div>
                        </div>
                        }
                    </div>
                </section>
            </main>

            <footer id="footer" className="footer">

                <div className="footer-top">
                <div className="container">
                    <div className="row gy-4">
                    <div className="col-lg-5 col-md-12 footer-info">
                        <a target={"_blank"} href="https://www.chainxt.io" className="logo d-flex align-items-center">
                            <img src={logo} alt="Chainxt" />
                        </a>
                        <p>We are a blockchain consulting company, specialize in developing, training, and consulting on innovative blockchain solutions</p>
                        <div className="social-links mt-3">
                        <a target={"_blank"} href="https://twitter.com/chainxt" target="_blank" className="twitter"><i className="bi bi-twitter"></i></a>
                        <a target={"_blank"} href="https://www.facebook.com/chainxt" target="_blank" className="facebook"><i className="bi bi-facebook"></i></a>
                        <a target={"_blank"} href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                        <a target={"_blank"} href="https://www.linkedin.com/company/chainxt" target="_blank" className="linkedin"><i className="bi bi-linkedin"></i></a>
                        <a target={"_blank"} href="https://github.com/chainxt" target="_blank" className="github"><i className="bi bi-github"></i></a>
                        <a target={"_blank"} href="https://www.youtube.com/@chainxt" target="_blank" className="youtube"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    <div className="col-lg-4 col-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                        <li><i className="bi bi-chevron-right"></i> <a target={"_blank"} href="https://www.chainxt.io/">Home</a></li>
                        <li><i className="bi bi-chevron-right"></i> <a target={"_blank"} href="https://www.chainxt.io/academy/">Academy</a></li>
                        <li><i className="bi bi-chevron-right"></i> <a target={"_blank"} href="https://www.chainxt.io/products/">Products</a></li>
                        <li><i className="bi bi-chevron-right"></i> <a target={"_blank"} href="https://www.chainxt.io/services/">Services</a></li>
                        <li><i className="bi bi-chevron-right"></i> <a target={"_blank"} href="https://www.chainxt.io/about/">About</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                        <h4>Contact Us</h4>
                        <p>
                            <strong>Phone:</strong> (+91) 981 016 1638<br/>
                            <strong>Email:</strong> info@chainxt.io<br/>
                        </p>

                    </div>

                    </div>
                </div>
                </div>

                <div className="container">
                <div className="copyright">
                    &copy; Copyright <strong><span>Chainxt</span></strong>. All Rights Reserved
                </div>
                </div>
            </footer>

        </div>
      );
};