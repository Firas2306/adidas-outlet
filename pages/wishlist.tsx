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

const Wishlist: NextPage = (props: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    setHasMounted(true);
    console.log(user);
  }, []);



  const removeFromWishList = (product: any) => {
    toast.promise(axios.patch(`/wishlist/${product.id}/remove`, {}).then(({ data }) => {
      setUser(data.user)
    }), {
      pending: 'Loading ...',
      success: `${product.name} removed successfully`,
      error: 'Can not update wishlist'
    })
  }


  const addToCart = (product: any) => {
    toast.promise(axios.post(`/cart/add`, {
      product_id: product.id,
      quantity: 1,
    }).then(({ data }) => {
      setUser(data.user)
    }), {
      pending: 'Loading ...',
      success: 'Product added to cart',
      error: 'Request failed'
    })
  }

  if (!hasMounted) {
    return null;
  }



  return (

    <div>

      <Header></Header>

      <div className="container"  style={{ minHeight: '80vh'}}>
        <h1 style={{ fontSize: '40px', }} className='text-center mt-2'>Wishlist</h1>
        <table className="table text-start align-middle table-bordered table-hover mb-0 my-5">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Add to Cart</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {user.wishlist.map((product: any) => (
              <tr key={user._id}>
                <td><img src={product.imagePath as any} style={{ maxHeight: 100 }} alt="Image" /></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><button  className='btn btn-warning' onClick={() => addToCart(product)}>Add to Cart</button></td>
                <td><button className='btn btn-danger' onClick={() => removeFromWishList(product)} >Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Wishlist
