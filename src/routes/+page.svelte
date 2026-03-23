<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/paint');
	});
</script>

<div class="splash">
	<h1>الشيخ ميديا</h1>
	<h2>ركن الأطفال 🎨</h2>
</div>

<style>
	.splash {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100dvh;
		text-align: center;
		gap: 8px;
	}

	h1 {
		font-size: 3rem;
		font-weight: 800;
		color: var(--color-black);
	}

	h2 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-blue);
	}
</style>
