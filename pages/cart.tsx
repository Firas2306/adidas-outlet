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
import Link from 'next/link';

const Wishlist: NextPage = (props: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    setHasMounted(true);
    console.log(user);
  }, []);



  const updateCart = (itemId: any, quantity: any) => {
    toast.promise(axios.patch(`/cart/update`, { itemId, quantity }).then(({ data }) => {
      setUser(data.user)
    }), {
      pending: 'Loading ...',
      success: `Cart Updated`,
      error: 'Can not update wishlist'
    })
  }

  if (!hasMounted) {
    return null;
  }



  return (

    <div>

      <Header></Header>

      <div className="container" style={{ minHeight: '80vh' }}>
        <h1 style={{ fontSize: '40px', }} className='text-center mt-2'>Cart</h1>
        <table className="table text-start align-middle table-bordered table-hover mb-0 my-5">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {user.cart.items.map((item: any) => (
              <tr key={user._id}>
                <td><img src={item.product.imagePath as any} style={{ maxHeight: 100 }} alt="Image" /></td>
                <td>{item.product.name}</td>
                <td>${item.product.price}</td>
                <td>
                  <div className="qty">
                    <button className='btn btn-warning' onClick={() => updateCart(item.id, item.quantity - 1)}>-</button>
                    <input type="text" style={{ textAlign: 'center' }} value={item.quantity} />
                    <button className='btn btn-warning' onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
                  </div>
                </td>
                <td>${item.sub_total}</td>
                <td><button className='btn btn-danger' onClick={() => updateCart(item.id, 0)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='m-auto' style={{ maxWidth: 400 }}>
          <h3>Cart Summary</h3>
          <h3>Grand Total: ${user.cart.total}</h3>
          <Link href={'/checkout'} >
            <button className='btn btn-warning mt-4' style={{ width: "100%" }}>Checkout</button>
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Wishlist
