const { updatePlayer } = require('../player');

describe('player boundaries', () => {
  test('player does not go left beyond 0', () => {
    const player = { x: 0, width: 20, vx: -10 };
    const keys = { left: true, right: false };
    updatePlayer(player, keys, 800);
    expect(player.x).toBeGreaterThanOrEqual(0);
  });

  test('player does not go right beyond canvas', () => {
    const player = { x: 780, width: 20, vx: 10 };
    const keys = { left: false, right: true };
    updatePlayer(player, keys, 800);
    expect(player.x + player.width).toBeLessThanOrEqual(800);
  });
});
