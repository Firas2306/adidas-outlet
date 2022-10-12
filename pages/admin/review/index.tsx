import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Cart from '../../../models/Cart';
import CartItem from '../../../models/CartItem';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import Review from '../../../models/Review';
import User from '../../../models/User';


const Reviews: NextPage = (props: any) => {
    useEffect(() => {
        console.log(props.reviews);
    })
    return (
        <AdminLayout>
            <div className="bg-secondary text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0">Reviews</h6>
                </div>
                <div className="table-responsive">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-white">
                                <th scope="col">User</th>
                                <th scope="col">Product</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.reviews.map((review: any) => (
                                <tr key={review._id}>
                                    <td>{review.user.firstname}</td>
                                    <td>{review.product.name}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.text}</td>
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
    Cart; CartItem; Product; User;
    await dbConnect();
    const reviews = await Review.find();
    return {
        props: {
            reviews: JSON.parse(JSON.stringify(reviews))
        },
    }
}

export default Reviews
