<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { GameInfo } from '$lib/games';

	interface Props {
		game: GameInfo;
		icon: Snippet;
	}

	let { game, icon }: Props = $props();
</script>

<a
	class="game-card"
	class:featured={game.featured}
	href={game.comingSoon ? '/games/coming-soon' : game.href}
	style:background={game.gradient}
	style:border-color={game.borderColor}
>
	<article class="card-inner">
		<div class="card-icon-big">
			{@render icon()}
		</div>
		<div class="card-text">
			<h3>{game.title}</h3>
			<p>{game.description}</p>
			<span class="card-age-tag">{game.ageRange}</span>
		</div>
	</article>
	{#if game.comingSoon}
		<span class="coming-soon-badge">قريباً</span>
	{/if}
</a>

<style>
	.game-card {
		border-radius: 28px;
		overflow: hidden;
		cursor: pointer;
		text-decoration: none;
		color: white;
		display: block;
		position: relative;
		transition: transform var(--transition-normal);
		border: 4px solid transparent;
	}

	.game-card:hover {
		transform: translateY(-4px);
	}

	.game-card:active {
		transform: scale(0.97);
	}

	.game-card.featured {
		grid-column: 1 / -1;
	}

	.card-inner {
		padding: 28px 24px;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.featured .card-inner {
		min-height: 220px;
		flex-direction: row;
		align-items: center;
		gap: 24px;
	}

	.card-icon-big {
		width: 100px;
		height: 100px;
		background: rgba(255, 255, 255, 0.25);
		border-radius: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid rgba(255, 255, 255, 0.3);
		flex-shrink: 0;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
		color: white;
	}

	.card-icon-big :global(svg) {
		width: 48px;
		height: 48px;
	}

	.card-text h3 {
		font-size: 1.6rem;
		font-weight: 800;
		margin-bottom: 4px;
		text-shadow: 0 2px 0 rgba(0, 0, 0, 0.08);
	}

	.card-text p {
		font-size: 0.95rem;
		opacity: 0.9;
		line-height: 1.4;
	}

	.card-age-tag {
		display: inline-block;
		background: rgba(255, 255, 255, 0.3);
		padding: 4px 14px;
		border-radius: 50px;
		font-size: 0.8rem;
		font-weight: 700;
		margin-top: 8px;
		border: 2px solid rgba(255, 255, 255, 0.2);
	}

	.coming-soon-badge {
		position: absolute;
		top: 16px;
		left: 16px;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(4px);
		padding: 4px 14px;
		border-radius: 50px;
		font-size: 0.8rem;
		font-weight: 700;
	}

	@media (max-width: 600px) {
		.game-card.featured {
			grid-column: auto;
		}

		.featured .card-inner {
			flex-direction: column;
			align-items: flex-start;
			min-height: 160px;
		}

		.card-inner {
			min-height: 160px;
			padding: 22px 20px;
		}

		.card-icon-big {
			width: 72px;
			height: 72px;
			border-radius: 20px;
		}

		.card-icon-big :global(svg) {
			width: 36px;
			height: 36px;
		}

		.card-text h3 {
			font-size: 1.3rem;
		}
	}
</style>
