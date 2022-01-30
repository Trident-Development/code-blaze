import mongoose from 'mongoose';


const JobSchema = mongoose.Schema ({

    language: {
        type: String,
        required: true,
    },

    filepath: {
        type: String,
        required: true,
    },

    submittedAt: {
        type: Date,
        default: Date.now,
    },

    startedAt: {
        type: Date,
    },

    completedAt: {
        type: Date,
    },

    status: {
        type: String,
        default: "pending",
        enum: ["pending", "success", "error"],
    },

    output: {
        type: String,
    },
});


module.exports = mongoose.module("job", JobSchema);