<script lang="ts">
	import ControlPanel from '$ui/ControlPanel.svelte';
	import DiagramCanvas from '$ui/DiagramCanvas.svelte';
	import { getDemoPreset, type DemoKind } from '$presentation/demo-presets';
	import type { TopicSlug } from '$presentation/types';

	const TAU = Math.PI * 2;

	let { slug } = $props<{ slug: TopicSlug }>();

	const config = $derived(getDemoPreset(slug));

	let primary = $state(config.primary.initial);
	let secondary = $state(config.secondary.initial);
	let playing = $state(false);
	let tick = $state(0);

	const applyPreset = (preset: (typeof config.presets)[number]) => {
		primary = preset.primary;
		secondary = preset.secondary;
	};

	const reset = () => {
		primary = config.primary.initial;
		secondary = config.secondary.initial;
		tick = 0;
		playing = false;
	};

	$effect(() => {
		if (!playing) {
			return;
		}

		const id = window.setInterval(() => {
			tick += 1;
		}, 800);

		return () => window.clearInterval(id);
	});

	const derivedPoints = $derived.by(() => {
		const points: { x: number; y: number; label?: string; cluster?: number }[] = [];
		const count = Math.max(8, Math.round(primary * 2));

		for (let index = 0; index < count; index += 1) {
			const angle = (index / count) * TAU + tick * 0.1;
			const radius = 36 + (secondary * 64 * ((index % 3) + 1)) / 3;
			points.push({
				x: 160 + Math.cos(angle) * radius + index * 10,
				y: 144 + Math.sin(angle * 1.3) * radius * 0.45,
				cluster: index % Math.max(2, Math.round(primary / 2))
			});
		}

		return points;
	});

	const ranges = $derived([
		{
			id: `${slug}-primary`,
			label: config.primary.label,
			min: config.primary.min,
			max: config.primary.max,
			step: config.primary.step,
			value: primary,
			format: config.primary.format,
			onChange: (value: number) => (primary = value)
		},
		{
			id: `${slug}-secondary`,
			label: config.secondary.label,
			min: config.secondary.min,
			max: config.secondary.max,
			step: config.secondary.step,
			value: secondary,
			format: config.secondary.format,
			onChange: (value: number) => (secondary = value)
		}
	]);

	const buttons = $derived([
		...config.presets.map((preset) => ({
			label: preset.label,
			onClick: () => applyPreset(preset),
			variant: 'ghost' as const
		})),
		{
			label: playing ? 'Pause' : 'Play',
			onClick: () => (playing = !playing),
			variant: 'solid' as const,
			active: playing
		},
		{
			label: 'Reset',
			onClick: reset,
			variant: 'ghost' as const
		}
	]);

	const accent = (index: number) =>
		['#4ed6ca', '#65cfff', '#f5c65c', '#ff8661', '#9dd15e'][index % 5];

	const renderKind = (kind: DemoKind) => kind;
</script>

