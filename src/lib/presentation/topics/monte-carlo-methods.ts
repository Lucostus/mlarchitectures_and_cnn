import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'monte-carlo-methods',
	title: "Monte Carlo Methods",
	family: "Reinforcement learning and evolutionary methods",
	talkPriority: 'support',
	oneLiner: "Monte Carlo methods estimate returns from complete sampled episodes rather than bootstrapping one step ahead.",
	intuition: "Instead of asking what happens next, Monte Carlo methods wait until the episode ends and use the actual return.",
	architectureBullets: ["Full-episode returns provide unbiased but high-variance targets.","First-visit and every-visit variants differ in how they average returns.","No model of the environment is required."],
	strengths: ["Simple conceptually","No bootstrapping bias","Useful baseline for episodic tasks"],
	weaknesses: ["Needs episode termination","High variance","Slow learning on long-horizon tasks"],
	useCases: ["Episodic games","Policy evaluation","Introductory RL"],
	math: {"intuition":"The return is computed after rolling out the full episode.","formula":"V(s) <- average of sampled returns G_t after visits to s","deepDiveMarkdown":"Monte Carlo sits at the opposite end from bootstrapped TD methods: less bias, more variance."},
	demo: defineDemo('monte-carlo-methods', () => import('$presentation/demos/monte-carlo-methods.svelte'), "See how episode length and sample count affect the stability of return estimates."),
	references: [{"label":"Reinforcement Learning: Sutton and Barto","url":"http://incompleteideas.net/book/the-book-2nd.html","note":"Canonical RL reference"},{"label":"Monte Carlo RL notes","url":"https://huggingface.co/learn/deep-rl-course/unit1/monte-carlo","note":"Modern explanation"},{"label":"Policy evaluation overview","url":"https://www.andrew.cmu.edu/course/10-703/textbook/BartoSutton.pdf","note":"Standard RL text excerpt"}]
});
