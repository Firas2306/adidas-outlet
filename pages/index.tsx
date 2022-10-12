import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useEffect, useState } from 'react';
import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { toast } from 'react-toastify';
import axios from '../lib/axios';

const Index: NextPage = (props: any) => {

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const addQuery = (e: any) => {
    e.preventDefault();
    const payload =  Object.fromEntries(new FormData(e.target));
    console.log(payload);

    

    toast.promise(axios.post('/query/add', payload).then(res => {
        location.reload();
    }), {
        pending: 'Adding query',
        success: 'Query added',
        error: 'Query can not be added'
    })
}

  return (

    <>


      <Header home ></Header>

      {/* offer section */}
      <section className="offer_section layout_padding-bottom" style={{ minHeight: '80vh'}}> 
        <div className="offer_container">
          <div className="container ">
            <div className="row">
              <div className="col-md-6  ">
                <div className="box ">
                  <div className="img-box">
                    <img src="/assets/images/o1.jpg" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>If wishes were fishes, we'd have a fish fry.</h5>
                    <a href="" className='mt-2'>
                      My Wishlist
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6  ">
                <div className="box ">
                  <div className="img-box">
                    <img src="/assets/images/o2.jpg" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>One-stop for head to toe look</h5>
                    <a href="" className='mt-2'>
                      Cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end offer section */}
      {/* food section */}
      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Shop</h2>
          </div>
          <div className="filters-content">
            <div className="row">
              {
                props.products.map((product: any) => <ProductCard key={product.id} product={product} />)
              }
            </div>
          </div>
        </div>
      </section>
      {/* end food section */}
      {/* about section */}
      <section className="about_section layout_padding" style={{paddingBottom: 0}}>
        <div className="container  ">
          <div className="row">
            <div className="col-md-6 ">
              <div className="img-box">
                <img src="/assets/images/history-adidas.jpg"  alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>History of adidas</h2>
                </div>
                <p>
                  
Adidas was founded by Adolf "Adi" Dassler who made sports shoes in his mother's scullery or laundry room in Herzogenaurach, Germany after his return from World War I. In July 1924, his older brother Rudolf joined the business, which became Dassler Brothers Shoe Factory (Gebrüder Dassler Schuhfabrik).</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end about section */}
      {/* book section */}
      <section className="book_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Create a query</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form_container">
                <form onSubmit={addQuery}>
                  <div>
                    <input
                      type="text"
                      name='name'
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name='phone'
                      className="form-control"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name='email'
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name='description'
                      className="form-control"
                      placeholder="Describe your query"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="btn_box">
                    <button type='submit'>Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="map_container ">
                <div id="googleMap" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer></Footer>
    </>

  )
}

export async function getServerSideProps(context: any) {
  await dbConnect();
  const products = await Product.find();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    },
  }
}


export default Index
