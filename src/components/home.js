import React from "react";
import "../css/style.css";
import "../assets/img/favicon.png";
import "../assets/img/apple-touch-icon.png";
import logo from '../assets/chainxt_logo.png';
import { Link, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import GenerateWallet from "../components/wallet";
import { useState , useEffect} from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'


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
                <a href="index.html" className="logo d-flex align-items-center">
                <img src={logo} alt="Chainxt" />
                </a>
            </div>
              
            </header>
    
            <main id="main">
                <section id="hero" className="hero d-flex align-items-center">
                    <div className="hero-overlay"></div>
                    <div className="container home-container">
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="hero-banner-slider swiper">
                            {<div className="swiper-wrapper align-items-center">
                                <div className="swiper-slide">
                                <div className="row flex-column-reverse flex-lg-row">
                                    <div className="col-lg-7 d-flex flex-column justify-content-center">
                                    <h1 data-aos="fade-up">InnoWalletix - HD Wallet</h1>
                                    <h2 data-aos="fade-up" data-aos-delay="400">InnoWalletix is a versatile non-custodial HD wallet that seamlessly integrates blockchain transactions into applications.</h2>
                                    <div data-aos="fade-up" data-aos-delay="600">
                                        <div className="text-center text-lg-start">
                                        <Link to="/wallet" className="btn btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                                            <span>Let's Start</span>
                                            <i className="bi bi-arrow-right"></i>
                                        </Link>
                                        {/* <Button onClick={()=> getStartedButtonClicked()} className="btn btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">Let's Start</Button> */}
                                        <a href="https://github.com/Chainxt/InnoWalletix-HD-Wallet" className="btn btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                                            <span>Github</span>
                                            <i className="bi bi-arrow-right"></i>
                                        </a> 
                                        {/* <a href="#" className="btn btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                                            <span>Let's Start</span>
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                        <a href="https://github.com/Chainxt/InnoWalletix-HD-Wallet" className="btn btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                                            <span>Github</span>
                                            <i className="bi bi-arrow-right"></i>
                                        </a> */}
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-5 hero-img mb-3 mb-lg-0" data-aos="zoom-out" data-aos-delay="200">
                                    </div>
                                </div>
                                </div>
                            </div>}

                            <div className="swiper-pagination"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer id="footer" class="footer">

                <div class="footer-top">
                <div class="container">
                    <div class="row gy-4">
                    <div class="col-lg-5 col-md-12 footer-info">
                        <a href="index.html" class="logo d-flex align-items-center">
                        </a>
                        <p>We are a blockchain consulting company, specialize in developing, training, and consulting on innovative blockchain solutions</p>
                        <div class="social-links mt-3">
                        <a href="https://twitter.com/chainxt" target="_blank" class="twitter"><i class="bi bi-twitter"></i></a>
                        <a href="https://www.facebook.com/chainxt" target="_blank" class="facebook"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                        <a href="https://www.linkedin.com/company/chainxt" target="_blank" class="linkedin"><i class="bi bi-linkedin"></i></a>
                        <a href="https://github.com/chainxt" target="_blank" class="github"><i class="bi bi-github"></i></a>
                        <a href="https://www.youtube.com/@chainxt" target="_blank" class="youtube"><i class="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    <div class="col-lg-4 col-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                        <li><i class="bi bi-chevron-right"></i> <a href="index.html">Home</a></li>
                        <li><i class="bi bi-chevron-right"></i> <a href="course">Course</a></li>
                        <li><i class="bi bi-chevron-right"></i> <a href="certification.html">Certification</a></li>
                        <li><i class="bi bi-chevron-right"></i> <a href="internship.html">Internship</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                        <h4>Contact Us</h4>
                        <p>
                            <strong>Phone:</strong> (+91) 981 016 1638<br/>
                            <strong>Email:</strong> info@chainxt.io<br/>
                        </p>

                    </div>

                    </div>
                </div>
                </div>

                <div class="container">
                <div class="copyright">
                    &copy; Copyright <strong><span>Chainxt</span></strong>. All Rights Reserved
                </div>
                </div>
  </footer>

        </div>
      );
};