import mongoose from 'mongoose'

import dotenv from 'dotenv';
dotenv.config();

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log("Missing mongodb url");

    // if(isConnected) {
    //     return console.log("MongoDB is already connected");
    // }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "connectcraft",
        })

        isConnected = true;
        // console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log("Error connecting mongoDB" , error);
    }
}