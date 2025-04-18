import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const scheduleSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    events: [eventSchema]
}, {
    timestamps: true
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;