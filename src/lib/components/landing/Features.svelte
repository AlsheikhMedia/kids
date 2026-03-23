<section class="features-section" aria-label="المميزات">
	<div class="features-card">
		<h2 class="features-title">لماذا ركن الأطفال؟</h2>

		<div class="features-grid">
			<div class="feature-item">
				<div class="feature-icon">
					<img src="/icons/shield.svg" alt="آمن" width="80" height="80" />
				</div>
				<div>
					<h3>آمن ١٠٠٪</h3>
					<p>بدون إعلانات أو روابط خارجية. قفل الأهل يمنع الخروج.</p>
				</div>
			</div>

			<div class="feature-item">
				<div class="feature-icon">
					<img src="/icons/high-voltage.svg" alt="سريع" width="80" height="80" />
				</div>
				<div>
					<h3>ابدأ فوراً</h3>
					<p>لا تسجيل، لا تحميل. فقط اضغط والعب!</p>
				</div>
			</div>

			<div class="feature-item">
				<div class="feature-icon">
					<img src="/icons/open-book.svg" alt="تعليمي" width="80" height="80" />
				</div>
				<div>
					<h3>تعليمي وممتع</h3>
					<p>ألوان، أرقام، حروف عربية — كل شيء من خلال اللعب.</p>
				</div>
			</div>

			<div class="feature-item">
				<div class="feature-icon">
					<img src="/icons/tablet-computer.svg" alt="كل الأجهزة" width="80" height="80" />
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
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
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
