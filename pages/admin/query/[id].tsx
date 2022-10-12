import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import Query from '../../../models/Query';
import User from '../../../models/User';


const QueryDetails: NextPage = (props: any) => {


    return (
        <AdminLayout>
            <>
                <div className="">
                    <div className="bg-secondary rounded h-100 p-4">
                        <h6 className="mb-4">Query details</h6>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Id</th>
                                    <td>{props.query._id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{props.query.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Phone</th>
                                    <td>{props.query.phone}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>{props.query.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Description</th>
                                    <td>{props.query.description}</td>
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
    const query = await Query.findById(context.query.id);
    return {
        props: {
            query: JSON.parse(JSON.stringify(query))
        },
    }
}

export default QueryDetails
