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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post('/create-book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield books_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: "Validation failed",
            message: error.message,
            error: {
                name: "ValidationError",
                errors: error.errors
            }
        });
    }
}));
exports.booksRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const books = await Book.find();
    let books = [];
    const filter = req.query.filter ? req.query.filter : null;
    if (filter) {
        // const sortBy = req.query.sortBy? req.query.sortBy : "createdAt";
        const sortBy = req.query.sortBy ? String(req.query.sortBy) : "createdAt";
        const sort = req.query.sort === 'desc' ? -1 : 1;
        // const sort = req.query.sort;
        // const limit = req.query.limit;
        const limit = req.query.limit ? parseInt(String(req.query.limit)) : 10;
        console.log(sortBy, sort, limit);
        books = yield books_model_1.Book.find({ genre: filter }).sort({ [sortBy]: sort }).limit(limit);
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    else {
        books = yield books_model_1.Book.find();
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
}));
exports.booksRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_model_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Book retrieve successfully",
        data: book
    });
}));
exports.booksRoutes.patch('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = yield books_model_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
}));
exports.booksRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_model_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    });
}));
