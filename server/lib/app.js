"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const Experience_1 = __importDefault(require("./models/Experience"));
var cron = require('node-cron');
const today = new Date();
dotenv_1.default.config();
const app = (0, express_1.default)();
const dirPath = path_1.default.resolve(__dirname, './routes');
//append  client to server - required bt Github actions
app.use(express_1.default.static(path_1.default.join(__dirname, '/client/build')));
const errorHandler = require('./middlewares/error');
//middlewares
app.use((0, cors_1.default)({}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
//route middleware
fs_1.default.readdirSync(dirPath).map((r) => app.use('/api', require(`${dirPath}/${r}`)));
//Date cronjob
cron.schedule('0 0 0 * * *', async () => {
    try {
        const experiences = await Experience_1.default.find({});
        experiences.map(exp => {
            if (today > new Date(exp.endDate)) {
                exp.isActive = false;
                exp.save();
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
//Error Middleware should always be last 
app.use(errorHandler);
//Database Connection
const mongoUrl = (_a = process.env) === null || _a === void 0 ? void 0 : _a['MONGO_URI'];
mongoose_1.default.connect(mongoUrl)
    .then(() => console.log('connected to database'))
    .catch((error) => console.log('database connection failed', error));
//server connection
const port = ((_b = process.env) === null || _b === void 0 ? void 0 : _b['PORT']) || 5000;
const server = app.listen(port, () => console.log(`Server running on port ${port}`));
process.on("unhandledRejection", (err) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
