import type { TopicDefinition, TopicSlug } from '$presentation/types';

const modules = import.meta.glob('./topics/*.ts', { eager: true });

const topicEntries = Object.values(modules)
	.map((module) => (module as { default: TopicDefinition }).default)
	.filter(Boolean);

const topicMap = new Map(topicEntries.map((topic) => [topic.slug, topic]));

export const getTopic = (slug: TopicSlug) => {
	const topic = topicMap.get(slug);

	if (!topic) {
		throw new Error(`Missing topic definition for ${slug}`);
	}

	return topic;
};

export const getAllTopics = () => [...topicEntries];
