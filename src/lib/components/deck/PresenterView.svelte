<script lang="ts">
	import SlideRenderer from '$deck/SlideRenderer.svelte';
	import type { SlideDefinition } from '$presentation/types';

	let { currentSlide, nextSlide, currentIndex, totalSlides, elapsedSeconds } = $props<{
		currentSlide: SlideDefinition;
		nextSlide: SlideDefinition;
		currentIndex: number;
		totalSlides: number;
		elapsedSeconds: number;
	}>();

	const formatTime = (value: number) => {
		const minutes = Math.floor(value / 60)
			.toString()
			.padStart(2, '0');
		const seconds = Math.floor(value % 60)
			.toString()
			.padStart(2, '0');

		return `${minutes}:${seconds}`;
	};
</script>

<div class="grid gap-6 xl:grid-cols-[1.45fr_0.7fr]">
	<div>
		<SlideRenderer slide={currentSlide} slideNumber={currentIndex + 1} totalSlides={totalSlides} />
	</div>

	<aside class="space-y-4">
		<section class="rounded-[1.8rem] border border-white/10 bg-ink-900/75 p-5 backdrop-blur">
			<p class="font-display text-xs uppercase tracking-[0.3em] text-teal-300/85">Presenter HUD</p>
			<div class="mt-4 grid grid-cols-2 gap-4 text-sm">
				<div class="rounded-2xl border border-white/8 bg-black/20 p-4">
					<p class="text-sand-200/55">Slide</p>
					<p class="mt-2 font-display text-3xl text-white">{currentIndex + 1}/{totalSlides}</p>
				</div>
				<div class="rounded-2xl border border-white/8 bg-black/20 p-4">
					<p class="text-sand-200/55">Elapsed</p>
					<p class="mt-2 font-display text-3xl text-white">{formatTime(elapsedSeconds)}</p>
				</div>
			</div>
			<p class="mt-4 text-sm leading-6 text-sand-100/76">{currentSlide.notes}</p>
		</section>

		<section class="rounded-[1.8rem] border border-white/10 bg-ink-900/75 p-5 backdrop-blur">
			<p class="font-display text-xs uppercase tracking-[0.3em] text-gold-300/85">Next slide</p>
			<div class="mt-4 scale-[0.58] origin-top-left">
				<div class="w-[168%]">
					<SlideRenderer slide={nextSlide} slideNumber={currentIndex + 2} totalSlides={totalSlides} />
				</div>
			</div>
		</section>
	</aside>
</div>
