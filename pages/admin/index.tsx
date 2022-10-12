

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import AdminLayout from '../../layouts/AdminLayout'


const Home: NextPage = () => {
    return (
        <AdminLayout>
            <div className="p-5 rounded-lg bg-white">
                <p>Dashboard</p>
                <img src="/assets/images/adidas.png" style={{ width: '100%'}}  alt="" />
            </div>

        </AdminLayout>
    );
}

export default Home
