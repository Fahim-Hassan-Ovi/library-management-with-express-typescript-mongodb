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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
let server;
const port = 5000;
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nyu5b.mongodb.net/library-app?retryWrites=true&w=majority&appName=Cluster0`);
            // console.log(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nyu5b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
            // await mongoose.connect('mongodb+srv://libraryMaster:fWMyDHXDVmO1bAzp@cluster0.nyu5b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
            console.log("Connected to mongodb using mongooes");
            server = app_1.default.listen(port, () => {
                console.log(`Example app listening on port ${port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
