import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import { toast } from 'react-toastify';
import axios from '../../../lib/axios';
import User from '../../../models/User';


const Products: NextPage = (props: any) => {
    useEffect(() => {
        console.log(props.products);
    })

    
    const deleteProduct = (productId: any) => {

        toast.promise(axios.delete(`/product/${productId}`).then(res => {
            console.log(res);
            location.reload();
        }), {
            pending: 'Deleting product',
            success: 'Product deleted',
            error: 'Product can not be deleted'
        })
    }
    return (
        <AdminLayout>
            <div className="bg-secondary text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0">Products</h6>
                    <Link href="/admin/product/add" passHref>
                        <a className="py-2 rounded-md px-5 bg-primary text-white">add product</a>
                    </Link>
                </div>
                <div className="table-responsive">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-white">
                                <th scope="col">Id</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.products.map((product: any) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td><img style={{ height: 50 }} src={product.imagePath} className="object-cover" /> </td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <a href={`/admin/product/${product._id}`} className="btn btn-sm btn-primary">Detail</a>
                                        <button onClick={() => deleteProduct(product._id)} className="btn btn-sm btn-primary">Delete</button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
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

export default Products