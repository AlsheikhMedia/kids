<script lang="ts">
	import PaintingCanvas from '$lib/components/PaintingCanvas.svelte';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import FullscreenToggle from '$lib/components/FullscreenToggle.svelte';
	import ParentGate from '$lib/components/ParentGate.svelte';
	import { drawingState } from '$lib/stores/drawing.svelte';
</script>

<svelte:head>
	<title>لوحة الرسم | الشيخ ميديا - ركن الأطفال</title>
</svelte:head>

<div class="paint-app">
	<PaintingCanvas />
	{#if !drawingState.isFullscreen}
	<a class="home-btn" href="/" aria-label="العودة للرئيسية">
		<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	</a>
	{/if}
	<FullscreenToggle />
	<ParentGate />
	<Toolbar />
</div>

<style>
	.paint-app {
		position: relative;
		width: 100%;
		height: 100dvh;
		overflow: hidden;
		background: var(--color-canvas-bg);
		-webkit-user-select: none;
		user-select: none;
	}

	.home-btn {
		position: fixed;
		top: 12px;
		left: 12px;
		width: var(--touch-target-min);
		height: var(--touch-target-min);
		background: rgba(0, 0, 0, 0.06);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-black);
		z-index: 20;
		transition: background var(--transition-fast);
		touch-action: manipulation;
		text-decoration: none;
	}

	.home-btn:active {
		background: rgba(0, 0, 0, 0.15);
		transform: scale(0.92);
	}
</style>
