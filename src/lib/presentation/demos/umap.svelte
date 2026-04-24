<script lang="ts">
	import TopicDemo from '$lib/components/demos/TopicDemo.svelte';
	import { getDemoPreset } from '$presentation/demo-presets';

	const config = getDemoPreset('umap');
</script>

<TopicDemo {config} />
