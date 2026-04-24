<script lang="ts">
	let {
		eyebrow = '',
		title,
		accent = 'from-teal-400/55 via-cyan-400/40 to-coral-400/40',
		footer = '',
		children
	} = $props<{
		eyebrow?: string;
		title: string;
		accent?: string;
		footer?: string;
		children?: () => unknown;
	}>();
</script>

<section class="relative flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/70 p-6 shadow-[0_30px_120px_-48px_rgba(0,0,0,0.9)] backdrop-blur md:p-8 xl:p-10">
	<div class={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}></div>
	<div class="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-teal-400/8 blur-3xl"></div>
	<div class="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-coral-400/8 blur-3xl"></div>

	<header class="relative z-10">
		{#if eyebrow}
			<p class="font-display text-xs uppercase tracking-[0.35em] text-cyan-300/80">{eyebrow}</p>
		{/if}
		<h1 class="mt-3 max-w-4xl font-display text-3xl leading-tight text-white md:text-5xl xl:text-6xl">
			{title}
		</h1>
	</header>

	<div class="relative z-10 mt-8 flex-1">
		{@render children?.()}
	</div>

	{#if footer}
		<footer class="relative z-10 mt-6 text-sm text-sand-200/55">{footer}</footer>
	{/if}
</section>
