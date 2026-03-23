<script lang="ts">
	interface Props {
		gameName?: string;
	}

	let { gameName = '' }: Props = $props();
</script>

<div class="coming-soon">
	<div class="illustration">
		<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" color="#a29bfe">
			<path d="M12 2L2 7l10 5 10-5-10-5z" />
			<path d="M2 17l10 5 10-5" />
			<path d="M2 12l10 5 10-5" />
		</svg>
	</div>

	<h1 class="title">قريباً!</h1>

	{#if gameName}
		<p class="subtitle">نعمل على تحضير لعبة «{gameName}»</p>
	{:else}
		<p class="subtitle">نعمل على تحضير هذه اللعبة</p>
	{/if}

	<p class="subtitle-en">This game is coming soon!</p>

	<a href="/" class="back-btn">العودة للألعاب</a>
</div>

<style>
	.coming-soon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100dvh;
		text-align: center;
		padding: 40px 24px;
		gap: 8px;
	}

	.illustration {
		margin-bottom: 16px;
		opacity: 0.8;
	}

	.title {
		font-size: 3rem;
		font-weight: 800;
		color: #6c5ce7;
	}

	.subtitle {
		font-size: 1.2rem;
		color: #7f8c8d;
		font-weight: 600;
	}

	.subtitle-en {
		font-size: 0.95rem;
		color: #bdc3c7;
		direction: ltr;
		margin-bottom: 24px;
	}

	.back-btn {
		display: inline-block;
		background: linear-gradient(135deg, #6c5ce7, #a29bfe);
		color: white;
		text-decoration: none;
		padding: 14px 36px;
		border-radius: 50px;
		font-size: 1.1rem;
		font-weight: 700;
		font-family: var(--font-family);
		transition: transform var(--transition-fast);
		touch-action: manipulation;
	}

	.back-btn:active {
		transform: scale(0.95);
	}
</style>
