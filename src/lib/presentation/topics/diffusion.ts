import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'diffusion',
	title: "Diffusion Models",
	family: "Representation and generation",
	talkPriority: 'core',
	oneLiner: "Diffusion models learn to reverse incremental noise corruption into coherent samples.",
	intuition: "Generation becomes a denoising trajectory instead of one giant jump from noise to output.",
	architectureBullets: ["A forward process gradually adds noise to data.","A model learns the reverse denoising direction at each step.","Sampling iteratively refines a noisy starting point."],
	strengths: ["High sample quality","Stable training relative to GANs","Flexible conditioning"],
	weaknesses: ["Slow sampling","Large compute demand","Many denoising steps can be expensive"],
	useCases: ["Image and audio generation","Inpainting","Text-to-image systems"],
	math: {"intuition":"The model predicts noise or score information to undo corruption.","formula":"x_t = sqrt(alpha_t) x_(t-1) + sqrt(1-alpha_t) epsilon","deepDiveMarkdown":"The reverse process turns generation into a sequence of easier denoising subproblems."},
	demo: defineDemo('diffusion', () => import('$presentation/demos/diffusion.svelte'), "See how more noise steps and stronger denoising change generation quality."),
	references: [{"label":"Denoising Diffusion Probabilistic Models","url":"https://arxiv.org/abs/2006.11239","note":"DDPM paper"},{"label":"Score-Based Generative Modeling","url":"https://arxiv.org/abs/1907.05600","note":"Score matching connection"},{"label":"Dive into Deep Learning","url":"https://d2l.ai/","note":"Practical open textbook"}]
});
