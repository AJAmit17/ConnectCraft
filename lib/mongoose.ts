import mongoose from 'mongoose'

import dotenv from 'dotenv';
dotenv.config();

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log("Missing mongodb url");

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "connectcraft",
        })
        // console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log("Error connecting mongoDB" , error);
    }
}