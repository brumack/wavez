const request = require('request')

const getWeather = function(lat, lon, callback) {
    
    const options = {
        url: `https://api.weather.gov/points/${lat},${lon}`,
        headers: {
            'User-Agent': `wavesdemoappbrumack`,
            Accept: `application/vnd.noaa.dwml+xml;version=1`
        }
    }
    
    request(options, (err, res, body) => {
        if(err) {
            console.log(err)
        } else {
            let data;
            try {
                data = JSON.parse(body)
                
                if (data.properties.forecast) {
                    console.log(data.properties.forecast)
                    options.url = data.properties.forecast
                    
                    request(options, (err, res, body) => {
                        if (err) {
                            console.log(data)
                            callback(err)
                        } else {
                            const conditions = JSON.parse(body).properties.periods[0]
                            if (conditions) {
                                callback(null, conditions)
                            } else {
                                callback(conditions)
                            }
                        }
                    })
                } else {
                    callback('No forecast')
                }
                
            } catch(e) {
                callback(err)
            }
        }
    })
}

module.exports = getWeather