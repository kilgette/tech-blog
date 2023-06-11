// required packages
const Sequelize = require("sequelize");
require("dotenv").config();


let sequelize;

// Check if the JAWSDB_URL environment variable is set
if (process.env.JAWSDB_URL) {
  // Connect to the JAWSDB_URL if available
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Otherwise, connect to the local MySQL database
  sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
      host: "localhost", 
      dialect: "mysql", 
      port: 3306, 
    }
  );
}

// Export the Sequelize instance for database operations
module.exports = sequelize;