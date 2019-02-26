const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
//const logger = require('./middleware/logger');
const students = require('./students');

const PORT = process.env.PORT || 3000;


//init middleware
//app.use(logger);


// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Student Account',
    students
  })
);

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// api Routes
app.use('/api/students', require('./routes/api/students'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));