// DB Connection
var mongoose = require('mongoose');
//connect(mongodb://user:pass@localhost:port/database)
mongoose.connect('mongodb://localhost/test');
exports = module.exports = mongoose;