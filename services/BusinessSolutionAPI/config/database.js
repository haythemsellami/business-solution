module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    mongoose.connect(config.database, {
      promiseLibrary: global.Promise
    });
    database.on('error', error => console.log(`Connection to business solution database failed: ${error}`));
    database.on('connected', () => console.log('Connected to business solution database'));
    database.on('disconnected', () => console.log('Disconnected from business solution database'));
    process.on('SIGINT', () => {
      database.close(() => {
        console.log('business solution terminated, connection closed');
        process.exit(0);
      })
    });
  };