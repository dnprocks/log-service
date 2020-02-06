const express = require('express');

const app = express();
const routes = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.get("/", (req, res) => {
   return res.send('API de logs beta!')
})

app.listen(process.env.PORT || 3000);