/* eslint-disable no-undef */
const nock = require('nock')
const ContaAzul = require('../../src/index')
const client = new ContaAzul({
  accessToken: 'accessToken'
})

describe('Service', () => {
  it('should create service', async () => {
    nock('https://api.contaazul.com/v1').post('/services', {
      name: 'Fix car engine',
      value: 100,
      cost: 80,
      code: 'FIX-ENG-001'
    }).reply(201, {})
    const response = await client.services.create({
      name: 'Fix car engine',
      value: 100,
      cost: 80,
      code: 'FIX-ENG-001'
    })
    expect(response.status).toBe(201)
  })

  it('should update service', async () => {
    nock('https://api.contaazul.com/v1').put('/services/197e9028-cb31-4fb1-8425-6fd54ec788ac', {
      name: 'Fix car engine',
      value: 100,
      cost: 80,
      code: 'FIX-ENG-001'
    }).reply(200, {})
    const response = await client.services.update('197e9028-cb31-4fb1-8425-6fd54ec788ac', {
      name: 'Fix car engine',
      value: 100,
      cost: 80,
      code: 'FIX-ENG-001'
    })
    expect(response.status).toBe(200)
  })

  it('should get service', async () => {
    nock('https://api.contaazul.com/v1').get('/services/6dafd126-be9b-4b58-934f-f2137c1f6489').reply(200, {})
    const response = await client.services.get('6dafd126-be9b-4b58-934f-f2137c1f6489')
    expect(response.status).toBe(200)
  })

  it('should list services', async () => {
    nock('https://api.contaazul.com/v1').get('/services').reply(200, {})
    const response = await client.services.list()
    expect(response.status).toBe(200)
  })

  it('should list services by name', async () => {
    nock('https://api.contaazul.com/v1').get('/services').query({
      name: 'Fix car engine'
    }).reply(200, {})
    const response = await client.services.list({
      name: 'Fix car engine'
    })
    expect(response.status).toBe(200)
  })

  it('should delete service', async () => {
    nock('https://api.contaazul.com/v1').delete('/services/6dafd126-be9b-4b58-934f-f2137c1f6489').reply(204, {})
    const response = await client.services.delete('6dafd126-be9b-4b58-934f-f2137c1f6489')
    expect(response.status).toBe(204)
  })
})
