import mongoose from "mongoose";

import env from "./environment";

const options = {
    maxIdleTimeMS: 30000,
    maxPoolSize: 10,
    minPoolSize: 2,
    waitQueueTimeoutMS: 5000,
};

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGO_URI, options);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
};
