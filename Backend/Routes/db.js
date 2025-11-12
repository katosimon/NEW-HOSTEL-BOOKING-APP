import mongoose from 'mongoose';

export const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.mongourl);
    console.log('CONNECTED SUCCESFULLY 😁');
  } catch (error) {
    console.log('ERROR CONNECTING TO DATABASE 😒', Error);
  }
};

