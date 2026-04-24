import { CHAPTERS } from '$presentation/chapters';
import type { SlideDefinition } from '$presentation/types';

export const SLIDES: SlideDefinition[] = [
	{
		id: 'cover',
		kind: 'cover',
		title: 'Machine Learning Architectures Atlas',
		notes: 'Start broad: the talk is an architectural map, not a benchmark leaderboard.'
	},
	{
		id: 'agenda',
		kind: 'agenda',
		title: 'Agenda',
		notes: 'Move from a high-level orientation into concrete architecture families.'
	},
	{
		id: 'overview',
		kind: 'overview',
		title: 'Architecture Overview',
		notes: 'Position the families before diving into individual models.'
	},
	...CHAPTERS.flatMap((chapter) => [
		{
			id: chapter.id,
			kind: 'chapter' as const,
			title: chapter.title,
			chapterId: chapter.id,
			notes: `${chapter.kicker}. ${chapter.summary}`
		},
		...chapter.topics.map((slug) => ({
			id: slug,
			kind: 'topic' as const,
			title: slug,
			topicSlug: slug,
			chapterId: chapter.id,
			notes: `Explain ${slug} in one mental model first, then show the demo.`
		}))
	]),
	{
		id: 'comparison-model-selection',
		kind: 'comparison',
		title: 'Model Selection Heuristics',
		notes: 'Reframe the presentation as a decision aid.'
	},
	{
		id: 'comparison-training-tradeoffs',
		kind: 'comparison',
		title: 'Training and Deployment Tradeoffs',
		notes: 'Point out that simple models still matter when constraints are real.'
	},
	{
		id: 'closing',
		kind: 'closing',
		title: 'Key Takeaways',
		notes: 'There is no universal winner; architecture should match data geometry and constraints.'
	},
	{
		id: 'references',
		kind: 'references',
		title: 'References',
		notes: 'Keep this compact and scannable.'
	}
];
