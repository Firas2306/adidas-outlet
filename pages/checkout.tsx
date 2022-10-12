import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useContext, useEffect, useState } from 'react';
import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import withAuth from '../middlewares/withAuth';
import axios from '../lib/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';
import Cart from '../models/Cart';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';

const Wishlist: NextPage = (props: any) => {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }




  const saveAddress = (e: any) => {
    e.preventDefault();
    const address = Object.fromEntries(new FormData(e.target));
    const payload = {
      cart_id: user.cart.id,
      address
    }
    localStorage.setItem('checkout', JSON.stringify(payload));
    location.replace('/pay');
  }



  return (

    <div>

      <Header></Header>

      <div style={{ border: '2px solid gray', maxWidth: 500, margin: '10px auto', borderRadius: 10, minHeight: '80vh'}} className="p-4">
        <h2 style={{ fontSize: '40px', }} className='text-center'>Checkout</h2>
        <div className="form_container">
          <form onSubmit={saveAddress}>
            <div className="mt-2">
              <input className="form-control" type="text" name="firstname" defaultValue={user.firstname} placeholder="First Name" />
            </div>
            <div className="mt-2">
              <input className="form-control" type="text" name="lastname" defaultValue={user.lastname} placeholder="Last Name" />
            </div>
            <div className="mt-2">
              <input className="form-control" type="email" name="email" defaultValue={user.email} placeholder="E-mail" />
            </div>
            <div className="mt-2">
              <input className="form-control" type="tel" name="mobile" defaultValue={user.mobile} placeholder="Mobile No" />
            </div>
            <div className="mt-2">
              <input className="form-control" type="text" name="address" placeholder="Address" />
            </div>
            <div className="mt-2">
              <label>Country</label>
              <select className="custom-select" name="country">
                <option selected>United States</option>
                <option>Germany</option>
                <option>Israel</option>
                <option>Brazil</option>
                <option>Canada</option>
                <option>holand</option>
              </select>
            </div>
            <div className="mt-2">
              <input className="form-control" name="city" type="text" placeholder="City" />
            </div>
            <div className="mt-2">
              <input className="form-control" name="state" type="text" placeholder="State" />
            </div>
            <div className="mt-2">
              <input className="form-control" name="zip" type="text" placeholder="ZIP Code" />
            </div>

            <div className="checkout-summary mt-3">
              <h3>Cart Summary</h3>
              <h3>Grand Total: ${user.cart.total}</h3>
            </div>

            <div className="mt-2">
              <button type='submit' className='btn btn-warning'>Submit</button>
            </div>
          </form>
        </div>
      </div>

      <Footer></Footer>
    </div>
  )
}

export default Wishlist
