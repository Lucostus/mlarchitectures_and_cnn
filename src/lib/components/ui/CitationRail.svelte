<script lang="ts">
	import type { ReferenceLink } from '$presentation/types';

	let { references = [] as ReferenceLink[] } = $props();
</script>

<aside class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
	<p class="font-display text-xs uppercase tracking-[0.3em] text-cyan-400">References</p>
	<ul class="mt-3 space-y-2 text-sm text-sand-200/90">
		{#each references as reference}
			<li>
				<a
					class="transition hover:text-white"
					href={reference.url}
					target="_blank"
					rel="noreferrer"
				>
					{reference.label}
				</a>
				{#if reference.note}
					<p class="mt-1 text-xs text-sand-200/60">{reference.note}</p>
				{/if}
			</li>
		{/each}
	</ul>
</aside>
