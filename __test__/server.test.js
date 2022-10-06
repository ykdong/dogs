import request from 'supertest';
import app from '../server/app.js';

////////////////////////////////// Back End Testing //////////////////////////////////
test('should send correct data for given endpoint /shiba', async () => {
  const response = await request(app.callback()).get('/shiba');

  expect(typeof response.body).toBe('object');
  expect(response.body).toHaveProperty("status", "success");
  expect(response.body.message).toContain("shiba");
});

test('should send correct data for given endpoint /pug', async () => {
  const response = await request(app.callback()).get('/pug');

  expect(typeof response.body).toBe('object');
  expect(response.body).toHaveProperty("status", "success");
  expect(response.body.message).toContain("pug");
});

test('should send correct data for given endpoint /terrier', async () => {
  const response = await request(app.callback()).get('/terrier');

  expect(typeof response.body).toBe('object');
  expect(response.body).toHaveProperty("status", "success");
  expect(response.body.message).toContain("terrier");
});

test('should send correct array list for given endpoint /list', async () => {
  const response = await request(app.callback()).get('/list');

  expect(response.body).toHaveProperty("status", "success");
  expect(Array.isArray(response.body.message)).toBe(true);
});
