const mongoose = require("mongoose");
const port = 3000;
const app = require("./app");
//mongoose.connect('mongodb://localhost/testaroo', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// mongoose.connection.once('open', () =>{
//     console.log('connection established')
// }).on('connectionError',(err) =>{
//     console.log(err);
// })

mongoose
  .connect("mongodb://127.0.0.1:27017/mario")
  .then((res) => {
    console.log("Connected to mongo DB successfully!", port);
  })
  .catch((err) => {
    console.log("Connection to DB failed!", err);
  });

app.listen(port, () => console.log(`App listening on port ${port}!`));
