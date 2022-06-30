import Company from "../models/Company";

export class CompanyClass {
  async registerCompany(req: any, res: any) {
    const { email, companyName, companyUrl, address, coordinates, position } = req.body;
    const registeredBy = req.user._id;
    const location = address
    try {
      const company = await Company.create({
        email,
        companyName,
        companyUrl,
        location,
        coordinates,
        position,
        registeredBy,
      });
      res.status(201).json({ success: true, company });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  }

  async getCompany(req: any, res: any) {
    try {
      const userCompany = await Company.find({ registeredBy: req.user._id })
        .populate("registeredBy", "_id name")
        .exec();
      res.json(userCompany);
    } catch (error) {
      console.log(error);
    }
  }

  async isAlreadyRegistered(req: any, res: any) {
    const registeredBy = req.user._id;
    const companies = await Company.find({})
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
