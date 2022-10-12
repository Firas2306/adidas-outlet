import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import User from '../../../models/User';


const ProductDetails: NextPage = (props: any) => {


    return (
        <AdminLayout>
            <>
                <div className="">
                    <div className="bg-secondary rounded h-100 p-4">
                        <h6 className="mb-4">Product details</h6>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Image</th>
                                    <td><Image width={100} height={100} className="object-cover h-full" src={props.product.imagePath} alt="img title" /></td>
                                </tr>
                                <tr>
                                    <th scope="row">Id</th>
                                    <td>{props.product._id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{props.product.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Price</th>
                                    <td>{props.product.price}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Description</th>
                                    <td>{props.product.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const product = await Product.findById(context.query.id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        },
    }
}

export default ProductDetails
