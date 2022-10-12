// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose, { MongooseError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import withAuth, { NextApiRequestWithAuth } from '../../../middlewares/withAuth'
import Cart from '../../../models/Cart'
import CartItem from '../../../models/CartItem'
import Query from '../../../models/Query'
import Review from '../../../models/Review'
import Team from '../../../models/Team'
import User from '../../../models/User'

const handler = async (req: NextApiRequestWithAuth, res: NextApiResponse<any>) => {
    const { method } = req

    const productId = req.query.productId;

    await dbConnect();
    switch (method) {

        case 'POST':
            try {
                Cart; CartItem;
                const query = await Query.create({
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    description: req.body.description,
                })
                return res.send({ query });
            }
            catch (err: any) {
                console.log(err.code);
                return res.status(400).json({
                    message: err.toString()
                })
            }
            break

        default:
            return res.status(400).json({ success: false });
    }
}
export default withAuth(handler);