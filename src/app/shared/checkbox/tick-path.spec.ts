import { createTick } from './tick-path';

describe('createTick', () => {
  it('traces the tick twice, each pass as two cubic curves', () => {
    const path = createTick();

    expect(path.match(/M/g)).toHaveLength(2);
    expect(path.match(/C/g)).toHaveLength(4);
  });

  it('differs between calls', () => {
    expect(createTick()).not.toBe(createTick());
  });
});
