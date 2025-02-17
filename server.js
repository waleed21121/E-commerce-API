const PORT = process.env.PORT;

const app = require('./app');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});