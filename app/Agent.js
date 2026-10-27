'use client';
import { useEffect, useRef } from 'react';

const W = 14, H = 6;
const WALLS = new Set(['3,0','3,1','3,2','3,3','6,2','6,3','6,4','6,5','9,0','9,1','9,2','9,3']);
const START = [0, 0], GOAL = [13, 5];
const ACTIONS = [[1,0],[-1,0],[0,1],[0,-1]];
const ARROWS = ['→','←','↓','↑'];

export default function Agent() {
  const ref = useRef(null), label = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d');
    const Q = Array.from({ length: W * H }, () => [0, 0, 0, 0]);
    const trail = [];
    let p = [...START], ep = 0, steps = 0, raf;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

    const resize = () => {
      const r = c.getBoundingClientRect(), d = devicePixelRatio || 1;
      c.width = r.width * d; c.height = r.height * d;
      x.setTransform(d, 0, 0, d, 0, 0);
    };
    const step = () => {
      const s = p[1] * W + p[0];
      const eps = Math.max(0.05, 0.7 - ep * 0.004);
      const a = Math.random() < eps ? Math.floor(Math.random() * 4) : Q[s].indexOf(Math.max(...Q[s]));
      let nx = p[0] + ACTIONS[a][0], ny = p[1] + ACTIONS[a][1], r = -0.04;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H || WALLS.has(nx + ',' + ny)) { nx = p[0]; ny = p[1]; r = -0.2; }
      const done = nx === GOAL[0] && ny === GOAL[1];
      if (done) r = 1;
      Q[s][a] += 0.3 * (r + (done ? 0 : 0.9 * Math.max(...Q[ny * W + nx])) - Q[s][a]);
      p = [nx, ny]; steps++;
      trail.push([nx, ny]); if (trail.length > 14) trail.shift();
      if (done || steps > 200) { p = [...START]; steps = 0; ep++; trail.length = 0; }
    };
    const draw = () => {
      const C = { cell: css('--cell'), wall: css('--wall'), acc: css('--acc'), mint: css('--mint'), amber: css('--amber'), ink: css('--ink') };
      const w = c.clientWidth, h = c.clientHeight, cs = Math.min(w / W, h / H);
      const ox = (w - cs * W) / 2, oy = (h - cs * H) / 2;
      const mx = Math.max(0.001, ...Q.map((q) => Math.max(...q)));
      x.clearRect(0, 0, w, h);
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `${cs * 0.4}px system-ui, sans-serif`;
      const cx = (i) => ox + (i + 0.5) * cs, cy = (j) => oy + (j + 0.5) * cs;
      for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
        const px = ox + i * cs + 2, py = oy + j * cs + 2;
        x.beginPath(); x.roundRect(px, py, cs - 4, cs - 4, cs * 0.18);
        if (WALLS.has(i + ',' + j)) { x.fillStyle = C.wall; x.fill(); continue; }
        x.fillStyle = C.cell; x.fill();
        const q = Q[j * W + i], v = Math.min(1, Math.sqrt(Math.max(0, Math.max(...q)) / mx));
        x.globalAlpha = v * 0.8; x.fillStyle = C.acc; x.fill();
        if (v > 0.3) { x.globalAlpha = 0.85; x.fillStyle = C.ink; x.fillText(ARROWS[q.indexOf(Math.max(...q))], cx(i), cy(j)); }
        x.globalAlpha = 1;
      }
      trail.forEach(([tx, ty], k) => {
        x.globalAlpha = ((k + 1) / trail.length) * 0.4; x.fillStyle = C.amber;
        x.beginPath(); x.arc(cx(tx), cy(ty), cs * 0.12, 0, 7); x.fill();
      });
      x.globalAlpha = 1;
      const dot = (i, j, col, r, blur) => {
        x.shadowColor = col; x.shadowBlur = blur; x.fillStyle = col;
        x.beginPath(); x.arc(cx(i), cy(j), cs * r, 0, 7); x.fill(); x.shadowBlur = 0;
      };
      dot(GOAL[0], GOAL[1], C.mint, 0.3, 20);
      dot(p[0], p[1], C.amber, 0.26, 16);
      if (label.current) label.current.textContent = 'episode ' + ep;
    };
    const loop = () => { for (let i = 0; i < 3; i++) step(); draw(); raf = requestAnimationFrame(loop); };

    resize();
    const ro = new ResizeObserver(() => { resize(); draw(); }); ro.observe(c);
    if (reduce) { for (let i = 0; i < 20000; i++) step(); ep = 400; draw(); } else loop();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div className="agentwrap">
      <canvas ref={ref} className="agent" role="img" aria-label="A small reinforcement-learning agent learning to reach a goal in a grid" />
      <span ref={label} className="ep" />
    </div>
  );
}
