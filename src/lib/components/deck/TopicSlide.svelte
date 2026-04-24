<script lang="ts">
	import SlideFrame from '$deck/SlideFrame.svelte';
	import CitationRail from '$ui/CitationRail.svelte';
	import MathDrawer from '$ui/MathDrawer.svelte';
	import type { TopicDefinition } from '$presentation/types';

	let { topic } = $props<{ topic: TopicDefinition }>();
</script>

<SlideFrame eyebrow={topic.family} title={topic.title} footer={topic.oneLiner}>
	<div class="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
		<div class="space-y-5">
			<section class="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
				<p class="text-lg leading-7 text-sand-100/88">{topic.intuition}</p>
				<div class="mt-5 grid gap-4 md:grid-cols-2">
					<div>
						<p class="font-display text-xs uppercase tracking-[0.3em] text-cyan-300/85">How it works</p>
						<ul class="mt-3 space-y-3 text-sm leading-6 text-sand-100/80">
							{#each topic.architectureBullets as bullet}
								<li>{bullet}</li>
							{/each}
						</ul>
					</div>
					<div>
						<p class="font-display text-xs uppercase tracking-[0.3em] text-teal-300/85">Best use cases</p>
						<ul class="mt-3 space-y-3 text-sm leading-6 text-sand-100/80">
							{#each topic.useCases as useCase}
								<li>{useCase}</li>
							{/each}
						</ul>
					</div>
				</div>
			</section>

			<section class="grid gap-4 md:grid-cols-2">
				<div class="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
					<p class="font-display text-xs uppercase tracking-[0.3em] text-lime-300/85">Strengths</p>
					<ul class="mt-3 space-y-3 text-sm leading-6 text-sand-100/80">
						{#each topic.strengths as strength}
							<li>{strength}</li>
						{/each}
					</ul>
				</div>
				<div class="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
					<p class="font-display text-xs uppercase tracking-[0.3em] text-coral-300/85">Weaknesses</p>
					<ul class="mt-3 space-y-3 text-sm leading-6 text-sand-100/80">
						{#each topic.weaknesses as weakness}
							<li>{weakness}</li>
						{/each}
					</ul>
				</div>
			</section>

			<MathDrawer math={topic.math} />
		</div>

		<div class="space-y-5">
			<section class="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
				<div class="mb-4 flex items-center justify-between gap-4">
					<div>
						<p class="font-display text-xs uppercase tracking-[0.3em] text-gold-300/85">Interactive example</p>
						<p class="mt-1 text-sm text-sand-200/70">{topic.demo.learningGoal}</p>
					</div>
					<span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-sand-100/70">
						{topic.demo.tier}
					</span>
				</div>

				{#await topic.demo.component() then module}
					{@const DemoComponent = module.default}
					<DemoComponent />
				{:catch error}
					<div class="rounded-2xl border border-coral-400/20 bg-coral-400/10 p-4 text-sm text-coral-100">
						Demo failed to load: {error.message}
					</div>
				{/await}
			</section>

			<CitationRail references={topic.references} />
		</div>
	</div>
</SlideFrame>
