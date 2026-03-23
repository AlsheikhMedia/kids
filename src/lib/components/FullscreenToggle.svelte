<script lang="ts">
	import { onMount } from 'svelte';
	import { drawingState } from '$lib/stores/drawing.svelte';

	function requestFullscreen(element: HTMLElement): Promise<void> {
		if (element.requestFullscreen) return element.requestFullscreen();
		if ('webkitRequestFullscreen' in element) {
			return (element as HTMLElement & { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
		}
		return Promise.reject(new Error('Fullscreen not supported'));
	}

	function toggle(): void {
		if (drawingState.isFullscreen) {
			// In fullscreen — require math to exit
			drawingState.isParentGateOpen = true;
		} else {
			requestFullscreen(document.documentElement).catch(() => {});
		}
	}

	onMount(() => {
		function onFullscreenChange() {
			const isNow = !!document.fullscreenElement;
			if (drawingState.isFullscreen === isNow) return;
			drawingState.isFullscreen = isNow;
		}

		document.addEventListener('fullscreenchange', onFullscreenChange);
		document.addEventListener('webkitfullscreenchange', onFullscreenChange);

		return () => {
			document.removeEventListener('fullscreenchange', onFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
		};
	});
</script>

<button class="fullscreen-toggle" onclick={toggle} aria-label={drawingState.isFullscreen ? 'الخروج من ملء الشاشة' : 'وضع ملء الشاشة'}>
	{#if drawingState.isFullscreen}
		<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<path d="M8 3v4H4" />
			<path d="M16 3v4h4" />
			<path d="M8 21v-4H4" />
			<path d="M16 21v-4h4" />
		</svg>
	{:else}
		<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<path d="M3 8V4h4" />
			<path d="M21 8V4h-4" />
			<path d="M3 16v4h4" />
			<path d="M21 16v4h-4" />
		</svg>
	{/if}
</button>

<style>
	.fullscreen-toggle {
		position: fixed;
		top: 12px;
		right: 12px;
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
	}

	.fullscreen-toggle:active {
		background: rgba(0, 0, 0, 0.15);
		transform: scale(0.92);
	}
</style>
