<script lang="ts">
	export interface RangeControl {
		id: string;
		label: string;
		min: number;
		max: number;
		step?: number;
		value: number;
		format?: (value: number) => string;
		onChange: (value: number) => void;
	}

	export interface PanelButton {
		label: string;
		onClick: () => void;
		variant?: 'solid' | 'ghost';
		active?: boolean;
	}

	let { ranges = [] as RangeControl[], buttons = [] as PanelButton[], summary = '' } = $props();
</script>

<section class="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur">
	<div class="flex items-center justify-between gap-4">
		<p class="font-display text-xs uppercase tracking-[0.3em] text-teal-400">Demo controls</p>
		{#if summary}
			<p class="text-xs text-sand-200/55">{summary}</p>
		{/if}
	</div>

	<div class="mt-4 space-y-4">
		{#each ranges as range}
			<label class="block">
				<div class="mb-2 flex items-center justify-between gap-4 text-sm">
					<span>{range.label}</span>
					<span class="text-sand-200/60">
						{range.format ? range.format(range.value) : range.value}
					</span>
				</div>
				<input
					class="h-2 w-full accent-teal-400"
					type="range"
					min={range.min}
					max={range.max}
					step={range.step ?? 1}
					value={range.value}
					oninput={(event) =>
						range.onChange(Number((event.currentTarget as HTMLInputElement).value))}
				/>
			</label>
		{/each}
	</div>

	{#if buttons.length}
		<div class="mt-4 flex flex-wrap gap-2">
			{#each buttons as button}
				<button
					class={`rounded-full border px-3 py-1.5 text-sm transition ${
						button.variant === 'ghost'
							? 'border-white/10 bg-transparent text-sand-100 hover:border-white/25 hover:bg-white/5'
							: 'border-teal-300/20 bg-teal-400/15 text-teal-100 hover:bg-teal-400/25'
					} ${button.active ? 'ring-2 ring-coral-400/40' : ''}`}
					type="button"
					onclick={button.onClick}
				>
					{button.label}
				</button>
			{/each}
		</div>
	{/if}
</section>
