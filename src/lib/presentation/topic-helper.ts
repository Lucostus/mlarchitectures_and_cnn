import { getDemoPreset } from '$presentation/demo-presets';
import type { DemoDefinition, TopicDefinition, TopicSlug } from '$presentation/types';

export const defineTopic = (topic: TopicDefinition) => topic;

export const defineDemo = (
	slug: TopicSlug,
	loader: DemoDefinition['component'],
	learningGoal: string
): DemoDefinition => {
	const preset = getDemoPreset(slug);

	return {
		tier: preset.tier,
		component: loader,
		learningGoal,
		controls: [preset.primary.label, preset.secondary.label, ...preset.presets.map((preset) => preset.label)]
	};
};
