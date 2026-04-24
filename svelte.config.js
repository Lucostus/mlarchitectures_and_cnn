import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$deck: 'src/lib/components/deck',
			$presentation: 'src/lib/presentation',
			$ui: 'src/lib/components/ui'
		}
	}
};

export default config;
