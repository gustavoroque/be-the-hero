const generageUniqueID = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
  it('Should generate an unique ID', () => {
    const id = generageUniqueID();

    expect(id).toHaveLength(8);
  });
});