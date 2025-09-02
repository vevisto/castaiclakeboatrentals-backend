import mongoose from 'mongoose';
import DistrictModel from './models/address/District.model.js';
import MunicipalityModel from './models/address/Municipality.model.js';
import ProvinceModel from './models/address/Province.model.js';
import WardModel from './models/address/Ward.model.js';
import dotenv from "dotenv";
import fs from 'fs';
const raw = fs.readFileSync('./data/english.address.json', 'utf-8');
const data = JSON.parse(raw);
dotenv.config();

await mongoose.connect((process.env.MONGO_URI));

console.log('Seeding started');

await Promise.all([
  ProvinceModel.deleteMany(),
  DistrictModel.deleteMany(),
  MunicipalityModel.deleteMany(),
  WardModel.deleteMany(),
]);

for (const [provName, districts] of Object.entries(data)) {
  const provDoc = await ProvinceModel.create({ name: provName });

  for (const [distName, munis] of Object.entries(districts)) {
    const distDoc = await DistrictModel.create({ name: distName, province: provDoc._id });

    for (const [muniName, wards] of Object.entries(munis)) {
      const muniDoc = await MunicipalityModel.create({ name: muniName, district: distDoc._id });

      const wardDocs = wards.map(w => ({
        number: parseInt(w.replace(/\D/g, ''), 10),
        municipality: muniDoc._id,
      }));

      await WardModel.insertMany(wardDocs);
    }
  }
}

console.log('Seeding finished');
process.exit();
