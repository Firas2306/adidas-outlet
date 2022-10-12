import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useContext, useEffect, useRef, useState } from 'react';
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




  const checkout = (transaction: any) => {
    const payload = { ...JSON.parse(localStorage.getItem('checkout') as any), transaction };

    console.log(payload);





    toast.promise(axios.post('/order/add', payload).then(
      ({ data }) => {
        setUser(data.user)
        router.push('/');
      }), {
      pending: 'Loading ...',
      success: 'Order completed',
      error: 'Order failed'
    })
  }



  return !user ? null : (

    <div>

      <Header></Header>

      <div style={{ border: '2px solid gray', maxWidth: 500, margin: '10px auto', borderRadius: 10, minHeight: '80vh'}} className="p-4">
        <h2 style={{ fontSize: '40px', }} className='text-center'>Pay</h2>
        <div className="checkout-summary mt-3">
          <h3>Cart Summary</h3>
          <h3>Grand Total: ${user.cart.total}</h3>
        </div>

        <div className='mt-5'>

          <PayPalScriptProvider options={{ "client-id": "Afi7uzNbjODz0LVwxBmEsBZ-1uNp4PKCC176VE_694yVYicTAHF8gqd3ItmfjcIcGzKQIGurQDopMNsr" }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: user.cart.total,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions: any) => {
                return actions.order.capture().then((transaction: any) => {
                  console.log(transaction);
                  checkout(transaction);
                });
              }}
              style={{ layout: "horizontal" }} />
          </PayPalScriptProvider>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Wishlist
