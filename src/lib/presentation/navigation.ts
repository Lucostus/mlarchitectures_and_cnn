import type { SlideDefinition } from '$presentation/types';

export const parseHashSlideId = (hash: string) => hash.replace(/^#\/?/, '').trim();

export const getSlideIndexFromHash = (hash: string, slides: SlideDefinition[]) => {
	const slideId = parseHashSlideId(hash);
	const index = slides.findIndex((slide) => slide.id === slideId);

	return index >= 0 ? index : 0;
};

export const clampSlideIndex = (index: number, slides: SlideDefinition[]) =>
	Math.max(0, Math.min(index, slides.length - 1));
