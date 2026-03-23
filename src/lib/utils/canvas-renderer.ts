import { CANVAS_BACKGROUND } from '$lib/constants';
import type { Point, Stroke } from '$lib/stores/drawing.svelte';

function drawSmoothLine(
	ctx: CanvasRenderingContext2D,
	points: Point[],
	canvasWidth: number,
	canvasHeight: number
): void {
	if (points.length === 0) return;

	if (points.length === 1) {
		const point = points[0];
		ctx.beginPath();
		ctx.arc(
			point.x * canvasWidth,
			point.y * canvasHeight,
			ctx.lineWidth / 2,
			0,
			Math.PI * 2
		);
		ctx.fill();
		return;
	}

	ctx.beginPath();
	ctx.moveTo(points[0].x * canvasWidth, points[0].y * canvasHeight);

	for (let i = 0; i < points.length - 1; i++) {
		const current = points[i];
		const next = points[i + 1];
		const midX = ((current.x + next.x) / 2) * canvasWidth;
		const midY = ((current.y + next.y) / 2) * canvasHeight;
		ctx.quadraticCurveTo(current.x * canvasWidth, current.y * canvasHeight, midX, midY);
	}

	const last = points[points.length - 1];
	ctx.lineTo(last.x * canvasWidth, last.y * canvasHeight);
	ctx.stroke();
}

export function renderStroke(
	ctx: CanvasRenderingContext2D,
	stroke: Stroke,
	canvasWidth: number,
	canvasHeight: number
): void {
	ctx.save();
	ctx.strokeStyle = stroke.color;
	ctx.fillStyle = stroke.color;
	ctx.lineWidth = stroke.size * (Math.min(canvasWidth, canvasHeight) / 500);
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	drawSmoothLine(ctx, stroke.points, canvasWidth, canvasHeight);

	ctx.restore();
}

export function renderAllStrokes(
	ctx: CanvasRenderingContext2D,
	strokes: Stroke[],
	canvasWidth: number,
	canvasHeight: number
): void {
	ctx.fillStyle = CANVAS_BACKGROUND;
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	for (const stroke of strokes) {
		renderStroke(ctx, stroke, canvasWidth, canvasHeight);
	}
}

function formatTimestamp(): string {
	const now = new Date();
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

export function exportCanvasAsPng(canvas: HTMLCanvasElement): void {
	const link = document.createElement('a');
	link.download = `ركن-الأطفال-رسمة-${formatTimestamp()}.png`;
	link.href = canvas.toDataURL('image/png');
	link.click();
}
