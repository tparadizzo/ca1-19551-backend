const express = require('express')
const app = express ()
const {MongoClient, Object} = require("mongodb");

// url to connect to the database
const url = "mongodb+srv://admin:bikeapp@cluster0.yla8y.mongodb.net/bikeapp?retryWrites=true&w=majority"
const client = new MongoClient(url, {useUnifiedTopology: true});

// Database used
const dbName = "bikeapp";

// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extended: false}))

async function run(){
    try{
        await client.connect();
        console.log("Connected");
        const database = client.db(dbName);

        // Using the collection "bikeapp"
        const collection = database.collection("bikeapp");

        // Document in the database
        let bike1 = {
            "brand" : "martello",
            "color" : "blue",
            "bikeGear" : 5,
            "stock" : false
        }

        let bike2 = {
            "brand" : "crazybike",
            "color" : "black",
            "bikeGear" : 12,
            "stock" : true
        }

        let bike3 = {
            "brand" : "finebike",
            "color" : "pink",
            "bikeGear" : 7,
            "stock" : true
        }

        let bike4 = {
            "brand" : "truebike",
            "color" : "white",
            "bikeGear" : 10,
            "stock" : true
        }

        // To check the objects in database in the console
        // console.log(bike);

        // Add a new document in the database
        await collection.insertOne(bike1);
        await collection.insertOne(bike2);
        await collection.insertOne(bike3);
        await collection.insertOne(bike4);

        // Delete a document from the database
        const deletedBike = await collection.deleteOne(bike1);
        const deletedBike = await collection.deleteOne(bike2);
        const deletedBike = await collection.deleteOne(bike3);
        const deletedBike = await collection.deleteOne(bike4);

        // Delete more than one item in the database
        await collection.deleteMany({color: "black"});

        // Create a filter for bike to update
        const filter = {bikeGear:"5"}

        // Change the information to a new one. Update it as you set it up.
        const updateDoc = {$set :
            {brand:"martello", color:"black", stock:"false"}
        }

        const options = {upsert: true}
        await collection.updateOne(filter,updateDoc)

        // Find a object in the database
        const foundBike = await collection.findOne({brand:"martello"})


    } catch(err) {

        console.log(err.stack);

    } finally {

        await client.close();
    }
}

run().catch(console.dir);

