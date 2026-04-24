import { describe, expect, it } from 'vitest';
import { clampSlideIndex, getSlideIndexFromHash, parseHashSlideId } from '$presentation/navigation';
import { SLIDES } from '$presentation/slide-order';

describe('presentation navigation helpers', () => {
	it('parses slide ids from hashes', () => {
		expect(parseHashSlideId('#/transformers')).toBe('transformers');
		expect(parseHashSlideId('#overview')).toBe('overview');
	});

	it('resolves valid slide hashes', () => {
		expect(getSlideIndexFromHash('#/overview', SLIDES)).toBe(2);
	});

	it('falls back to the first slide when the hash is unknown', () => {
		expect(getSlideIndexFromHash('#/does-not-exist', SLIDES)).toBe(0);
	});

	it('clamps navigation indices into bounds', () => {
		expect(clampSlideIndex(-5, SLIDES)).toBe(0);
		expect(clampSlideIndex(999, SLIDES)).toBe(SLIDES.length - 1);
	});
});
