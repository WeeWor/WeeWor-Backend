/**
 * EmergencyUnit.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    service: {
      type: 'string',
      isIn: ['police', 'fire_department', 'medical'],
      required: true
    },
    phone: {
      type: 'string'
    },
    address: {
      type: 'string',
      required: true
    },
    province_id: {
      type: 'number',
      required: true
    },
    district_id: {
      type: 'number',
      required: true
    },
    latitude: {
      type: 'number',
      required: true
    },
    longitude: {
      type: 'number',
      required: true
    }
  },

};

