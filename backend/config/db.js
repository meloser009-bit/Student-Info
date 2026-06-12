import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const localMongoURI = 'mongodb://test:test@ac-akzrjel-shard-00-00.5jbpuuf.mongodb.net:27017,ac-akzrjel-shard-00-01.5jbpuuf.mongodb.net:27017,ac-akzrjel-shard-00-02.5jbpuuf.mongodb.net:27017/StudentInfo?ssl=true&replicaSet=atlas-qsccp1-shard-0&authSource=admin&appName=Cluster0';
    const conn = await mongoose.connect(localMongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1); 
  }
};

export default connectDB;