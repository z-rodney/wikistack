const express = require('express');
const app = express();
const db = require('./models');

const morgan = require('morgan')
app.use(morgan('dev'))

app.use(express.static(__dirname + "/public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
const methodOverride = require("method-override")
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'))
*/
db.db.authenticate().
then(() => {
  console.log('connected to the database');
});
const syncDb = async () => {
  const user = await db.User.sync({force: true});
  const page = await db.Page.sync({force: true});
}
syncDb();

const index = require('./views/index')

app.get('/', (req, res, next) => {
    try {
        res.send(index.main(''))
    }
    catch (err) { next(err) }
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
