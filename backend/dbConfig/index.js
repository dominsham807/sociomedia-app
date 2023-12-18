import mongoose from "mongoose";

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("DB connected successfully")
    } catch(err){
        console.log("DB error: "+err)
    }
}

export default dbConnection