<div class="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
	<div class="space-y-4">
		<DiagramCanvas label={`${slug} interactive demo`}>
			{#if renderKind(config.kind) === 'network'}
				{#each Array.from({ length: Math.round(primary) }) as _, layerIndex}
					{#each Array.from({ length: 3 + (layerIndex % 3) }) as __, nodeIndex}
						<circle
							cx={95 + layerIndex * 96}
							cy={80 + nodeIndex * 42}
							r={8 + secondary * 4}
							fill={accent(layerIndex + nodeIndex)}
							fill-opacity={0.65}
						/>
						{#if layerIndex < Math.round(primary) - 1}
							<line
								x1={103 + layerIndex * 96}
								y1={80 + nodeIndex * 42}
								x2={175 + layerIndex * 96}
								y2={86 + (((nodeIndex + tick) % 4) + 1) * 34}
								stroke="#65cfff"
								stroke-opacity={0.12 + secondary * 0.4}
								stroke-width="2"
							/>
						{/if}
					{/each}
				{/each}
			{:else if renderKind(config.kind) === 'image-grid'}
				{#each Array.from({ length: 8 }) as _, row}
					{#each Array.from({ length: 8 }) as __, column}
						<rect
							x={96 + column * 34}
							y={40 + row * 26}
							width="28"
							height="20"
							rx="4"
							fill={accent((row + column + tick) % 5)}
							fill-opacity={(row + column) % 3 === 0 ? 0.8 : 0.25}
						/>
					{/each}
				{/each}
				<rect
					x={90 + (tick % 4) * secondary * 10}
					y={36 + (tick % 3) * 10}
					width={Math.round(primary) * 34}
					height={Math.round(primary) * 26}
					fill="none"
					stroke="#f5c65c"
					stroke-width="3"
					stroke-dasharray="8 6"
				/>
			{:else if renderKind(config.kind) === 'sequence'}
				{#each Array.from({ length: Math.round(primary) }) as _, index}
					<rect
						x={58 + index * 58}
						y="64"
						width="40"
						height="28"
						rx="10"
						fill="#192230"
						stroke="#4ed6ca"
						stroke-opacity="0.4"
					/>
					<rect
						x={58 + index * 58}
						y={124 - secondary * index * 6}
						width="40"
						height={20 + secondary * 26}
						rx="10"
						fill="#4ed6ca"
						fill-opacity={0.18 + index / 16}
					/>
					{#if index < Math.round(primary) - 1}
						<path
							d={`M ${98 + index * 58} 78 C ${110 + index * 58} 78, ${110 + index * 58} 78, ${116 + index * 58} 78`}
							fill="none"
							stroke="#65cfff"
							stroke-width="3"
							stroke-opacity={0.3 + secondary * 0.45}
							marker-end="url(#arrow-seq)"
						/>
					{/if}
				{/each}
				<defs>
					<marker id="arrow-seq" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
						<path d="M 0 0 L 8 4 L 0 8 z" fill="#65cfff" />
					</marker>
				</defs>
			{:else if renderKind(config.kind) === 'attention'}
				{#each Array.from({ length: Math.round(primary) }) as _, row}
					{#each Array.from({ length: Math.round(primary) }) as __, column}
						<rect
							x={120 + column * 38}
							y={40 + row * 30}
							width="28"
							height="22"
							rx="6"
							fill="#65cfff"
							fill-opacity={(1 - Math.abs(row - column) / Math.round(primary)) * secondary}
						/>
					{/each}
				{/each}
				{#each Array.from({ length: Math.round(primary) }) as _, index}
					<text x={88} y={56 + index * 30} fill="#f5f1e8" font-size="12">t{index + 1}</text>
					<text x={128 + index * 38} y={28} fill="#f5f1e8" font-size="12">t{index + 1}</text>
				{/each}
			{:else if renderKind(config.kind) === 'latent'}
				{#each derivedPoints as point}
					<circle cx={point.x - 55} cy={point.y} r="6" fill={accent(point.cluster ?? 0)} fill-opacity="0.7" />
					<circle cx={point.x + 165} cy={point.y + (secondary - 0.5) * 18} r="6" fill={accent(point.cluster ?? 0)} fill-opacity="0.45" />
					<line x1={point.x - 55} y1={point.y} x2="320" y2="142" stroke="#65cfff" stroke-opacity="0.08" />
					<line x1="320" y1="142" x2={point.x + 165} y2={point.y + (secondary - 0.5) * 18} stroke="#4ed6ca" stroke-opacity="0.08" />
				{/each}
				<rect x="290" y="102" width={18 + primary * 6} height="80" rx="9" fill="#f5c65c" fill-opacity="0.75" />
			{:else if renderKind(config.kind) === 'adversarial'}
				<circle cx="190" cy="138" r={34 + primary * 8} fill="#4ed6ca" fill-opacity="0.18" stroke="#4ed6ca" stroke-dasharray="8 8" />
				<circle cx="420" cy="138" r={24 + secondary * 34} fill="#ff8661" fill-opacity="0.18" stroke="#ff8661" stroke-dasharray="8 8" />
				<rect x="275" y="70" width="80" height="44" rx="14" fill="#65cfff" fill-opacity="0.25" stroke="#65cfff" />
				<rect x="275" y="164" width="80" height="44" rx="14" fill="#f5c65c" fill-opacity="0.2" stroke="#f5c65c" />
				<path d="M 225 138 C 250 138, 252 92, 275 92" fill="none" stroke="#4ed6ca" stroke-width="3" />
				<path d="M 355 92 C 386 92, 388 138, 396 138" fill="none" stroke="#65cfff" stroke-width="3" />
				<path d="M 395 138 C 388 138, 386 186, 355 186" fill="none" stroke="#ff8661" stroke-width="3" />
			{:else if renderKind(config.kind) === 'diffusion'}
				{#each Array.from({ length: Math.round(primary) }) as _, step}
					<g transform={`translate(${70 + step * 46}, 118)`}>
						<circle r={16 + step * 2} fill="#65cfff" fill-opacity={Math.max(0.06, 0.4 - step * 0.03)} />
						<circle r="4" fill="#f5f1e8" fill-opacity={1 - step / (Math.round(primary) + 1)} />
					</g>
				{/each}
				<path d="M 420 138 C 470 138, 518 120, 548 86" fill="none" stroke="#f5c65c" stroke-width="4" stroke-dasharray="10 8" />
				<path d="M 420 138 C 470 138, 518 160, 548 194" fill="none" stroke="#4ed6ca" stroke-width="4" stroke-dasharray="10 8" />
			{:else if renderKind(config.kind) === 'graph' || renderKind(config.kind) === 'hybrid'}
				{#each [
					[150, 80],
					[280, 58],
					[420, 96],
					[230, 188],
					[380, 208],
					[510, 164]
				] as node, index}
					{#if index < 5}
						<line x1={node[0]} y1={node[1]} x2={[280,420,380,380,510][index]} y2={[58,96,208,208,164][index]} stroke="#65cfff" stroke-opacity={0.15 + secondary * 0.4} stroke-width="3" />
					{/if}
					<circle cx={node[0]} cy={node[1]} r={12 + primary * 2} fill={accent(index)} fill-opacity="0.75" />
				{/each}
				{#if renderKind(config.kind) === 'hybrid'}
					{#each [0, 1, 2] as source}
						<path
							d={`M ${150 + source * 130} ${80 - source * 22} C 320 20, 360 20, 510 164`}
							fill="none"
							stroke="#f5c65c"
							stroke-opacity={0.12 + secondary * 0.3}
							stroke-width="2"
							stroke-dasharray="6 6"
						/>
					{/each}
				{/if}
			{:else if renderKind(config.kind) === 'gridworld'}
				{#each Array.from({ length: 5 }) as _, row}
					{#each Array.from({ length: 7 }) as __, column}
						<rect
							x={70 + column * 70}
							y={38 + row * 42}
							width="58"
							height="30"
							rx="8"
							fill={(row === 1 && column === 5) || (row === 3 && column === 1) ? '#ff8661' : row === 4 && column === 6 ? '#9dd15e' : '#192230'}
							fill-opacity={row === 4 && column === 6 ? 0.95 : 0.9}
							stroke="#ffffff12"
						/>
						<path
							d={`M ${99 + column * 70} ${53 + row * 42} l ${8 + secondary * 10} 0 m -4 -4 l 4 4 l -4 4`}
							fill="none"
							stroke="#4ed6ca"
							stroke-opacity={0.18 + (column / 7) * secondary}
							stroke-width="2"
						/>
					{/each}
				{/each}
			{:else if renderKind(config.kind) === 'tree'}
				{#each Array.from({ length: Math.round(primary) }) as _, depth}
					{#each Array.from({ length: 2 ** Math.min(depth, 3) }) as __, index}
						<circle
							cx={320 + (index - (2 ** Math.min(depth, 3) - 1) / 2) * (140 / (depth + 1))}
							cy={46 + depth * 48}
							r={10 - depth * 0.8}
							fill={accent(depth)}
						/>
						{#if depth > 0}
							<line
								x1={320 + (index - (2 ** Math.min(depth, 3) - 1) / 2) * (140 / (depth + 1))}
								y1={46 + depth * 48}
								x2={320 + ((Math.floor(index / 2) - (2 ** Math.min(depth - 1, 3) - 1) / 2) * (140 / depth || 0))}
								y2={46 + (depth - 1) * 48}
								stroke="#65cfff"
								stroke-opacity={0.18 + secondary * 0.35}
							/>
						{/if}
					{/each}
				{/each}
			{:else if renderKind(config.kind) === 'boundary'}
				{#each derivedPoints as point}
					<circle cx={point.x + 60} cy={point.y - 18} r="6" fill={accent(point.cluster ?? 0)} fill-opacity="0.72" />
				{/each}
				<path
					d={`M 84 ${220 - secondary * 90} C 210 ${120 - primary * 5}, 330 ${126 + primary * 4}, 560 ${68 + secondary * 60}`}
					fill="none"
					stroke="#f5c65c"
					stroke-width="4"
				/>
			{:else if renderKind(config.kind) === 'probabilistic'}
				{#each Array.from({ length: Math.round(primary) }) as _, index}
					<circle cx={92 + index * 86} cy={110 + (index % 2) * 58} r={18 + secondary * 8} fill={accent(index)} fill-opacity="0.28" stroke={accent(index)} stroke-opacity="0.7" />
					{#if index < Math.round(primary) - 1}
						<path d={`M ${108 + index * 86} ${110 + (index % 2) * 58} C ${140 + index * 86} ${76 + (index % 2) * 48}, ${160 + index * 86} ${160 - (index % 2) * 38}, ${176 + index * 86} ${110 + ((index + 1) % 2) * 58}`} fill="none" stroke="#65cfff" stroke-width="3" stroke-opacity={0.18 + secondary * 0.4} />
					{/if}
				{/each}
			{:else if renderKind(config.kind) === 'cluster'}
				{#each Array.from({ length: Math.round(primary) }) as _, clusterIndex}
					{#each Array.from({ length: 6 }) as __, pointIndex}
						<circle
							cx={120 + clusterIndex * 90 + Math.cos(pointIndex + tick * 0.1) * secondary * 18}
							cy={90 + (clusterIndex % 2) * 82 + Math.sin(pointIndex * 1.2) * secondary * 18}
							r="6"
							fill={accent(clusterIndex)}
							fill-opacity="0.7"
						/>
					{/each}
					<circle
						cx={120 + clusterIndex * 90}
						cy={90 + (clusterIndex % 2) * 82}
						r="13"
						fill="none"
						stroke={accent(clusterIndex)}
						stroke-width="3"
						stroke-dasharray="6 4"
					/>
				{/each}
			{:else if renderKind(config.kind) === 'manifold'}
				{#each derivedPoints as point}
					<circle cx={point.x + 30} cy={point.y - 30} r="5" fill={accent(point.cluster ?? 0)} fill-opacity="0.35" />
					<circle cx={340 + Math.cos((point.x + tick * 6) / 60) * 110} cy={140 + Math.sin((point.y + tick * 4) / 48) * 60} r="5" fill={accent(point.cluster ?? 0)} fill-opacity="0.75" />
					<line x1={point.x + 30} y1={point.y - 30} x2={340 + Math.cos((point.x + tick * 6) / 60) * 110} y2={140 + Math.sin((point.y + tick * 4) / 48) * 60} stroke="#65cfff" stroke-opacity="0.06" />
				{/each}
			{:else if renderKind(config.kind) === 'evolution'}
				{#each Array.from({ length: Math.round(primary) }) as _, index}
					<rect
						x={76 + index * 32}
						y={160 - ((index + tick) % 6) * secondary * 18}
						width="18"
						height={48 + ((index + tick) % 6) * secondary * 18}
						rx="6"
						fill={accent(index)}
						fill-opacity={0.38 + index / 30}
					/>
				{/each}
				<path d="M 70 180 C 160 82, 250 180, 340 92 S 500 170, 560 60" fill="none" stroke="#9dd15e" stroke-width="4" stroke-dasharray="12 8" />
			{:else if renderKind(config.kind) === 'scientific'}
				<path d="M 84 194 C 130 60, 176 60, 220 194 S 310 320, 360 136 S 450 38, 556 152" fill="none" stroke="#65cfff" stroke-width="4" />
				<path d="M 84 212 L 556 212" fill="none" stroke="#ff8661" stroke-width="2" stroke-dasharray="10 6" stroke-opacity={0.3 + secondary * 0.4} />
				{#each Array.from({ length: Math.round(primary) }) as _, index}
					<circle cx={110 + index * 72} cy={212} r="8" fill="#f5c65c" fill-opacity="0.75" />
				{/each}
			{:else if renderKind(config.kind) === 'meta'}
				{#each Array.from({ length: Math.round(primary) }) as _, index}
					<rect x={84 + index * 54} y={52 + (index % 2) * 54} width="40" height="26" rx="8" fill={accent(index)} fill-opacity="0.35" stroke={accent(index)} stroke-opacity="0.75" />
					<path d={`M ${104 + index * 54} ${78 + (index % 2) * 54} C ${180 + index * 24} 138, 240 150, 320 138`} fill="none" stroke="#65cfff" stroke-opacity="0.16" />
				{/each}
				<circle cx="322" cy="138" r={20 + secondary * 12} fill="#f5c65c" fill-opacity="0.55" />
				<path d="M 352 138 C 406 118, 450 102, 548 74" fill="none" stroke="#4ed6ca" stroke-width="3" />
				<path d="M 352 138 C 406 146, 450 166, 548 214" fill="none" stroke="#ff8661" stroke-width="3" />
			{/if}
		</DiagramCanvas>

		<p class="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-sand-200/75">
			{config.summary}
			<span class="ml-2 text-cyan-300/80">{config.presets[0]?.note}</span>
		</p>
	</div>

	<ControlPanel ranges={ranges} buttons={buttons} summary={`${config.tier} demo`} />
</div>
