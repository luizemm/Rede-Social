import { LifeTimePostPipe } from './life-time-post.pipe';

describe('LifeTimePostPipe', () => {
  it('create an instance', () => {
    const pipe = new LifeTimePostPipe();
    expect(pipe).toBeTruthy();
  });
});
