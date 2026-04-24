import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '$presentation/chapters';
import { SLIDES } from '$presentation/slide-order';

describe('slide order', () => {
	it('contains the overview slide before chapters', () => {
		const overviewIndex = SLIDES.findIndex((slide) => slide.id === 'overview');
		const firstChapterIndex = SLIDES.findIndex((slide) => slide.kind === 'chapter');

		expect(overviewIndex).toBeGreaterThan(0);
		expect(overviewIndex).toBeLessThan(firstChapterIndex);
	});

	it('contains a chapter slide for each configured chapter', () => {
		const chapterIds = SLIDES.filter((slide) => slide.kind === 'chapter').map((slide) => slide.chapterId);

		expect(chapterIds).toEqual(CHAPTERS.map((chapter) => chapter.id));
	});

	it('contains one topic slide per configured topic slug', () => {
		const topicCount = CHAPTERS.flatMap((chapter) => chapter.topics).length;
		const slidesTopicCount = SLIDES.filter((slide) => slide.kind === 'topic').length;

		expect(slidesTopicCount).toBe(topicCount);
	});
});
