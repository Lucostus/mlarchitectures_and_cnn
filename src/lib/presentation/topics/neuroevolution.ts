import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'neuroevolution',
	title: "Neuroevolution",
	family: "Reinforcement learning and evolutionary methods",
	talkPriority: 'support',
	oneLiner: "Neuroevolution applies evolutionary search to neural network weights, topologies, or both.",
	intuition: "Evolution can search neural design spaces without differentiating through the full objective.",
	architectureBullets: ["Individuals encode network weights or architectures.","Fitness comes from task performance rather than gradient loss.","Topology evolution can grow networks along with weights."],
	strengths: ["Gradient-free optimization","Good for black-box objectives","Can search architectures and controllers jointly"],
	weaknesses: ["Evaluation cost can explode","Often less sample-efficient than gradient methods","Population management adds complexity"],
	useCases: ["Game agents","Architecture search","Controller design in simulation"],
	math: {"intuition":"Selection keeps neural candidates that perform best on the task.","formula":"theta_(t+1) = EvolutionStep(theta_t, fitness(theta_t))","deepDiveMarkdown":"Neuroevolution is attractive when objectives are sparse, deceptive, or not differentiable."},
	demo: defineDemo('neuroevolution', () => import('$presentation/demos/neuroevolution.svelte'), "Compare stable weight search with more aggressive topology drift."),
	references: [{"label":"NEAT","url":"https://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf","note":"Canonical topology-evolving method"},{"label":"Deep Neuroevolution","url":"https://arxiv.org/abs/1712.06567","note":"Modern large-scale example"},{"label":"Evolution Strategies as a Scalable Alternative to RL","url":"https://arxiv.org/abs/1703.03864","note":"Related black-box optimization view"}]
});
