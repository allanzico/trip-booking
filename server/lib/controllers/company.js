"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyClass = void 0;
const Company_1 = __importDefault(require("../models/Company"));
class CompanyClass {
    async registerCompany(req, res) {
        const { email, companyName, companyUrl, address, coordinates, position } = req.body;
        const registeredBy = req.user._id;
        const location = address;
        try {
            const company = await Company_1.default.create({
                email,
                companyName,
                companyUrl,
                location,
                coordinates,
                position,
                registeredBy,
            });
            res.status(201).json({ success: true, company });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({
                error,
            });
        }
    }
    async getCompany(req, res) {
        try {
            const userCompany = await Company_1.default.find({ registeredBy: req.user._id })
                .populate("registeredBy", "_id name")
                .exec();
            res.json(userCompany);
        }
        catch (error) {
            console.log(error);
        }
    }
    async isAlreadyRegistered(req, res) {
        const registeredBy = req.user._id;
        const companies = await Company_1.default.find({})
            .exec();
        //check if ID exists in companies array
        let ids = [];
        for (let i = 0; i < companies.length; i++) {
            ids.push(companies[i].registeredBy.toString());
        }
        res.json({
            ok: ids.includes(registeredBy),
        });
    }
}
exports.CompanyClass = CompanyClass;
