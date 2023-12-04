const Service = require('./service')
const sinon = require('sinon')
const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'
const {deepStrictEqual} = require('assert')

const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderaan: require('./mocks/alderaan.json')
}

;(async () => {
  // Essa forma vai para a internet fazer requisição e não é o ideal, caso a api pare de funcionar
  const service = new Service()
  // nao podemos fazer com que os testes falhem

  // const withoutSut = await service.makeRequest(BASE_URL_2)
  // console.log(JSON.stringify(withoutSut))


  // mockando o retorno da api para que o sinon retorne simulando a api externa

  const stub = sinon.stub(service, service.makeRequest.name)
  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine)

  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan)

  {
    const response = await service.makeRequest(BASE_URL_1)
  }
  {
    const expect = {
      "name": "Tatooine",
      "surfaceWater": '1',
      appearedIn: 5
    }
    
    const response = await service.getPlanets(BASE_URL_1)
    deepStrictEqual(JSON.stringify(response), JSON.stringify(expect))
  }
  {
    const expect = {
      name: 'Alderaan',
      surfaceWater: '40',
      appearedIn: 2
    }

    const response = await service.getPlanets(BASE_URL_2)
    deepStrictEqual(JSON.stringify(response), JSON.stringify(expect))
  }
})();
