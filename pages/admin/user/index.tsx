import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';


const Users: NextPage = (props: any) => {
    return (
        <AdminLayout>

            <div className="bg-secondary text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0">Users</h6>
                    {/* <a href="">Show All</a> */}
                </div>
                <div className="table-responsive">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-white">
                                <th scope="col">Id</th>
                                <th scope="col">First name</th>
                                <th scope="col">Last name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.users.map((user: any) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{ user.firstname}</td>
                                    <td>{ user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td><a href={`/admin/user/${user._id}`} className="btn btn-sm btn-primary">Detail</a></td>
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
    const users = await User.find();
    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        },
    }
}

export default Users
