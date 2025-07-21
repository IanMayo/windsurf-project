import { Chart } from 'chart.js';

const arrowPlugin = {
  id: 'arrowPlugin',
  afterDraw: (chart: Chart) => {
    const ctx = chart.ctx;
    ctx.save();

    chart.data.datasets.forEach((_, i) => {
      const meta = chart.getDatasetMeta(i);
      if (meta.hidden) {
        return;
      }

      const pointCount = meta.data.length;
      const arrowSpacing = Math.floor(pointCount / 5); // Show ~5 arrows per path

      for (let j = arrowSpacing; j < pointCount; j += arrowSpacing) {
        const p1 = meta.data[j - 1];
        const p2 = meta.data[j];

        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const headlen = 15; // Increased from 10 for better visibility

        ctx.beginPath();
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(
          p2.x - headlen * Math.cos(angle - Math.PI / 6),
          p2.y - headlen * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(
          p2.x - headlen * Math.cos(angle + Math.PI / 6),
          p2.y - headlen * Math.sin(angle + Math.PI / 6)
        );
        
        const ds = chart.data.datasets[i];
        ctx.strokeStyle = ds.borderColor as string;
        ctx.lineWidth = ds.borderWidth as number;
        ctx.stroke();
      }
    });

    ctx.restore();
  },
};

export default arrowPlugin;
