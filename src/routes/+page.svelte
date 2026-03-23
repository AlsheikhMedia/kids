<script lang="ts">
	import Hero from '$lib/components/landing/Hero.svelte';
	import GameCard from '$lib/components/landing/GameCard.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import { GAMES } from '$lib/games';

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'ركن الأطفال — الشيخ ميديا',
		alternateName: 'Alsheikh Media Kids Corner',
		url: 'https://kids.alsheikhmedia.com',
		applicationCategory: 'EducationalApplication',
		audience: {
			'@type': 'EducationalAudience',
			educationalRole: 'student',
			suggestedMinAge: 2,
			suggestedMaxAge: 5
		},
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'AED'
		},
		inLanguage: ['ar', 'en'],
		hasPart: GAMES.filter((g) => !g.comingSoon).map((g) => ({
			'@type': 'WebApplication',
			name: g.title,
			url: `https://kids.alsheikhmedia.com${g.href}`
		}))
	};
</script>

<svelte:head>
	<title>ركن الأطفال — ألعاب تعليمية تفاعلية للأطفال | Alsheikh Media Kids Corner</title>
	<meta
		name="description"
		content="ألعاب تعليمية آمنة ومجانية للأطفال تحت ٥ سنوات. تعلم الألوان والأرقام والحروف العربية. Free educational games for kids under 5."
	/>
	<meta
		name="keywords"
		content="ألعاب أطفال, ألعاب تعليمية, تعلم الحروف العربية, ألعاب رسم للأطفال, kids games, educational games, Arabic learning, toddler games"
	/>
	<meta property="og:title" content="ركن الأطفال — ألعاب تعليمية للأطفال" />
	<meta property="og:description" content="ألعاب آمنة ومجانية للأطفال تحت ٥ سنوات" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://kids.alsheikhmedia.com" />
	<meta property="og:locale" content="ar_AE" />
	<meta property="og:locale:alternate" content="en_US" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="ركن الأطفال — Alsheikh Media Kids Corner" />
	<meta
		name="twitter:description"
		content="Free educational games for kids under 5. Arabic colors, numbers & letters."
	/>
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<main>
	<Hero />

	<section class="games-section" aria-label="الألعاب التعليمية">
		<h2 class="section-title">اختر لعبة!</h2>
		<p class="section-subtitle">اضغط على البطاقة لتبدأ اللعب</p>

		<div class="games-grid">
			{#each GAMES as game (game.id)}
				<GameCard {game}>
					{#snippet icon()}
						{#if game.id === 'paint'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 19l7-7 3 3-7 7-3-3z" />
								<path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
								<path d="M2 2l7.586 7.586" />
								<circle cx="11" cy="11" r="2" />
							</svg>
						{:else if game.id === 'colors'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="10" />
								<circle cx="12" cy="12" r="4" />
								<path d="M12 2v4" /><path d="M12 18v4" />
								<path d="M2 12h4" /><path d="M18 12h4" />
							</svg>
						{:else if game.id === 'numbers'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M4 17h6" /><path d="M7 7v10" />
								<path d="M14 7h2a2 2 0 0 1 0 4h-2" />
								<path d="M14 13h2a2 2 0 0 1 0 4h-2" />
							</svg>
						{:else if game.id === 'alphabet'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M3 7V5c0-1.1.9-2 2-2h2" />
								<path d="M17 3h2c1.1 0 2 .9 2 2v2" />
								<path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
								<path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
								<text x="12" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="currentColor" stroke="none">أب</text>
							</svg>
						{:else if game.id === 'puzzle'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<rect x="3" y="3" width="8" height="8" rx="2" />
								<rect x="13" y="3" width="8" height="8" rx="2" />
								<rect x="3" y="13" width="8" height="8" rx="2" />
								<rect x="13" y="13" width="8" height="8" rx="2" />
							</svg>
						{/if}
					{/snippet}
				</GameCard>
			{/each}
		</div>
	</section>

	<Features />

	<footer class="footer">
		<p>الشيخ ميديا — ركن الأطفال © ٢٠٢٦</p>
		<p class="footer-en">Alsheikh Media Kids Corner — Educational games for children under 5</p>
	</footer>
</main>

<style>
	.games-section {
		max-width: 900px;
		margin: 0 auto;
		padding: 32px 20px 48px;
	}

	.section-title {
		font-size: 2rem;
		font-weight: 800;
		text-align: center;
		margin-bottom: 6px;
		color: var(--color-black);
	}

	.section-subtitle {
		font-size: 1.05rem;
		text-align: center;
		color: #95a5a6;
		margin-bottom: 28px;
	}

	.games-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.footer {
		text-align: center;
		padding: 32px 24px;
		color: #bdc3c7;
		font-size: 0.85rem;
	}

	.footer-en {
		direction: ltr;
		margin-top: 4px;
		font-size: 0.8rem;
	}

	@media (max-width: 600px) {
		.games-grid {
			grid-template-columns: 1fr;
		}

		.section-title {
			font-size: 1.6rem;
		}
	}
</style>
