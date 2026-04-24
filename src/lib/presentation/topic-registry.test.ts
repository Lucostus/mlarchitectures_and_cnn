import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '$presentation/chapters';
import { getTopic } from '$presentation/topic-registry';

describe('topic registry', () => {
	it('resolves every configured topic slug', () => {
		for (const slug of CHAPTERS.flatMap((chapter) => chapter.topics)) {
			expect(getTopic(slug).slug).toBe(slug);
		}
	});

	it('provides a demo definition for every configured topic', async () => {
		for (const slug of CHAPTERS.flatMap((chapter) => chapter.topics)) {
			const topic = getTopic(slug);
			const module = await topic.demo.component();

			expect(topic.demo.controls.length).toBeGreaterThanOrEqual(2);
			expect(module.default).toBeTruthy();
		}
	});
});
