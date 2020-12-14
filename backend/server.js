const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


const ParentRouter = require('./routes/parent');
const ChildRouter = require('./routes/child');

app.use('/parent', ParentRouter);
app.use('/child', ChildRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});