const request = require('supertest');
const app = require('../src/loader');

describe('Post Endpoints', () => {
    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/task')
            .send({
                title: 'test',
                description: 'test',
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('_id');
    });
})