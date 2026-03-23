<script lang="ts">
	import { drawingState } from '$lib/stores/drawing.svelte';

	const EASTERN_ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

	let answer = $state('');
	let shaking = $state(false);
	let errorMessage = $state('');
	let operandA = $state(0);
	let operandB = $state(0);
	let inputElement = $state<HTMLInputElement | null>(null);

	function toEasternArabic(number: number): string {
		return String(number)
			.split('')
			.map((digit) => EASTERN_ARABIC_DIGITS[parseInt(digit)])
			.join('');
	}

	function normalizeDigits(input: string): string {
		return input.replace(/[٠-٩]/g, (d) => String(EASTERN_ARABIC_DIGITS.indexOf(d)));
	}

	function generateProblem(): void {
		operandA = 2 + Math.floor(Math.random() * 7);
		operandB = 2 + Math.floor(Math.random() * 7);
	}

	function closeGate(): void {
		drawingState.isParentGateOpen = false;
		answer = '';
		errorMessage = '';
	}

	function check(): void {
		const normalized = parseInt(normalizeDigits(answer));
		if (normalized === operandA + operandB) {
			closeGate();
			if (document.fullscreenElement && document.exitFullscreen) {
				document.exitFullscreen().catch(() => {});
			}
		} else {
			shaking = true;
			errorMessage = 'إجابة خطأ، حاول مرة أخرى';
			answer = '';
			setTimeout(() => { shaking = false; }, 500);
		}
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') check();
		if (event.key === 'Escape') closeGate();
	}

	$effect(() => {
		if (drawingState.isParentGateOpen) {
			generateProblem();
			answer = '';
			requestAnimationFrame(() => inputElement?.focus());
		}
	});
</script>

{#if drawingState.isParentGateOpen}
	<div class="overlay" role="dialog" aria-labelledby="gate-title" aria-modal="true">
		<div class="gate-card">
			<h2 id="gate-title">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:middle;margin-inline-end:8px;">
					<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
					<path d="M7 11V7a5 5 0 0 1 10 0v4" />
				</svg>
				تحقق من الأهل
			</h2>
			<p>أجب على هذه المسألة للخروج</p>

			<div class="math-problem" aria-live="polite">
				{toEasternArabic(operandA)} + {toEasternArabic(operandB)} = ؟
			</div>

			<label for="gate-answer" class="sr-only">الإجابة</label>
			<input
				id="gate-answer"
				bind:this={inputElement}
				bind:value={answer}
				class="gate-input"
				class:shake={shaking}
				type="text"
				inputmode="numeric"
				placeholder="؟"
				onkeydown={handleKeydown}
			/>

			{#if errorMessage}
				<p class="gate-error" role="alert">{errorMessage}</p>
			{/if}

			<button class="gate-submit" onclick={check}>تحقق</button>
		</div>

		<button class="gate-cancel" onclick={closeGate}>إلغاء</button>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(26, 26, 46, 0.97);
		z-index: 1000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		animation: fadeIn 200ms ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.gate-card {
		background: white;
		border-radius: 28px;
		padding: 40px;
		max-width: 380px;
		width: 90%;
		text-align: center;
		color: var(--color-black);
	}

	.gate-card h2 {
		font-size: 1.5rem;
		font-weight: 800;
		margin-bottom: 8px;
	}

	.gate-card p {
		font-size: 1rem;
		color: #7f8c8d;
		margin-bottom: 24px;
		line-height: 1.5;
	}

	.math-problem {
		font-size: 2.5rem;
		font-weight: 800;
		color: #6c5ce7;
		background: #f8f4ff;
		border-radius: 16px;
		padding: 20px;
		margin-bottom: 20px;
		letter-spacing: 4px;
		direction: ltr;
	}

	.gate-input {
		width: 120px;
		height: 56px;
		border: 3px solid #ddd;
		border-radius: 14px;
		font-size: 1.75rem;
		text-align: center;
		font-family: var(--font-family);
		font-weight: 700;
		outline: none;
		transition: border-color var(--transition-fast);
		direction: ltr;
		display: block;
		margin: 0 auto;
	}

	.gate-input:focus { border-color: #6c5ce7; }

	.gate-input.shake {
		animation: shake 400ms ease;
		border-color: var(--color-red);
	}

	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		20% { transform: translateX(-8px); }
		40% { transform: translateX(8px); }
		60% { transform: translateX(-6px); }
		80% { transform: translateX(6px); }
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.gate-error {
		color: var(--color-red);
		font-size: 0.875rem;
		font-weight: 600;
		margin-top: 8px;
	}

	.gate-submit {
		display: block;
		width: 100%;
		height: 52px;
		border-radius: 14px;
		background: linear-gradient(135deg, #6c5ce7, #a29bfe);
		color: white;
		font-size: 1.125rem;
		font-weight: 700;
		margin-top: 16px;
		transition: transform var(--transition-fast);
	}

	.gate-submit:active { transform: scale(0.97); }

	.gate-cancel {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.875rem;
		margin-top: 16px;
		font-family: var(--font-family);
	}

	.gate-cancel:hover { color: rgba(255, 255, 255, 0.7); }
</style>
