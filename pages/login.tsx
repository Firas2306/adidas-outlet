import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useContext, useEffect, useState } from 'react';
import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import { Footer } from '../components/Footer';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from '../lib/axios';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../context/authContext';

const Index: NextPage = (props: any) => {

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }


  const router = useRouter();
  const [, setUser] = useContext(AuthContext);

  const register = (e: any) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target));
    console.log(payload);


    toast.promise(axios.post('/auth/register', payload).then(res => {
      console.log(res);
      // router.back();
    }), {
      pending: 'Registering ...',
      success: 'Registered successfully',
      error: 'Registerating failed'
    })
  }


  const login = (e: any) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target));
    console.log(payload);


    toast.promise(axios.post('/auth/login', payload).then(({ data }) => {

      (axios.defaults as any).headers["Authorization"] = "Bearer " + data.access_token;
      localStorage.setItem("access_token", data.access_token);
      setUser(data.user)
      router.push('/');
    }), {
      pending: 'Loggin In ...',
      success: 'Logged In successfully',
      error: 'Loggin In failed'
    })
  }

  return (
    <div>
      <Header></Header>

      <div style={{ border: '2px solid gray', maxWidth: 500, margin: '10px auto', borderRadius: 10}} className="p-4">
        <h2 style={{ fontSize: '40px', }} className='text-center'>Login</h2>
        <div className="form_container">
          <form onSubmit={login}>
            <div className='mt-2'>
              <input
                type="text"
                className="form-control"
                name="email" placeholder="E-mail"
                required
              />
            </div>
            <div className='mt-2'>
              <input
                type="text"
                className="form-control"
                name="password" placeholder="Password"
                required
              />
            </div>


            <div className="mt-2">
              <button type='submit' className='btn btn-warning'>Submit</button>
            </div>
          </form>
        </div>
      </div>


      <div style={{ border: '2px solid gray', maxWidth: 500, margin: '10px auto', borderRadius: 10 }} className="p-4">
      <h2 style={{ fontSize: '40px', }} className='text-center'>Register</h2>
        <div className="form_container">
          <form onSubmit={register}>
            <div className='mt-2'>
              <input
                type="text"
                className="form-control"
                name="firstname" placeholder="First Name"
                required
              />
            </div>
            <div className='mt-2'>
              <input
                type="text"
                className="form-control"
                name="lastname" placeholder="Last Name"
                required
              />
            </div>
            <div className='mt-2'>
              <input
                type="text"
                className="form-control"
                name="email" placeholder="E-mail"
                required
              />
            </div>
            <div className='mt-2'>
              <input
                type="text"
                className="form-control"
                name="phone" placeholder="Mobile No"
                required
              />
            </div>
            <div className='mt-2'>
              <input
                type="text"
                className="form-control"
                name="password" placeholder="Password"
                required
              />
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
