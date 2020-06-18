import mongoose from 'mongoose';

export type StarDocument = mongoose.Document & {
    restaurantId: string,
    star: number,
};

const starSchema = new mongoose.Schema({
    restaurantId: String,
    star: Number,
});

starSchema.set('toJSON', {
    transform: (doc, ret) => {
        const {
            _id,
            __v,
            ...trans
        } = ret;

        return { id: doc.get('_id'), ...trans };
    },
});

export const Star = mongoose.model<StarDocument>('Star', starSchema);
