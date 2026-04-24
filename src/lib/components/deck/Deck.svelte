<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import PresenterView from '$deck/PresenterView.svelte';
	import SlideRenderer from '$deck/SlideRenderer.svelte';
	import { clampSlideIndex, getSlideIndexFromHash } from '$presentation/navigation';
	import { SLIDES } from '$presentation/slide-order';

	let currentIndex = $state(0);
	let elapsedSeconds = $state(0);

	const isPresenter = $derived(page.url.searchParams.get('presenter') === '1');
	const currentSlide = $derived(SLIDES[currentIndex]);
	const nextSlide = $derived(SLIDES[Math.min(currentIndex + 1, SLIDES.length - 1)]);

	const goTo = (index: number) => {
		currentIndex = clampSlideIndex(index, SLIDES);
	};

	const syncHash = () => {
		if (!browser) {
			return;
		}

		const targetHash = `#/${SLIDES[currentIndex].id}`;
		if (window.location.hash !== targetHash) {
			window.history.replaceState({}, '', `${page.url.pathname}${page.url.search}${targetHash}`);
		}
	};

	const handleHashChange = () => {
		if (!browser) {
			return;
		}

		currentIndex = getSlideIndexFromHash(window.location.hash, SLIDES);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		const target = event.target as HTMLElement | null;
		const tag = target?.tagName ?? '';
		const isRange = tag === 'INPUT' && (target as HTMLInputElement | null)?.type === 'range';

		if (isRange && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
			return;
		}

		if (['ArrowRight', ' ', 'PageDown'].includes(event.key)) {
			event.preventDefault();
			goTo(currentIndex + 1);
		}

		if (['ArrowLeft', 'PageUp'].includes(event.key)) {
			event.preventDefault();
			goTo(currentIndex - 1);
		}

		if (event.key === 'Home') {
			event.preventDefault();
			goTo(0);
		}

		if (event.key === 'End') {
			event.preventDefault();
			goTo(SLIDES.length - 1);
		}
	};

	onMount(() => {
		currentIndex = getSlideIndexFromHash(window.location.hash, SLIDES);

		const timerId = window.setInterval(() => {
			elapsedSeconds += 1;
		}, 1000);

		window.addEventListener('hashchange', handleHashChange);

		return () => {
			window.clearInterval(timerId);
			window.removeEventListener('hashchange', handleHashChange);
		};
	});

	$effect(() => {
		if (!browser) {
			return;
		}

		syncHash();
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<main class="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-5 px-4 py-4 md:px-6 xl:px-8">
	<nav class="flex flex-wrap items-center justify-between gap-3 rounded-[1.4rem] border border-white/10 bg-ink-900/70 px-4 py-3 backdrop-blur">
		<div>
			<p class="font-display text-sm uppercase tracking-[0.28em] text-cyan-300/80">ML Architectures Atlas</p>
			<p class="mt-1 text-sm text-sand-100/65">
				Slide {currentIndex + 1} of {SLIDES.length}
			</p>
		</div>

		<div class="flex flex-wrap gap-2">
			<button class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sand-100 transition hover:border-white/20 hover:bg-white/10" type="button" onclick={() => goTo(currentIndex - 1)}>
				Prev
			</button>
			<button class="rounded-full border border-teal-300/20 bg-teal-400/15 px-4 py-2 text-sm text-teal-100 transition hover:bg-teal-400/25" type="button" onclick={() => goTo(currentIndex + 1)}>
				Next
			</button>
		</div>
	</nav>

	{#if isPresenter}
		<PresenterView
			currentSlide={currentSlide}
			nextSlide={nextSlide}
			currentIndex={currentIndex}
			totalSlides={SLIDES.length}
			elapsedSeconds={elapsedSeconds}
		/>
	{:else}
		<SlideRenderer slide={currentSlide} slideNumber={currentIndex + 1} totalSlides={SLIDES.length} />
	{/if}
</main>
