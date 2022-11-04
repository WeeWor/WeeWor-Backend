/**
 * Province.js
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
    name_th: {
      type: 'string',
      required: true
    },
    name_en: {
      type: 'string',
      required: true
    }
  },

};

