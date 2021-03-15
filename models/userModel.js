const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require: true
    },   
    email:{
        type:String,
        require:true,
        unique:true
    },   
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        required: true
        
    },    
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
},{timestamps:true});
module.exports = mongoose.model('User', userSchema)