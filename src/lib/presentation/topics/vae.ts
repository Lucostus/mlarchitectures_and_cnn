import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'vae',
	title: "Variational Autoencoders",
	family: "Representation and generation",
	talkPriority: 'core',
	oneLiner: "VAEs regularize latent space into a probability distribution so sampling becomes meaningful.",
	intuition: "A VAE trades exact reconstructions for a smooth latent geometry you can sample from.",
	architectureBullets: ["Encoder predicts a latent mean and variance rather than one point.","Reparameterization keeps sampling differentiable during training.","Decoder learns to reconstruct from sampled latent vectors."],
	strengths: ["Smooth latent interpolation","Principled probabilistic objective","Useful for representation learning"],
	weaknesses: ["Reconstructions can look blurry","KL term can overpower reconstruction","Samples may be less sharp than GANs"],
	useCases: ["Latent exploration","Data generation","Semi-supervised learning"],
	math: {"intuition":"The ELBO balances reconstruction quality against latent regularity.","formula":"ELBO = E_q(z|x)[log p(x|z)] - KL(q(z|x) || p(z))","deepDiveMarkdown":"KL pressure keeps latent codes close to a prior so nearby regions decode sensibly."},
	demo: defineDemo('vae', () => import('$presentation/demos/vae.svelte'), "Compare smooth latent sampling against pure reconstruction pressure."),
	references: [{"label":"Auto-Encoding Variational Bayes","url":"https://arxiv.org/abs/1312.6114","note":"Original VAE paper"},{"label":"Deep Learning Book","url":"https://www.deeplearningbook.org/","note":"General deep learning reference"},{"label":"Dive into Deep Learning","url":"https://d2l.ai/","note":"Practical open textbook"}]
});
