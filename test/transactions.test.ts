import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'
import { afterAll, beforeAll, expect, it, describe, beforeEach } from 'vitest'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transactions test',
        amount: 27000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transactions test',
        amount: 27000,
        type: 'credit',
      })

    const cookie = createTransactionResponse.get('Set-cookie')

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('cookie', cookie)
      .expect(200)

    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Transactions test',
        amount: 27000,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transactions test',
        amount: 27000,
        type: 'credit',
      })

    const cookie = createTransactionResponse.get('Set-cookie')

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('cookie', cookie)

    const { id } = listTransactionResponse.body.transactions[0]

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${id}`)
      .set('cookie', cookie)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'Transactions test',
        amount: 27000,
      }),
    )
  })

  it('should be able to get a summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transactions test',
        amount: 27000,
        type: 'credit',
      })

    const cookie = createTransactionResponse.get('Set-cookie')

    await request(app.server).post('/transactions').set('cookie', cookie).send({
      title: 'Transactions test',
      amount: 2000,
      type: 'debit',
    })

    const getSummaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('cookie', cookie)

    expect(getSummaryResponse.body.summary.amount).toEqual(25000)
  })
})
