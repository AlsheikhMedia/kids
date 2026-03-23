<section class="features-section" aria-label="المميزات">
	<div class="features-card">
		<h2 class="features-title">لماذا ركن الأطفال؟</h2>

		<div class="features-grid">
			<div class="feature-item">
				<div class="feature-icon" style="background: linear-gradient(135deg, #55efc4, #00b894);">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
					</svg>
				</div>
				<div>
					<h3>آمن ١٠٠٪</h3>
					<p>بدون إعلانات أو روابط خارجية. قفل الأهل يمنع الخروج.</p>
				</div>
			</div>

			<div class="feature-item">
				<div class="feature-icon" style="background: linear-gradient(135deg, #fdcb6e, #f39c12);">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
					</svg>
				</div>
				<div>
					<h3>ابدأ فوراً</h3>
					<p>لا تسجيل، لا تحميل. فقط اضغط والعب!</p>
				</div>
			</div>

			<div class="feature-item">
				<div class="feature-icon" style="background: linear-gradient(135deg, #a29bfe, #6c5ce7);">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
						<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
					</svg>
				</div>
				<div>
					<h3>تعليمي وممتع</h3>
					<p>ألوان، أرقام، حروف عربية — كل شيء من خلال اللعب.</p>
				</div>
			</div>

			<div class="feature-item">
				<div class="feature-icon" style="background: linear-gradient(135deg, #ff6b6b, #ee5a24);">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
						<path d="M12 18h.01" />
					</svg>
				</div>
				<div>
					<h3>كل الأجهزة</h3>
					<p>آيباد، تابلت، كمبيوتر — يعمل في المتصفح.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.features-section {
		max-width: 900px;
		margin: 0 auto;
		padding: 0 20px 40px;
	}

	.features-card {
		background: white;
		border-radius: 32px;
		padding: 36px 28px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
		border: 3px solid rgba(0, 0, 0, 0.03);
	}

	.features-title {
		font-size: 1.8rem;
		font-weight: 800;
		text-align: center;
		margin-bottom: 24px;
		color: var(--color-black);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.feature-item {
		display: flex;
		gap: 14px;
		align-items: flex-start;
		background: var(--color-app-bg);
		border-radius: 20px;
		padding: 20px;
		border: 2px solid rgba(0, 0, 0, 0.03);
	}

	.feature-icon {
		width: 52px;
		height: 52px;
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: white;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.feature-item h3 {
		font-size: 1.05rem;
		font-weight: 700;
		margin-bottom: 2px;
	}

	.feature-item p {
		font-size: 0.85rem;
		color: #7f8c8d;
		line-height: 1.4;
	}

	@media (max-width: 600px) {
		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
