const request = require('supertest');
const app = require('../app'); 

test('GET /notes?limit=2 returns paginated notes', async () => {
  const res = await request(app).get('/notes?limit=2');
  expect(res.status).toBe(200);
  expect(res.body.data.length).toBeLessThanOrEqual(2);
});

test('GET /notes?search=Test filters results', async () => {
  const res = await request(app).get('/notes?search=Test');
  expect(res.status).toBe(200);
  expect(res.body.data.every(note => note.text.includes('Test'))).toBe(true);
});
