import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Team from '../../../models/Team';
import User from '../../../models/User';
import team from '../../api/team';


const UserDetails: NextPage = (props: any) => {


    return (
        <AdminLayout>
            <>
                <div className="">
                    <div className="bg-secondary rounded h-100 p-4">
                        <h6 className="mb-4">User details</h6>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Id</th>
                                    <td>{props.user._id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">First name</th>
                                    <td>{props.user.firstname}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>{props.user.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bio</th>
                                    <td>{props.user.bio}</td>
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
    const user = await User.findById(context.query.id);
    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        },
    }
}

export default UserDetails
