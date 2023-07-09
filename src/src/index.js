const express = require('express');
const routes = require('./routes');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {authentication} = require('./middlewares/authMIddleware');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authentication);
app.use(routes);


mongoose.connect('mongodb://127.0.0.1:27017/frendly_world');


app.listen(3000, () => console.log('Server is runnig on port 3000...'));