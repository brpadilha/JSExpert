const https = require('https');
const Planet = require('./planet')
// swap.dev/api/planets/1/

class Service {
  async makeRequest(url){
    return new Promise((resolve, reject)=>{
      https.get(url, response =>{
        response.on('data', data=> resolve(JSON.parse(data)))
        response.on('error', reject)
      })
    })
  }

  async getPlanets(url){
    const response = await this.makeRequest(url)

    return new Planet({
      name: response.name,
      surfaceWater: response.surface_water,
      appearedIn: response.films.length
    })
  }
}

module.exports = Service



