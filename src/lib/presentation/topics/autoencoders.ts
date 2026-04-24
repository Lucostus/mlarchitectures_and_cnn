import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'autoencoders',
	title: "Autoencoders",
	family: "Representation and generation",
	talkPriority: 'core',
	oneLiner: "Autoencoders learn compressed latent codes by reconstructing their own inputs.",
	intuition: "Autoencoders learn to reconstruct inputs from a latent code, and that code becomes useful when compression or regularization prevents the network from merely copying the input.",
	architectureBullets: ["An encoder maps input to a latent representation.","A decoder reconstructs the input from that latent code.","Compression, sparsity, denoising, or other constraints determine whether the latent space captures semantics instead of trivial identity mappings."],
	strengths: ["Useful latent features","Good for denoising or compression","Simple self-supervised objective"],
	weaknesses: ["Can learn trivial identity if unconstrained","Latent space may not be smooth","Reconstruction quality may dominate semantic utility"],
	useCases: ["Dimensionality reduction","Anomaly detection","Pretraining"],
	math: {"intuition":"Training minimizes reconstruction error between input and decoded output.","formula":"L = ||x - decoder(encoder(x))||^2","deepDiveMarkdown":"Useful autoencoders usually need a bottleneck or additional structure to avoid simple copying."},
	demo: defineDemo('autoencoders', () => import('$presentation/demos/autoencoders.svelte'), "Change latent size and fidelity to see the compression tradeoff directly."),
	references: [{"label":"Reducing the Dimensionality of Data with Neural Networks","url":"https://pubmed.ncbi.nlm.nih.gov/16873662/","note":"Classic deep autoencoder compression result"},{"label":"Stacked Denoising Autoencoders","url":"https://www.jmlr.org/papers/v11/vincent10a.html","note":"Primary source for denoising and representation-learning claims"},{"label":"Deep Learning Book","url":"https://www.deeplearningbook.org/","note":"Supports the reconstruction objective and regularization framing"}]
});
