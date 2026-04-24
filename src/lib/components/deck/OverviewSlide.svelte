<script lang="ts">
	import SlideFrame from '$deck/SlideFrame.svelte';
	import { FAMILY_OVERVIEW, PROBLEM_FIT_MAP } from '$presentation/overview';
</script>

<SlideFrame
	eyebrow="High-level positioning before the deep dive"
	title="What these architecture families are good at"
	accent="from-gold-400/65 via-cyan-400/45 to-coral-400/45"
>
	<div class="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
		<div class="grid gap-4 md:grid-cols-2">
			{#each FAMILY_OVERVIEW as family}
				<article class="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
					<h2 class="font-display text-xl text-white">{family.title}</h2>
					<p class="mt-2 text-sm leading-6 text-sand-100/75">{family.bestFor}</p>
					<div class="mt-4 grid gap-3 lg:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.25em] text-teal-300/80">Pros</p>
							<ul class="mt-2 space-y-2 text-sm text-sand-100/80">
								{#each family.pros as item}
									<li>{item}</li>
								{/each}
							</ul>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.25em] text-coral-300/80">Cons</p>
							<ul class="mt-2 space-y-2 text-sm text-sand-100/80">
								{#each family.cons as item}
									<li>{item}</li>
								{/each}
							</ul>
						</div>
					</div>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each family.dataFits as fit}
							<span class="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-sand-100/65">{fit}</span>
						{/each}
					</div>
				</article>
			{/each}
		</div>

		<aside class="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
			<p class="font-display text-xs uppercase tracking-[0.3em] text-cyan-300/85">Problem-to-family map</p>
			<div class="mt-4 space-y-4">
				{#each PROBLEM_FIT_MAP as row}
					<div class="rounded-2xl border border-white/8 bg-black/20 p-4">
						<h3 class="font-display text-lg text-white">{row.problem}</h3>
						<div class="mt-3 flex flex-wrap gap-2">
							{#each row.families as family}
								<span class="rounded-full border border-cyan-300/15 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-50">{family}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</aside>
	</div>
</SlideFrame>
