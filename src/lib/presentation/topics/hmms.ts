import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'hmms',
	title: "Hidden Markov Models",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'support',
	oneLiner: "HMMs model a hidden state chain that emits observable outputs over time.",
	intuition: "You do not see the true state directly; you infer it from the observation sequence and the transition dynamics.",
	architectureBullets: ["Transitions describe how hidden states evolve.","Emission probabilities connect hidden states to observations.","Forward-backward and Viterbi support inference and decoding."],
	strengths: ["Clear probabilistic sequence model","Interpretable hidden states","Strong historical baseline for temporal data"],
	weaknesses: ["Markov assumptions are restrictive","Observation models can be simplistic","Limited expressivity compared with deep sequence models"],
	useCases: ["Speech and handwriting history","Sequence segmentation","Probabilistic time-series baselines"],
	math: {"intuition":"State transitions and emissions jointly explain the observed sequence.","formula":"P(x,z) = P(z_1) product_t P(z_t|z_(t-1)) P(x_t|z_t)","deepDiveMarkdown":"HMMs are important because they make latent temporal structure explicit and tractable."},
	demo: defineDemo('hmms', () => import('$presentation/demos/hmms.svelte'), "See how state count and transition confidence affect inferred sequence structure."),
	references: [{"label":"Rabiner HMM tutorial","url":"https://www.cs.sjsu.edu/~stamp/RUA/HMM.pdf","note":"Classic sequence-model tutorial"},{"label":"hmmlearn documentation","url":"https://hmmlearn.readthedocs.io/en/latest/","note":"Practical toolkit"},{"label":"Probabilistic ML book","url":"https://probml.github.io/pml-book/","note":"Modern probabilistic reference"}]
});
