import express from 'express';
import pool from '../db.js';
const router = express.Router();

// Show all books
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books ORDER BY id ASC');
        res.render('books/index', { books: result.rows });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// New book form
router.get('/new', (req, res) => {
    res.render('books/new');
});

// Create book
router.post('/', async (req, res) => {
    const { title, author, genre, published_date, description } = req.body;
    try {
        await pool.query(
            'INSERT INTO books (title, author, genre, published_date, description) VALUES ($1, $2, $3, $4, $5)',
            [title, author, genre, published_date || null, description]
        );
        res.redirect('/books');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Edit book form
router.get('/:id/edit', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
        res.render('books/edit', { book: result.rows[0] });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update book
router.post('/:id', async (req, res) => {
    const { title, author, genre, published_date, description } = req.body;
    try {
        await pool.query(
            'UPDATE books SET title=$1, author=$2, genre=$3, published_date=$4, description=$5 WHERE id=$6',
            [title, author, genre, published_date || null, description, req.params.id]
        );
        res.redirect('/books');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete book
router.post('/:id/delete', async (req, res) => {
    try {
        await pool.query('DELETE FROM books WHERE id=$1', [req.params.id]);
        res.redirect('/books');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
