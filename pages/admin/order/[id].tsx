import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import User from '../../../models/User';


const OrderDetails: NextPage = (props: any) => {


    return (
        <AdminLayout>
            <>

                <div className="">
                    <div className="bg-secondary rounded h-100 p-4">
                        <h6 className="mb-4">Order details</h6>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Id</th>
                                    <td>{props.order._id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Total</th>
                                    <td>${props.order.cart.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-3">
                    <div className="bg-secondary rounded h-100 p-4">
                        <h6 className="mb-4">Address</h6>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">First name</th>
                                    <td>{props.order.address.firstname}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last name</th>
                                    <td>{props.order.address.lastname}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>{props.order.address.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Mobile</th>
                                    <td>{props.order.address.mobile}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Address</th>
                                    <td>{props.order.address.address}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Country</th>
                                    <td>{props.order.address.country}</td>
                                </tr>
                                <tr>
                                    <th scope="row">City</th>
                                    <td>{props.order.address.city}</td>
                                </tr>
                                <tr>
                                    <th scope="row">State</th>
                                    <td>{props.order.address.state}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Zip</th>
                                    <td>{props.order.address.zip}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-secondary text-center rounded p-4 mt-3">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Products</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col">User</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.order.cart.items.map((item: any) => (
                                    <tr key={item._id}>
                                        <td><a className='text-blue-800 hover:underline' href={`/admin/user/${props.order.user.id}`}>{props.order.user.firstname}</a></td>
                                        <td>{item.product.name}</td>
                                        <td>${item.product.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.sub_total}</td>
                                    </tr>
                                ))}
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
    const order = await Order.findById(context.query.id);
    return {
        props: {
            order: JSON.parse(JSON.stringify(order))
        },
    }
}

export default OrderDetails
