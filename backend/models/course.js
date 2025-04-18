import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },

    category: {
        type: String,
    },

    description: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const Course = mongoose.model("Course", courseSchema);
export default Course;