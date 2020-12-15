// test/capitalizeFirst.test.js
const assert = require('assert');
const rectangle = require('../Rectangle');
const rectangeForTest = require('../RectangleForTest')

// give the test suite a label using describe
describe('rectangle testing', () => {
  // give the test a label using it
  it('is a square', () => {
    assert.strictEqual(rectangeForTest.isSquare(),true) 
  });

  it('get area', () => {
    assert.strictEqual(rectangeForTest.getArea(),rectangeForTest.a * rectangeForTest.b)
  });

  it('get perimeter', () => {
    assert.strictEqual(rectangeForTest.getPerimeter(),(rectangeForTest.a * 2) + (rectangeForTest.b * 2))
  });
});