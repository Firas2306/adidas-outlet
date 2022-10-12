import person from "./images/person3.png";
import { useState, useEffect, Component } from "react";
import Image from "next/image";


export const Footer = () => {



    return (
        <>

            <footer className="footer_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 footer-col">
                            <div className="footer_contact">
                                <h4>Contact Us</h4>
                                <div className="contact_link_box">
                                    <a href="">
                                        <i className="fa fa-map-marker" aria-hidden="true" />
                                        <span>Location</span>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-phone" aria-hidden="true" />
                                        <span>Call +972549777085</span>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-envelope" aria-hidden="true" />
                                        <span>serhanferas@gmail.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 footer-col">
                            <div className="footer_detail">
                                <a href="" className="footer-logo">
                                    Adidas outlet
                                </a>
                                <p>
                                    Necessary, making this the first true generator on the Internet.
                                    It uses a dictionary of over 200 Latin words, combined with
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 footer-col">
                            <h4>Opening Hours</h4>
                            <p>Everyday</p>
                            <p>10.00 Am -10.00 Pm</p>
                        </div>
                    </div>
                </div>
            </footer>
            
        </>
    )
}

