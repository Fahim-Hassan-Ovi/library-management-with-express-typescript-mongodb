import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/books.model";

export const borrowRoutes = express.Router();

borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const quantity = req.body.quantity;

        const bookId = req.body.book;

        // console.log(bookId);

        // const book = await Book.findOne({ isbn: bookId });
        const book = await Book.findById(bookId);

        console.log(book);

        if (!book) {
            res.status(404).json({ success: false, message: "Book not found" });
        }

        else {
            await book.deductCopies(quantity);

            const borrow = await Borrow.create(body);

            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrow
            })
        }

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

borrowRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const bookSummery = await Borrow.aggregate([
            // step-1
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            // step-2
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "isbn",
                    as: "bookInfo"
                }
            },
            // step-4
            {
                $unwind: "$bookInfo"
            },
            // step-3
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: bookSummery,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
})