const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});

module.exports = mongoose.connection;


//mongodb+srv://kayceheap:<password>@cluster0.0s71y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority