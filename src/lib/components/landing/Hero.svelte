<section class="hero" aria-label="مقدمة">
	<div class="hero-content">
		<h1 class="hero-logo">ركن الأطفال</h1>
		<p class="hero-sub">ألعاب تعليمية ممتعة!</p>
		<p class="hero-desc">تعلّم الألوان والأرقام والحروف العربية من خلال اللعب</p>
		<p class="hero-en">Fun educational games for kids under 5</p>
		<div class="hero-badges">
			<span class="badge">مجاني</span>
			<span class="badge">بدون إعلانات</span>
			<span class="badge">آمن ١٠٠٪</span>
		</div>
	</div>
</section>

<style>
	.hero {
		background: linear-gradient(160deg, #FF6B6B 0%, #FF8E53 30%, #FFC75F 60%, #55E6C1 100%);
		padding: 56px 24px 88px;
		text-align: center;
		color: white;
		position: relative;
		overflow: hidden;
	}

	.hero::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: -5%;
		right: -5%;
		height: 48px;
		background: var(--color-app-bg);
		border-radius: 50% 50% 0 0;
	}

	.hero-content {
		position: relative;
		z-index: 1;
	}

	.hero-logo {
		font-size: 3.2rem;
		font-weight: 800;
		text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
		margin-bottom: 4px;
		line-height: 1.2;
	}

	.hero-sub {
		font-size: 1.5rem;
		font-weight: 700;
		opacity: 0.95;
		margin-bottom: 12px;
	}

	.hero-desc {
		font-size: 1.05rem;
		opacity: 0.9;
		max-width: 500px;
		margin: 0 auto 8px;
		line-height: 1.5;
	}

	.hero-en {
		font-size: 0.9rem;
		opacity: 0.7;
		direction: ltr;
		margin-bottom: 20px;
	}

	.hero-badges {
		display: flex;
		justify-content: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.badge {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(4px);
		padding: 6px 16px;
		border-radius: 50px;
		font-size: 0.9rem;
		font-weight: 700;
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	@media (max-width: 600px) {
		.hero-logo {
			font-size: 2.2rem;
		}

		.hero-sub {
			font-size: 1.2rem;
		}

		.hero {
			padding: 40px 20px 72px;
		}
	}
</style>
