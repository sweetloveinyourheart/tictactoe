"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./routers"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 9000;
const url = process.env.DATABASE_URL || "";
mongoose_1.default.connect(url, { autoIndex: true }, (err) => {
    if (err)
        console.log(err);
    console.log("Database connect successfully !");
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/", routers_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=index.js.map