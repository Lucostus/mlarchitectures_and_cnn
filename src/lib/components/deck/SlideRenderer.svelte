<script lang="ts">
	import ChapterSlide from '$deck/ChapterSlide.svelte';
	import OverviewSlide from '$deck/OverviewSlide.svelte';
	import SlideFrame from '$deck/SlideFrame.svelte';
	import TopicSlide from '$deck/TopicSlide.svelte';
	import { CHAPTERS } from '$presentation/chapters';
	import { COMPARISON_SLIDES } from '$presentation/comparisons';
	import { getTopic } from '$presentation/topic-registry';
	import type { SlideDefinition } from '$presentation/types';

	let { slide, slideNumber, totalSlides } = $props<{
		slide: SlideDefinition;
		slideNumber: number;
		totalSlides: number;
	}>();

	const chapter = $derived(slide.chapterId ? CHAPTERS.find((entry) => entry.id === slide.chapterId) : undefined);
	const topic = $derived(slide.topicSlug ? getTopic(slide.topicSlug) : undefined);
	const comparison = $derived(
		slide.kind === 'comparison' ? COMPARISON_SLIDES.find((entry) => entry.id === slide.id) : undefined
	);
</script>

{#if slide.kind === 'cover'}
	<SlideFrame eyebrow="SvelteKit + Tailwind + Cloudflare Pages" title="Machine Learning Architectures Atlas" accent="from-coral-500/70 via-gold-400/40 to-cyan-400/40" footer={`Slide ${slideNumber} of ${totalSlides}`}>
		<div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
			<div class="space-y-5">
				<p class="max-w-2xl text-xl leading-8 text-sand-100/85 md:text-2xl">
					A developer-friendly map of modern ML architectures, what they optimize, and where they actually fit.
				</p>
				<div class="grid gap-4 md:grid-cols-2">
					<div class="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
						<p class="font-display text-xs uppercase tracking-[0.3em] text-cyan-300/85">Talk frame</p>
						<ul class="mt-3 space-y-3 text-sm leading-6 text-sand-100/80">
							<li>Architecture intuition before implementation detail</li>
							<li>Interactive visual demos for every topic</li>
							<li>Tradeoffs, not hype</li>
						</ul>
					</div>
					<div class="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
						<p class="font-display text-xs uppercase tracking-[0.3em] text-gold-300/85">Audience</p>
						<ul class="mt-3 space-y-3 text-sm leading-6 text-sand-100/80">
							<li>Technical students and developers</li>
							<li>Moderate math, stronger intuition</li>
							<li>25 to 35 minute live flow</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="rounded-[2rem] border border-white/10 bg-white/5 p-6">
				<p class="font-display text-xs uppercase tracking-[0.35em] text-teal-300/80">Core families</p>
				<div class="mt-5 grid gap-3 text-sm text-sand-100/80">
					{#each [
						'Neural networks for dense, spatial, and sequential data',
						'Generative systems for latent modeling and synthesis',
						'Graph, symbolic, and physics-aware hybrids',
						'Reinforcement and evolutionary search',
						'Classical supervised baselines',
						'Unsupervised clustering and manifold learning'
					] as item}
						<div class="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">{item}</div>
					{/each}
				</div>
			</div>
		</div>
	</SlideFrame>
{:else if slide.kind === 'agenda'}
	<SlideFrame eyebrow="Roadmap" title="How the presentation is structured" accent="from-cyan-400/60 via-teal-400/40 to-gold-400/35" footer={`Slide ${slideNumber} of ${totalSlides}`}>
		<div class="grid gap-4 lg:grid-cols-2">
			{#each CHAPTERS as entry, index}
				<div class="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
					<p class="font-display text-xs uppercase tracking-[0.3em] text-sand-200/60">Chapter {index + 1}</p>
					<h2 class="mt-2 font-display text-2xl text-white">{entry.title}</h2>
					<p class="mt-2 text-sm leading-6 text-sand-100/74">{entry.summary}</p>
					<p class="mt-4 text-xs uppercase tracking-[0.25em] text-cyan-300/80">{entry.topics.length} topic slides</p>
				</div>
			{/each}
		</div>
	</SlideFrame>
{:else if slide.kind === 'overview'}
	<OverviewSlide />
{:else if slide.kind === 'chapter' && slide.chapterId}
	<ChapterSlide chapterId={slide.chapterId} />
{:else if slide.kind === 'topic' && topic}
	<TopicSlide topic={topic} />
{:else if slide.kind === 'comparison' && comparison}
	<SlideFrame eyebrow={comparison.eyebrow} title={comparison.title} accent="from-cyan-400/65 via-gold-400/35 to-coral-400/35">
		<div class="grid gap-4 md:grid-cols-2">
			{#each comparison.rows as row}
				<div class="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
					<p class="text-sm uppercase tracking-[0.2em] text-cyan-300/75">Scenario</p>
					<h2 class="mt-2 font-display text-xl text-white">{row[0]}</h2>
					<p class="mt-3 text-sm leading-6 text-sand-100/80">{row[1]}</p>
				</div>
			{/each}
		</div>
	</SlideFrame>
{:else if slide.kind === 'closing'}
	<SlideFrame eyebrow="Takeaways" title="How to choose an architecture responsibly" accent="from-lime-400/55 via-teal-400/40 to-cyan-400/40">
		<div class="grid gap-4 md:grid-cols-2">
			{#each [
				'Match architecture to data geometry first: spatial, sequential, relational, or tabular.',
				'Strong baselines still win when data is limited, compute is tight, or interpretability matters.',
				'Modern generative and attention-based systems are powerful, but they move cost and stability upward.',
				'Hybrids matter when domain structure already exists and should not be ignored.',
				'Interactive understanding usually beats memorizing benchmark names.',
				'Architecture choice is a tradeoff among performance, data, latency, explainability, and maintenance.'
			] as point}
				<div class="rounded-[1.6rem] border border-white/10 bg-black/20 p-5 text-sm leading-6 text-sand-100/82">
					{point}
				</div>
			{/each}
		</div>
	</SlideFrame>
{:else if slide.kind === 'references'}
	<SlideFrame eyebrow="Source trail" title="References and canonical sources" accent="from-sand-200/45 via-cyan-400/30 to-coral-400/30">
		<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
			{#each [
				['Deep learning texts', 'Goodfellow, Bengio, Courville; Dive into Deep Learning; Stanford CS resources'],
				['Foundational papers', 'Original architecture papers are linked directly on each topic slide'],
				['Practical references', 'Scikit-learn docs, XGBoost docs, LightGBM docs, CatBoost docs'],
				['Sequence models', 'RNN/LSTM/GRU and Transformer primary papers'],
				['Generative models', 'VAE, GAN, and DDPM primary papers'],
				['Graph and hybrid systems', 'Survey papers and original method papers']
			] as row}
				<div class="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
					<h2 class="font-display text-xl text-white">{row[0]}</h2>
					<p class="mt-3 text-sm leading-6 text-sand-100/80">{row[1]}</p>
				</div>
			{/each}
		</div>
	</SlideFrame>
{/if}
