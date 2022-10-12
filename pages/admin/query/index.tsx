import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import Query from '../../../models/Query';
import User from '../../../models/User';


const Queries: NextPage = (props: any) => {
    useEffect(() => {
        console.log(props.queries);
    })
    return (
        <AdminLayout>
            <div className="bg-secondary text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0">Query</h6>
                </div>
                <div className="table-responsive">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-white">
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.queries.map((query: any) => (
                                <tr key={query._id}>
                                    <td>{query._id}</td>
                                    <td>{query.name}</td>
                                    <td>{query.phone}</td>
                                    <td>{query.email}</td>
                                    <td><a href={`/admin/query/${query._id}`} className="btn btn-sm btn-primary">Detail</a></td>
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
    const queries = await Query.find();
    return {
        props: {
            queries: JSON.parse(JSON.stringify(queries))
        },
    }
}

export default Queries
