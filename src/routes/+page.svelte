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
	<title>ركن الأطفال — ألعاب تعليمية للأطفال | Kids Corner</title>
	<meta
		name="description"
		content="ألعاب تعليمية آمنة ومجانية للأطفال تحت ٥ سنوات. تعلم الألوان والأرقام والحروف العربية. Free educational games for kids under 5."
	/>
	<meta
		name="keywords"
		content="ألعاب أطفال, ألعاب تعليمية, تعلم الحروف العربية, ألعاب رسم للأطفال, kids games, educational games, Arabic learning, toddler games"
	/>
	<link rel="canonical" href="https://kids.alsheikhmedia.com/" />
	<link rel="preload" href="/icons/artist-palette.svg" as="image" />
	<meta property="og:title" content="ركن الأطفال — ألعاب تعليمية للأطفال" />
	<meta property="og:description" content="ألعاب آمنة ومجانية للأطفال تحت ٥ سنوات" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://kids.alsheikhmedia.com" />
	<meta property="og:locale" content="ar_AE" />
	<meta property="og:locale:alternate" content="en_US" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="ركن الأطفال — ألعاب تعليمية للأطفال" />
	<meta
		name="twitter:description"
		content="Free educational games for kids under 5. Arabic colors, numbers & letters."
	/>
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<main>
	<Hero />

	<section class="games-section" aria-label="الألعاب التعليمية">
		<h2 class="section-title">ابدأ اللعب!</h2>
		<p class="section-subtitle">اضغط على البطاقة لتبدأ</p>

		<div class="games-grid">
			{#each GAMES.filter(g => !g.comingSoon) as game, index (game.id)}
				<GameCard {game} aboveFold={index < 3} />
			{/each}
		</div>
	</section>

	<Features />

	<section class="about-section" aria-label="عن ركن الأطفال">
		<div class="about-card">
			<h2 class="about-title">عن ركن الأطفال</h2>
			<p>
				ركن الأطفال هو مشروع تعليمي من الشيخ ميديا يهدف إلى تقديم ألعاب تفاعلية آمنة ومجانية للأطفال العرب تحت سن الخامسة. نؤمن بأن التعلم المبكر يجب أن يكون ممتعاً وآمناً، لذلك صممنا كل لعبة بعناية لتناسب قدرات الأطفال الصغار وتساعدهم على اكتشاف العالم من حولهم.
			</p>
			<p>
				تشمل ألعابنا لوحة رسم حرة تتيح للأطفال التعبير عن إبداعهم باستخدام أصابعهم، بالإضافة إلى ألعاب تعليمية لتعلم الألوان والأرقام والحروف العربية. جميع الألعاب تعمل مباشرة في المتصفح بدون الحاجة إلى تحميل أي تطبيق، وتتوفر على جميع الأجهزة من آيباد وتابلت وكمبيوتر.
			</p>
			<p>
				نحرص على سلامة أطفالكم — لا إعلانات، لا روابط خارجية، ووضع قفل الأهل يمنع الأطفال من الخروج أثناء اللعب. ركن الأطفال مصمم بالكامل باللغة العربية ليكون قريباً من أطفالنا وثقافتنا.
			</p>
			<p class="about-en">
				Kids Corner by Alsheikh Media provides free, safe, and interactive educational games for Arab children under 5. Our games include free-draw painting, color matching, number ordering, Arabic alphabet learning, and puzzles — all browser-based with no downloads required. Parent lock mode ensures children stay safe while playing.
			</p>
		</div>
	</section>

	<footer class="footer">
		<p>الشيخ ميديا — ركن الأطفال © ٢٠٢٦</p>
		<p class="footer-en">Alsheikh Media Kids Corner — Educational games for children under 5</p>
		<p class="footer-attribution">Icons by <a href="https://openmoji.org" target="_blank" rel="noopener">OpenMoji</a> (CC BY-SA 4.0)</p>
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

	.about-section {
		max-width: 900px;
		margin: 0 auto;
		padding: 0 20px 40px;
	}

	.about-card {
		background: white;
		border-radius: 32px;
		padding: 36px 28px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
		border: 3px solid rgba(0, 0, 0, 0.03);
	}

	.about-title {
		font-size: 1.8rem;
		font-weight: 800;
		text-align: center;
		margin-bottom: 20px;
		color: var(--color-black);
	}

	.about-card p {
		font-size: 1rem;
		line-height: 1.8;
		color: #555;
		margin-bottom: 16px;
	}

	.about-en {
		direction: ltr;
		color: #95a5a6 !important;
		font-size: 0.9rem !important;
		border-top: 1px solid rgba(0, 0, 0, 0.05);
		padding-top: 16px;
		margin-top: 20px;
	}

	.footer {
		text-align: center;
		padding: 32px 24px;
		color: #bdc3c7;
		font-size: 0.85rem;
	}

	.footer-attribution {
		margin-top: 8px;
		font-size: 0.75rem;
	}

	.footer-attribution a {
		color: #95a5a6;
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
