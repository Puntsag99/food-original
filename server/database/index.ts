import { connect } from "mongoose";

export const connectDataBase = async () => {
  const dbConnectionString = process.env.MONGODB_CONNECT_STRING;

  if (!dbConnectionString) throw new Error("Failed to connect the MongoDB");

  try {
    await connect(dbConnectionString);
    console.log("Successfully connected to the MongoDB");
  } catch (error) {
    console.error(error instanceof Error && error.message);
  }
};
