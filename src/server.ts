import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
import dotenv from "dotenv";

let server: Server;

const port = 5000;

dotenv.config();

async function main() {
    try {

        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nyu5b.mongodb.net/library-app?retryWrites=true&w=majority&appName=Cluster0`);

        // console.log(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nyu5b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

        // await mongoose.connect('mongodb+srv://libraryMaster:fWMyDHXDVmO1bAzp@cluster0.nyu5b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to mongodb using mongooes");
        server = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    } catch (error) {
        console.log(error);
    }
}

main();