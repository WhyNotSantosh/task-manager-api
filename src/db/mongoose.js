const mongoose = require('mongoose')

//mongoose.connect('mongodb://localhost:27017/task-manager-api')
mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true })
