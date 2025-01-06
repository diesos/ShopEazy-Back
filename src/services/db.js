// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();

// /**
//  * @class Database
//  * @description Singleton class to manage database connection using Mongoose.
//  *
//  * @method static getInstance
//  * @description Returns the single instance of the Database class. If the instance does not exist, it creates one.
//  * @returns the single instance of the Database class.
//  *
//  * @method static disconnect
//  * @description Disconnects from the database.
//  * @returns a promise that resolves when the database is disconnected.
//  */
// class Database {
//   static _database;

//   constructor() {
//     const dbUrl = process.env.MONGO_URL;
//     if (dbUrl) {
//       try {
//         mongoose.connect(dbUrl);
//         console.log("Connected to database");
//       } catch (error) {
//         console.log("Error with database connection");
//       }
//     }
//   }

//   // Static method to get the instance
//   static getInstance() {
//     if (!this._database) return (this._database = new Database());
//     return this._database;
//   }

//   // Method to disconnect from the database
//   static async disconnect() {
//     try {
//       await mongoose.disconnect();
//       console.log("Disconnected from the database");
//     } catch (error) {
//       console.log("Error disconnecting from the database", error);
//     }
//   }
// }

// module.exports = Database;
