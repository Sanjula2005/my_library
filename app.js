import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import booksRouter from './routes/books.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout'); // layout.ejs will be used

// Routes
app.get('/', (req, res) => res.redirect('/books'));
app.use('/books', booksRouter);

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
