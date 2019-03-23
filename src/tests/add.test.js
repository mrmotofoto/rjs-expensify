const add = (a, b) => a + b;

test('Add 2 numbers', ()  => {
  const result = add(3, 4);
  expect(result).toBe(7);
});