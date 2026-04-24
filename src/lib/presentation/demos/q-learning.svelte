<script lang="ts">
	import TopicDemo from '$lib/components/demos/TopicDemo.svelte';
	import { getDemoPreset } from '$presentation/demo-presets';

	const config = getDemoPreset('q-learning');
</script>

<TopicDemo {config} />
