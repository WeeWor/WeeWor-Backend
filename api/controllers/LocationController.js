/**
 * LocationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

module.exports = {
  address: async function (req, res, next) {
    const { latitude, longitude } = req.body;
    if (!(latitude && longitude)) {
      return res.status(400).json({
        message: '400 Bad Request'
      });
    }

    let data = await (await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_API}&result_type=plus_code`)).data;
    return res.json({plus_code: data.plus_code.compound_code});
  }
};

