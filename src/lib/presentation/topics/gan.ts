import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'gan',
	title: "Generative Adversarial Networks",
	family: "Representation and generation",
	talkPriority: 'core',
	oneLiner: "GANs train a generator and discriminator in opposition until samples look realistic.",
	intuition: "Generation improves because another network is constantly trying to expose fake outputs.",
	architectureBullets: ["The generator maps noise to candidate samples.","The discriminator scores real versus generated examples.","Both networks co-evolve through adversarial loss."],
	strengths: ["Sharp high-fidelity samples","Strong image synthesis history","No explicit likelihood needed"],
	weaknesses: ["Training instability","Mode collapse risk","Balancing generator and discriminator is difficult"],
	useCases: ["Image synthesis","Super-resolution","Style transfer variants"],
	math: {"intuition":"A minimax game pushes generated and real distributions closer together.","formula":"min_G max_D E[log D(x)] + E[log(1 - D(G(z)))]","deepDiveMarkdown":"The adversarial objective is powerful but brittle because each player changes the other player’s target."},
	demo: defineDemo('gan', () => import('$presentation/demos/gan.svelte'), "Watch generator and discriminator balance shift and see when instability appears."),
	references: [{"label":"GAN paper","url":"https://arxiv.org/abs/1406.2661","note":"Original GAN paper"},{"label":"Deep Learning Book","url":"https://www.deeplearningbook.org/","note":"General deep learning reference"},{"label":"NIPS 2016 Tutorial: GANs","url":"https://arxiv.org/abs/1701.00160","note":"Good conceptual overview"}]
});
