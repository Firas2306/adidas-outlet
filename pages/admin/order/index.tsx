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
import User from '../../../models/User';


const Orders: NextPage = (props: any) => {
    useEffect(() => {
        console.log(props.products);
    })
    return (
        <AdminLayout>
            <div className="bg-secondary text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0">Orders</h6>
                </div>
                <div className="table-responsive">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-white">
                                <th scope="col">Order Id</th>
                                <th scope="col">Transaction Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Total Paid</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.orders.map((order: any) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.transaction.id}</td>
                                    <td>{order.cart?.items.map((item: any) => item.product.name).join(', ')}</td>
                                    <td>${order.cart?.total}</td>
                                    <td><a href={`/admin/order/${order._id}`} className="btn btn-sm btn-primary">Detail</a></td>
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
    const orders = await Order.find();
    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders))
        },
    }
}

export default Orders
