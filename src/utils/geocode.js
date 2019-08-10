request = require('request')

const geoCode = (address, callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYmVzdGxpbiIsImEiOiJjanl2ZWdrYzgwbXhtM25tZDE0Z3JmM3p2In0.bisXuotwAPmN_qFvxBXXnA'
    request({
            url: geoCodeUrl,
            json: true
        },
        (error, {body}) => {
            if(error){
                callback('Unable to connect to location service!', undefined)
            } else if(body.features.length === 0){
                callback('Invalid location. Try another search', undefined)
            } else {
                const direction = body.features[0].center
                callback(undefined,{
                        latitude : direction[1],
                        longitude: direction[0],
                        location: body.features[0].place_name
                    }
                )
            }
        }
    )
}

module.exports=geoCode