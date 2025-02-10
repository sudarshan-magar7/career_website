const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    birthDate: { 
        type: Date, 
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default : Date.now
    }
  });




  const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    careerPreferences: {
        desiredRoles: [String],
        industries: [String],
        jobLocationPreferences: [String]
    },
    currentSkills: {
        programmingLanguages: [String],
        frameworks: [String],
        softSkills: [String]
    },
    qualifications: {
        education: String,
        certifications: [String]
    },
    workExperience: [
        {
            company: String,
            role: String,
            duration: String
        }
    ],
    goals: {
        shortTerm: String,
        longTerm: String
    },
    studentDetails: {
        university: String,
        graduationYear: Number,
        projects: [String],
        extracurriculars: [String]
    }
});


const ResumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    filename: String,
    skills: [String]
});

// Mongoose Model
const UserResume = mongoose.model('UserResume', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    filename: String,
    filePath: String,
    skills: [String],
    education: String,
    experience: String
}));


  const User = mongoose.model('User',UserSchema);
  const Profile=mongoose.model('Profile',ProfileSchema);
  const Resume = mongoose.model("Resume", ResumeSchema);

  module.exports = {User,Profile,Resume,UserResume};