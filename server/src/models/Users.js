import mongoose from 'mongoose';

// Creating a schema, sort of like working with an ORM
const UserSchema = new mongoose.Schema({
    username : { type: String, required: true, unique: true },
    password : { type: String, required: true },
});

// Creating a collection within database with the defined schema
const UserModel = mongoose.model('users', UserSchema);