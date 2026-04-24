<script lang="ts">
	import SlideFrame from '$deck/SlideFrame.svelte';
	import { CHAPTERS } from '$presentation/chapters';
	import type { ChapterId } from '$presentation/types';

	let { chapterId } = $props<{ chapterId: ChapterId }>();

	const chapter = CHAPTERS.find((entry) => entry.id === chapterId);
</script>

{#if chapter}
	<SlideFrame eyebrow={chapter.kicker} title={chapter.title} accent={chapter.accent} footer={chapter.summary}>
		<div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
			<div class="rounded-[1.75rem] border border-white/10 bg-black/20 p-6">
				<p class="text-lg leading-8 text-sand-100/90">{chapter.summary}</p>
			</div>

			<div class="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
				<p class="font-display text-xs uppercase tracking-[0.3em] text-gold-400">Inside this chapter</p>
				<ul class="mt-4 space-y-3 text-sand-100/85">
					{#each chapter.topics as topic}
						<li class="rounded-xl border border-white/8 bg-white/5 px-4 py-3">{topic}</li>
					{/each}
				</ul>
			</div>
		</div>
	</SlideFrame>
{/if}
