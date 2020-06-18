import mongoose from 'mongoose';
import { RestaurantDocument } from './restaurant';

export type CommentDocument = mongoose.Document & {
    text: string,
    star: number,
    visitDate: Date,
    owner: object,
    restaurant: string | RestaurantDocument
};

const commentSchema = new mongoose.Schema({
    text: String,
    star: Number,
    visitDate: Date,
    owner: mongoose.Schema.Types.Mixed,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
});

commentSchema.set('toJSON', {
    transform: (doc, ret) => {
        const {
            _id,
            __v,
            ...trans
        } = ret;

        return { id: doc.get('_id'), ...trans };
    },
});

export const Comment = mongoose.model<CommentDocument>('Comment', commentSchema);
