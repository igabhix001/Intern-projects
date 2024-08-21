import mongoose  from "mongoose";


mongoose.connect("mongodb+srv://igabhix0001:8eRyvs5LiBSVwWhp@cluster0.pba1uhh.mongodb.net/paytm-app")

const userSchema = new mongoose.Schema({
    username: String,
    password: { type: String, },
    firstName: String,
    lastName: String,
    })

const accountSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'user',required:true},
    balance : {type:Number,required:true}
})

export const Account = mongoose.model('Account', accountSchema);

export  const User = mongoose.model("User", userSchema)

