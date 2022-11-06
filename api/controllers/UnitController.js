/**
 * UnitController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const axios = require('axios');

module.exports = {
  nearby: async function (req, res, next) {
    const { latitude, longitude } = req.body;
    if (!(latitude && longitude)) {
      return res.status(400).json({
        message: '400 Bad Request'
      });
    }
    let data = await (await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_API}&result_type=administrative_area_level_1`)).data;
    let province = data.results[0].address_components[0].long_name;
    //let province = "Pathum Thani";

    let province_id = await sails.models.province.findOne({name_en: province});
    let units = await sails.models.emergencyunit.find({
      where: {province_id: province_id.keyId},
      select: ['name', 'service', 'province_id', 'district_id', 'latitude', 'longitude']
    });

    units = await sails.helpers.sortLatlng(latitude, longitude, units);
    units = units.slice(0, 15);

    return res.json(units);
  },

  search: async function (req, res, next) {
    const { latitude, longitude, search, unit, province, district } = req.body;
    if (!(latitude && longitude)) {
      return res.status(400).json({
        message: '400 Bad Request'
      });
    }

    let whereFilter = {
      ...(search) && {name: { contains: search }},
      ...(unit) && {service: unit},
      ...(province) && {province_id: province},
      ...(district) && {district_id: district}
    }

    let units = await sails.models.emergencyunit.find({
      where: whereFilter,
      select: ['name', 'service', 'province_id', 'district_id', 'latitude', 'longitude']
    });

    units = await sails.helpers.sortLatlng(latitude, longitude, units);
    units = units.slice(0, 15);

    return res.json(units);
  },

  detail: async function (req, res, next) {
    let units = await sails.models.emergencyunit.findOne({
      where: {id: req.param('id')},
      select: ['name', 'service', 'phone', 'address', 'province_id', 'district_id', 'latitude', 'longitude']
    });

    return res.json(units);
  }
};

