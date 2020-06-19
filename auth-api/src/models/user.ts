import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

export type UserDocument = mongoose.Document & {
    firstName: string,
    lastName: string,
    username: string,
    password: string,

    comparePassword: (candidatePassword: string) => Promise<boolean>;
};

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
}, { timestamps: true });

export interface AuthToken {
    accessToken: string;
    kind: string;
}

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        const {
            _id,
            password,
            __v,
            ...trans
        } = ret;

        return { id: doc.get('_id'), ...trans };
    },
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
    const user = this as UserDocument;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: UserDocument['comparePassword'] = function (candidatePassword: string) {
    return new Promise<boolean>((resolve: Function, reject: Function) => {
        bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
            if (isMatch) {
                return resolve(true);
            }

            resolve(false);
        });
    });
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>('User', userSchema);
