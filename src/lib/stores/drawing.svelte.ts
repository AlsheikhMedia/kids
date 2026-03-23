import { BRUSH_SIZES, CANVAS_BACKGROUND, CLEAR_CONFIRM_TIMEOUT_MS, PALETTE } from '$lib/constants';
import type { BrushSize } from '$lib/constants';

export interface Point {
	x: number;
	y: number;
	pressure: number;
}

export interface Stroke {
	points: Point[];
	color: string;
	size: number;
	tool: 'brush' | 'eraser';
}

class DrawingState {
	strokes = $state<Stroke[]>([]);
	currentStroke = $state<Stroke | null>(null);
	activeColor = $state(PALETTE[8].hex);
	activeSize = $state<BrushSize>('medium');
	activeTool = $state<'brush' | 'eraser'>('brush');
	isToolbarCollapsed = $state(false);
	isFullscreen = $state(false);
	isParentGateOpen = $state(false);
	canvasElement = $state<HTMLCanvasElement | null>(null);
	isDirty = $state(false);

	private pendingClear = $state(false);
	private clearTimer: ReturnType<typeof setTimeout> | null = null;

	get brushPixelSize(): number {
		return BRUSH_SIZES[this.activeSize];
	}

	get currentColor(): string {
		if (this.activeTool === 'eraser') return CANVAS_BACKGROUND;
		return this.activeColor;
	}

	beginStroke(point: Point): void {
		this.currentStroke = {
			points: [point],
			color: this.currentColor,
			size: this.brushPixelSize,
			tool: this.activeTool
		};
	}

	continueStroke(point: Point): void {
		if (!this.currentStroke) return;
		this.currentStroke.points.push(point);
	}

	endStroke(): void {
		if (!this.currentStroke) return;
		if (this.currentStroke.points.length > 0) {
			this.strokes = [...this.strokes, this.currentStroke];
			this.isDirty = true;
		}
		this.currentStroke = null;
	}

	undo(): void {
		if (this.strokes.length === 0) return;
		this.strokes = this.strokes.slice(0, -1);
		this.isDirty = true;
	}

	clear(): boolean {
		if (this.strokes.length === 0) return false;

		if (this.pendingClear) {
			this.strokes = [];
			this.pendingClear = false;
			if (this.clearTimer) clearTimeout(this.clearTimer);
			this.clearTimer = null;
			this.isDirty = true;
			return true;
		}

		this.pendingClear = true;
		this.clearTimer = setTimeout(() => {
			this.pendingClear = false;
			this.clearTimer = null;
		}, CLEAR_CONFIRM_TIMEOUT_MS);
		return false;
	}

	get isPendingClear(): boolean {
		return this.pendingClear;
	}

	setColor(color: string): void {
		if (this.activeColor === color && this.activeTool === 'brush') return;
		this.activeColor = color;
		this.activeTool = 'brush';
	}

	setSize(size: BrushSize): void {
		if (this.activeSize === size) return;
		this.activeSize = size;
	}

	toggleEraser(): void {
		this.activeTool = this.activeTool === 'eraser' ? 'brush' : 'eraser';
	}

	toggleToolbar(): void {
		this.isToolbarCollapsed = !this.isToolbarCollapsed;
	}

	restoreStrokes(strokes: Stroke[]): void {
		this.strokes = strokes;
	}
}

export const drawingState = new DrawingState();
