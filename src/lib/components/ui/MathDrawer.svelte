<script lang="ts">
	import type { MathCard } from '$presentation/types';

	let { math } = $props<{ math: MathCard }>();
</script>

<details class="group rounded-2xl border border-white/10 bg-black/20 p-4">
	<summary class="cursor-pointer list-none">
		<div class="flex items-center justify-between gap-4">
			<div>
				<p class="font-display text-xs uppercase tracking-[0.3em] text-gold-400">Math lens</p>
				<p class="mt-2 text-sm text-sand-200/90">{math.intuition}</p>
			</div>
			<span class="text-xs text-sand-200/60 transition group-open:rotate-45">+</span>
		</div>
	</summary>

	{#if math.formula}
		<div class="mt-4 rounded-xl border border-white/8 bg-white/5 p-3 font-mono text-sm text-cyan-100">
			{math.formula}
		</div>
	{/if}

	{#if math.deepDiveMarkdown}
		<p class="mt-4 text-sm leading-6 text-sand-200/75">{math.deepDiveMarkdown}</p>
	{/if}
</details>
