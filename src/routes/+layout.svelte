<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>ML Architectures Atlas</title>
	<meta
		name="description"
		content="Interactive SvelteKit presentation covering modern machine learning architectures."
	/>
</svelte:head>

<div class="grain-overlay min-h-screen">
	{@render children()}
</div>
