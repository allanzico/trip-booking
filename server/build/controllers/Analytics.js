"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsClass = void 0;
const analytics_node_1 = __importDefault(require("analytics-node"));
class AnalyticsClass {
    async getAnalytics() {
        var _a;
        var analyticsKey = (_a = process.env) === null || _a === void 0 ? void 0 : _a['TWILIO_ANALYTICS_KEY'];
        var analytics = new analytics_node_1.default(analyticsKey);
        return analytics.identify({
            userId: '62cd2b469858343d72f2ee89',
            traits: {
                name: 'Allan Akanyijuka',
                email: 'test@gmail.com',
            }
        });
    }
}
exports.AnalyticsClass = AnalyticsClass;
