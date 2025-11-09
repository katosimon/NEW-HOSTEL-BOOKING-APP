import mongoose from 'mongoose';

export const DbConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/HOSTEL');
    console.log('CONNECTED SUCCESFULLY 😁');
  } catch (error) {
    console.log('ERROR CONNECTING TO DATABASE 😒', Error);
  }
};
