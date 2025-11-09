import mongoose from 'mongoose';
const HostelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  location: { type: String, required: true },
  type: { type: String, required: true, default:"mixed" },
  price:{type:Number, required:true},
  shuttle:{type:Boolean,required:true},
  comment:{type: String , default:"Very good hostel"},
},
{timestamps:true});

export default mongoose.model("hostel",HostelSchema)