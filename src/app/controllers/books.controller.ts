import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();

booksRoutes.post('/create-book', async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const book = await Book.create(body);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })

    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            success: "Validation failed",
            message: error.message,
            error: {
                name: "ValidationError",
                errors: error.errors
            }
        })
    }
})

booksRoutes.get('/', async (req: Request, res: Response) => {
    // const books = await Book.find();

    let books = [];

    const filter= req.query.filter? req.query.filter : null;

    if (filter) {
        // const sortBy = req.query.sortBy? req.query.sortBy : "createdAt";
        const sortBy = req.query.sortBy? String(req.query.sortBy) : "createdAt";
        const sort = req.query.sort === 'desc' ? -1 : 1 ;
        // const sort = req.query.sort;
        // const limit = req.query.limit;
        const limit =req.query.limit? parseInt(String(req.query.limit)): 10;
        console.log(sortBy, sort, limit); 
        books = await Book.find({ genre  :  filter}).sort({[sortBy] : sort}).limit(limit)

        res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
        
    })
    } else {
        books = await Book.find();
        res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
        
    })
        
    }


})

booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;

    const book = await Book.findById(bookId);

    res.status(201).json({
        success: true,
        message: "Book retrieve successfully",
        data: book
    })
})

booksRoutes.patch('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;

    const updatedBody = req.body;

    const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book
    })
})


booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;

    const book = await Book.findByIdAndDelete(bookId);

    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
})