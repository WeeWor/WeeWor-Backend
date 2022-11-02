/**
 * District.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    keyId: {
      type: 'number',
      required: true,
      unique: true
    },
    name: {
      type: 'string',
      required: true
    },
    province_id: {
      type: 'number',
      required: true,
    }
  },

};

