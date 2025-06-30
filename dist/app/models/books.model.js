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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
    },
    isbn: { type: String, unique: [true, 'isbn number is already given'], required: true, trim: true },
    description: { type: String, trim: true },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a positive number"]
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    // _id: false,
    versionKey: false,
    timestamps: true
});
bookSchema.method("deductCopies", function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.copies < quantity) {
            throw new Error("Not enough copies available");
        }
        this.copies = this.copies - quantity;
        if (this.copies === 0) {
            this.available = false;
        }
        yield this.save();
    });
});
bookSchema.post('save', function (doc, next) {
    console.log(`📘 Book "${doc.title}" saved successfully `);
    next();
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
