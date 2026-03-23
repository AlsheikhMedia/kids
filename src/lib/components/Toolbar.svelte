<script lang="ts">
	import { drawingState } from '$lib/stores/drawing.svelte';
	import { PALETTE } from '$lib/constants';
	import type { BrushSize } from '$lib/constants';
	import { exportCanvasAsPng } from '$lib/utils/canvas-renderer';

	const sizes: BrushSize[] = ['small', 'medium', 'large'];
	const sizeDots: Record<BrushSize, number> = { small: 8, medium: 14, large: 22 };
	const sizeLabels: Record<BrushSize, string> = { small: 'صغير', medium: 'وسط', large: 'كبير' };

	function handleSave(): void {
		if (!drawingState.canvasElement) return;
		exportCanvasAsPng(drawingState.canvasElement);
	}

	function handleClear(): void {
		drawingState.clear();
	}
</script>

<div class="toolbar" class:collapsed={drawingState.isToolbarCollapsed} role="toolbar" aria-label="أدوات الرسم">
	<button class="toolbar-handle" onclick={() => drawingState.toggleToolbar()} aria-label="إظهار/إخفاء شريط الأدوات">
		<svg width="24" height="4" viewBox="0 0 24 4" fill="none">
			<rect width="24" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
		</svg>
	</button>

	{#if !drawingState.isToolbarCollapsed}
		<div class="toolbar-content">
			<div class="color-palette" role="radiogroup" aria-label="الألوان">
				{#each PALETTE as color}
					<button
						class="color-swatch"
						class:active={drawingState.activeColor === color.hex && drawingState.activeTool === 'brush'}
						style:background-color={color.hex}
						style:border-color={color.hex === '#ecf0f1' ? 'rgba(255,255,255,0.3)' : 'transparent'}
						aria-label={color.nameAr}
						aria-pressed={drawingState.activeColor === color.hex && drawingState.activeTool === 'brush'}
						onclick={() => drawingState.setColor(color.hex)}
					></button>
				{/each}
			</div>

			<div class="controls-row">
				<div class="sizes" role="radiogroup" aria-label="حجم الفرشاة">
					{#each sizes as size}
						<button
							class="size-btn"
							class:active={drawingState.activeSize === size}
							aria-label={sizeLabels[size]}
							aria-pressed={drawingState.activeSize === size}
							onclick={() => drawingState.setSize(size)}
						>
							<span class="size-dot" style:width="{sizeDots[size]}px" style:height="{sizeDots[size]}px"></span>
						</button>
					{/each}
				</div>

				<div class="divider"></div>

				<div class="tools">
					<button
						class="tool-btn eraser-btn"
						class:active={drawingState.activeTool === 'eraser'}
						aria-label="ممحاة"
						aria-pressed={drawingState.activeTool === 'eraser'}
						onclick={() => drawingState.toggleEraser()}
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M20 20H7L3 16c-.8-.8-.8-2 0-2.8L14.2 2a2 2 0 0 1 2.8 0L21 5.8c.8.8.8 2 0 2.8L10 19.6" />
						</svg>
					</button>

					<button class="tool-btn" aria-label="تراجع" onclick={() => drawingState.undo()}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M3 7v6h6" />
							<path d="M3 13c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9a9 9 0 0 1-6.36-2.64" />
						</svg>
					</button>

					<button
						class="tool-btn clear-btn"
						class:pending={drawingState.isPendingClear}
						aria-label={drawingState.isPendingClear ? 'تأكيد المسح' : 'مسح الكل'}
						onclick={handleClear}
					>
						{#if drawingState.isPendingClear}
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20 6L9 17l-5-5" />
							</svg>
						{:else}
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M3 6h18" />
								<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
								<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
							</svg>
						{/if}
					</button>

					<button class="tool-btn save-btn" aria-label="حفظ" onclick={handleSave}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 15V3" />
							<path d="M7 10l5 5 5-5" />
							<path d="M20 21H4" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.toolbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--color-toolbar-bg);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		padding: 12px 16px;
		padding-bottom: max(12px, env(safe-area-inset-bottom));
		z-index: 10;
		border-radius: 20px 20px 0 0;
		transition: transform var(--transition-normal);
	}

	.toolbar.collapsed {
		transform: translateY(calc(100% - 24px));
	}

	.toolbar-handle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 4px 0 8px;
	}

	.toolbar-content {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	/* Colors */
	.color-palette {
		display: flex;
		justify-content: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.color-swatch {
		width: var(--touch-target-min);
		height: var(--touch-target-min);
		border-radius: 50%;
		border: 3px solid transparent;
		transition: transform var(--transition-fast), border-color var(--transition-fast);
	}

	.color-swatch:active {
		transform: scale(0.88);
	}

	.color-swatch.active {
		border-color: white;
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
		transform: scale(1.1);
	}

	/* Controls row */
	.controls-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
	}

	.divider {
		width: 2px;
		height: 32px;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 1px;
		flex-shrink: 0;
	}

	/* Sizes */
	.sizes {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.size-btn {
		width: var(--touch-target-min);
		height: var(--touch-target-min);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform var(--transition-fast);
	}

	.size-btn:active {
		transform: scale(0.85);
	}

	.size-btn.active .size-dot {
		box-shadow: 0 0 0 3px rgba(253, 203, 110, 0.5);
	}

	.size-dot {
		border-radius: 50%;
		background: white;
		transition: box-shadow var(--transition-fast);
	}

	/* Tools */
	.tools {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.tool-btn {
		width: var(--touch-target-min);
		height: var(--touch-target-min);
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.8);
		background: rgba(255, 255, 255, 0.1);
		transition: transform var(--transition-fast), background var(--transition-fast);
	}

	.tool-btn:active {
		transform: scale(0.88);
	}

	.eraser-btn.active {
		background: rgba(253, 203, 110, 0.35);
		color: #fff;
	}

	.clear-btn.pending {
		background: rgba(231, 76, 60, 0.4);
		color: #ff6b6b;
	}

	.save-btn {
		background: rgba(85, 239, 196, 0.2);
	}

	/* Mobile — keep touch targets at minimum, reduce padding only */
	@media (max-width: 600px) {
		.toolbar {
			padding: 10px 12px;
			gap: 6px;
		}

		.color-palette {
			gap: 6px;
		}
	}
</style>
