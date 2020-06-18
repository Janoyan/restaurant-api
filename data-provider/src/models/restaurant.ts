import mongoose from 'mongoose';

export type RestaurantDocument = mongoose.Document & {
    title: string,
    description: string,
    photo: string,
    rating: number,
};

const restaurantSchema = new mongoose.Schema({
    title: String,
    description: String,
    photo: String,
    rating: {
        type: Number,
        default: 0
    }
});

restaurantSchema.set('toJSON', {
    transform: (doc, ret) => {
        const {
            _id,
            __v,
            ...trans
        } = ret;

        return { id: doc.get('_id'), ...trans };
    },
});
export const Restaurant = mongoose.model<RestaurantDocument>('Restaurant', restaurantSchema);
