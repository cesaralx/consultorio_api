const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

let database = null;

async function startDatabase() {
  mongoose.set('useFindAndModify', false); //permite modificar usando el comando find
    // const connection = await MongoClient.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
    const connection = await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true,  useCreateIndex: true,}, function (err) {
      if (err) throw err;
      console.log('Successfully connected to DB')
    });
    database = mongoose.connection;
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};