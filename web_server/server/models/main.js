const mongoose = require('mongoose');

// config mongoose
module.exports.connect = (uri) => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.connect(uri);

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error: %{err}');
    process.exit(1);
  });

  // load models
  require('./user');
};
