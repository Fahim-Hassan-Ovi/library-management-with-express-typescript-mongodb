"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const books_model_1 = require("../models/books.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const quantity = req.body.quantity;
        const bookId = req.body.book;
        // console.log(bookId);
        // const book = await Book.findOne({ isbn: bookId });
        const book = yield books_model_1.Book.findById(bookId);
        console.log(book);
        if (!book) {
            res.status(404).json({ success: false, message: "Book not found" });
        }
        else {
            yield book.deductCopies(quantity);
            const borrow = yield borrow_model_1.Borrow.create(body);
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrow
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: "ValidationError",
                errors: error.errors
            }
        });
    }
}));
exports.borrowRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookSummery = yield borrow_model_1.Borrow.aggregate([
            // step-1
            {
                $addFields: {
                    bookObjectId: { $toObjectId: "$book" }
                }
            },
            // step-1
            {
                $group: {
                    _id: "$bookObjectId",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            // step-2
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
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
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: bookSummery,
        });
        console.log(bookSummery);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}));
