import mongoose from 'mongoose';

import path from 'path';
import { uploadDirectories } from '../uploadDirectories';
import { getPath } from '../utilities/utility'
import User from './User';


const QuerySchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    description: String,
});

QuerySchema.plugin(require('mongoose-autopopulate'));
QuerySchema.set('toJSON', { virtuals: true })




export default mongoose.models.Query || mongoose.model('Query', QuerySchema)