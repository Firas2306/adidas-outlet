import person from "./images/person3.png";
import { useState, useEffect, Component, useContext } from "react";
import Image from "next/image";
import Head from 'next/head'
import { AuthContext } from "../context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";


export const Header = (props: any) => {

  const router = useRouter();

  const [user, setUser] = useContext(AuthContext);


  const logout = () => {
    setUser(null);
    router.push('/login');
  }

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/css/nice-select.min.css"
          integrity="sha512-CruCP+TD3yXzlvvijET8wV5WxxEh5H8P4cmz0RFbKK6FlZ2sYl3AEsKlLPHbniXKSrDdFewhbmBK5skbdsASbQ=="
          crossOrigin="anonymous"
        />
        <link href="/assets/css/font-awesome.min.css" rel="stylesheet" />
        <link href="/assets/css/style.css" rel="stylesheet" />
        <link href="/assets/css/responsive.css" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/029682b453.js" crossOrigin="anonymous"></script>

      </Head>


      <div className="hero_area" style={{ minHeight: props.home ? '100vh' : 0 }}>
        {/* header section strats */}
        {props.home && (
          <div className="bg-box" >
            <img src="/assets/images/hero-bg.jpg" alt="" />
          </div>
        )}
        <header className="header_section" style={{ backgroundColor: '#222831' }}>
          <div className="container">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <Link href="/">
                <a className="navbar-brand">
                  <span>Adidas outlet</span>
                </a>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className=""> </span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav  mx-auto ">
                  <li className="nav-item">
                    <Link href="/">
                      <a className="nav-link">
                        Home
                      </a>
                    </Link>
                  </li>
                  {
                    user && <>
                      <li className="nav-item">
                        <Link href="/wishlist">
                          <a className="nav-link">
                            Wishlist
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/cart">
                          <a className="nav-link">
                            Cart
                          </a>
                        </Link>
                      </li>
                    </>}
                </ul>
                <div className="user_option">
                  {
                    user ? <>
                      <span style={{ color: 'wheat'}}>{user?.firstname || 'User Account'}</span>
                      <button onClick={logout} className="nav-item nav-link text-danger">Logout</button>
                    </> : <>
                      <Link href="/login" >
                        <a className="order_online">Login</a>
                      </Link>
                      <Link href="/login" >
                        <a className="order_online">Register</a>
                      </Link>
                    </>
                  }
                </div>
              </div>
            </nav>
          </div>
        </header>

        {props.home && (
          <section className="slider_section" >
            <div className="container ">
              <div className="row">
                <div className="col-md-7 col-lg-6 ">
                  <div className="detail-box">
                    <h1>Adidas outlet</h1>
                    <p>
                    The adidas range of men's shoes has got you covered, if you're striving to be the best or you just want the best fit for your daily life. With iconic designs and high-performance technologies, you can be sure that your shoes won't let you down.
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn1">
                        Order Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

