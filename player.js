function updatePlayer(p, keys, canvasWidth) {
  if (keys.left) p.vx -= 6;
  if (keys.right) p.vx += 6;
  p.vx *= 0.9;
  p.x += p.vx;
  if (p.x < 0) {
    p.x = 0;
    p.vx = 0;
  }
  if (p.x + p.width > canvasWidth) {
    p.x = canvasWidth - p.width;
    p.vx = 0;
  }
  return p;
}
if (typeof module !== 'undefined') {
  module.exports = { updatePlayer };
}
if (typeof window !== 'undefined') {
  window.updatePlayer = updatePlayer;
}
