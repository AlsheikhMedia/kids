<script lang="ts">
	import PaintingCanvas from '$lib/components/PaintingCanvas.svelte';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import FullscreenToggle from '$lib/components/FullscreenToggle.svelte';
	import ParentGate from '$lib/components/ParentGate.svelte';
</script>

<svelte:head>
	<title>لوحة الرسم | الشيخ ميديا - ركن الأطفال</title>
</svelte:head>

<div class="paint-app">
	<PaintingCanvas />
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
	}
</style>
