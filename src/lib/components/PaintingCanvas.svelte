<script lang="ts">
	import { onMount } from 'svelte';
	import { drawingState } from '$lib/stores/drawing.svelte';
	import type { Point } from '$lib/stores/drawing.svelte';
	import { renderAllStrokes, renderStroke } from '$lib/utils/canvas-renderer';
	import { saveDrawing, loadDrawing, hasSavedDrawing, clearSavedDrawing } from '$lib/utils/storage';
	import { AUTO_SAVE_INTERVAL_MS } from '$lib/constants';

	let canvas: HTMLCanvasElement;
	let bufferCanvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let bufferCtx: CanvasRenderingContext2D | null = null;
	let isDrawing = $state(false);
	let canvasWidth = 0;
	let canvasHeight = 0;
	let cachedRect: DOMRect | null = null;
	let showRecovery = $state(false);
	let resizeTimer: ReturnType<typeof setTimeout> | null = null;

	function normalizePoint(event: PointerEvent): Point {
		if (!cachedRect) cachedRect = canvas.getBoundingClientRect();
		return {
			x: (event.clientX - cachedRect.left) / cachedRect.width,
			y: (event.clientY - cachedRect.top) / cachedRect.height,
			pressure: event.pressure || 0.5
		};
	}

	function syncCanvasSize(): void {
		const rect = canvas.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;
		canvasWidth = rect.width * dpr;
		canvasHeight = rect.height * dpr;

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		bufferCanvas.width = canvasWidth;
		bufferCanvas.height = canvasHeight;

		cachedRect = rect;
		redraw();
	}

	function redraw(): void {
		if (!bufferCtx || !ctx) return;
		renderAllStrokes(bufferCtx, drawingState.strokes, canvasWidth, canvasHeight);
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.drawImage(bufferCanvas, 0, 0);
	}

	function renderCurrentStroke(): void {
		if (!ctx || !bufferCtx || !drawingState.currentStroke) return;
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.drawImage(bufferCanvas, 0, 0);
		renderStroke(ctx, drawingState.currentStroke, canvasWidth, canvasHeight);
	}

	function handlePointerDown(event: PointerEvent): void {
		if (event.button !== 0) return;
		isDrawing = true;
		cachedRect = canvas.getBoundingClientRect();
		canvas.setPointerCapture(event.pointerId);
		drawingState.beginStroke(normalizePoint(event));
		renderCurrentStroke();
	}

	function handlePointerMove(event: PointerEvent): void {
		if (!isDrawing) return;
		drawingState.continueStroke(normalizePoint(event));
		renderCurrentStroke();
	}

	function handlePointerUp(event: PointerEvent): void {
		if (!isDrawing) return;
		isDrawing = false;
		canvas.releasePointerCapture(event.pointerId);
		drawingState.endStroke();
	}

	function handleContextMenu(event: Event): void {
		event.preventDefault();
	}

	function restoreSavedDrawing(): void {
		const saved = loadDrawing();
		if (saved && saved.length > 0) {
			drawingState.restoreStrokes(saved);
		}
		showRecovery = false;
	}

	function discardSavedDrawing(): void {
		clearSavedDrawing();
		showRecovery = false;
	}

	onMount(() => {
		bufferCanvas = document.createElement('canvas');
		ctx = canvas.getContext('2d');
		bufferCtx = bufferCanvas.getContext('2d');
		drawingState.canvasElement = canvas;

		const observer = new ResizeObserver(() => {
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(syncCanvasSize, 100);
		});
		observer.observe(canvas);

		syncCanvasSize();

		if (hasSavedDrawing()) {
			showRecovery = true;
		}

		const autoSaveTimer = setInterval(() => {
			if (drawingState.isDirty && drawingState.strokes.length > 0) {
				saveDrawing(drawingState.strokes);
				drawingState.isDirty = false;
			}
		}, AUTO_SAVE_INTERVAL_MS);

		return () => {
			observer.disconnect();
			drawingState.canvasElement = null;
			clearInterval(autoSaveTimer);
			if (resizeTimer) clearTimeout(resizeTimer);
		};
	});

	$effect(() => {
		// Redraw when strokes array reference changes (undo/clear/restore)
		const _ = drawingState.strokes;
		if (!ctx || !bufferCtx) return;
		redraw();
	});
</script>

{#if drawingState.strokes.length === 0 && !showRecovery}
	<div class="canvas-hint" aria-hidden="true">
		<svg class="hint-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
			<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
			<circle cx="12" cy="12" r="3" />
			<path d="M12 5V3" />
			<path d="M17.5 6.5l1.4-1.4" />
			<path d="M20 12h2" />
			<path d="M6.5 6.5L5.1 5.1" />
			<path d="M4 12H2" />
		</svg>
		<span class="hint-text">ارسم بأصابعك!</span>
	</div>
{/if}

<canvas
	bind:this={canvas}
	class="painting-canvas"
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerUp}
	oncontextmenu={handleContextMenu}
></canvas>

{#if showRecovery}
	<div class="recovery-toast" role="alert">
		<span>استعادة الرسمة السابقة؟</span>
		<button class="recovery-btn restore" onclick={restoreSavedDrawing} aria-label="استعادة">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<path d="M3 7v6h6" />
				<path d="M3 13c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9a9 9 0 0 1-6.36-2.64" />
			</svg>
		</button>
		<button class="recovery-btn discard" onclick={discardSavedDrawing} aria-label="تجاهل">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<path d="M18 6L6 18" />
				<path d="M6 6l12 12" />
			</svg>
		</button>
	</div>
{/if}

<style>
	.painting-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		touch-action: none;
		cursor: crosshair;
	}

	.canvas-hint {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		pointer-events: none;
		z-index: 1;
	}

	.hint-icon {
		display: block;
		margin: 0 auto 12px;
		color: #b5aea6;
	}

	.hint-text {
		font-size: 2rem;
		font-weight: 700;
		color: #b5aea6;
	}

	.recovery-toast {
		position: fixed;
		top: 16px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--color-toolbar-bg);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 16px;
		padding: 10px 16px;
		display: flex;
		align-items: center;
		gap: 12px;
		z-index: 30;
		color: white;
		font-size: 0.9rem;
		font-weight: 600;
		animation: slideDown 300ms ease;
	}

	@keyframes slideDown {
		from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
		to { transform: translateX(-50%) translateY(0); opacity: 1; }
	}

	.recovery-btn {
		width: var(--touch-target-min);
		height: var(--touch-target-min);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform var(--transition-fast);
	}

	.recovery-btn:active {
		transform: scale(0.88);
	}

	.recovery-btn.restore {
		background: rgba(85, 239, 196, 0.3);
		color: #55efc4;
	}

	.recovery-btn.discard {
		background: rgba(255, 107, 107, 0.3);
		color: #ff6b6b;
	}
</style>
