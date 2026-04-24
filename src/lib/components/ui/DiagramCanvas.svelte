<script lang="ts">
	let {
		width = 640,
		height = 280,
		label = 'Interactive architecture diagram',
		children
	} = $props<{
		width?: number;
		height?: number;
		label?: string;
		children?: () => unknown;
	}>();
</script>

<div class="overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-950/80 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.7)]">
	<svg
		class="h-auto w-full"
		viewBox={`0 0 ${width} ${height}`}
		role="img"
		aria-label={label}
	>
		<defs>
			<linearGradient id="demo-grid" x1="0" x2="1">
				<stop offset="0%" stop-color="rgb(78 214 202 / 0.12)" />
				<stop offset="100%" stop-color="rgb(101 207 255 / 0.04)" />
			</linearGradient>
			<pattern id="graph-paper" width="32" height="32" patternUnits="userSpaceOnUse">
				<path d="M 32 0 L 0 0 0 32" fill="none" stroke="url(#demo-grid)" stroke-width="1" />
			</pattern>
		</defs>
		<rect width={width} height={height} fill="#09111c" />
		<rect width={width} height={height} fill="url(#graph-paper)" opacity="0.9" />
		{@render children?.()}
	</svg>
</div>
