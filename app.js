const express = require('express');

//------- Leave imports above ------

const app = express();
const port = 8080;

var mainRouter = require('./routes/main.routes');


app.listen(port, () => {
    console.log(`Backend app running on port ${port}`);
});

app.use('/api', mainRouter);

module.exports = app;