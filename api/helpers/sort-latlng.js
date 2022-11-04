module.exports = {


  friendlyName: 'Sort Latitude Longitude',


  description: '',


  inputs: {
    latitude: {
      type: 'number',
      required: true
    },
    longitute: {
      type: 'number',
      required: true
    },
    unitArray: {
      type: 'ref',
      required: true
    }
  },


  fn: async function (inputs) {
    function calculateDistance(lat1, lon1, lat2, lon2) {
      let radlat1 = Math.PI * lat1/180;
      let radlat2 = Math.PI * lat2/180;
      let theta = lon1-lon2;
      let radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344; // Convert to KM unit.
      return dist
    }

    let arr = inputs.unitArray;
    for (let i = 0; i < arr.length; i++) {
      arr[i]["distance"] = calculateDistance(inputs.latitude, inputs.longitute, arr[i]["latitude"], arr[i]["longitude"]).toFixed(2);
    }

    arr.sort(function(a, b) {
      return a.distance - b.distance;
    });

    return arr;
  }


};

