import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    rollno: {
        type: Number,
        required: true,
        unique: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is Invalid Roll Number'
        }
    },  
    password: {
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    choice1: {
        type: String,
        required: true,
    },
    choice2: {
        type: String,
        required: true,
    },
    choice3: {
        type: String,
        required: true,
    },
    choice4: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const Register = mongoose.model("Register", courseSchema);
export default Register;