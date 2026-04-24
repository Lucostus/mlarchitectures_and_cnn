import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'genetic-algorithms',
	title: "Genetic Algorithms",
	family: "Reinforcement learning and evolutionary methods",
	talkPriority: 'support',
	oneLiner: "Genetic algorithms search by selection, crossover, and mutation over populations of candidate solutions.",
	intuition: "Instead of following gradients, a whole population competes and recombines toward better fitness.",
	architectureBullets: ["Fitness scores rank candidate solutions.","Selection favors better individuals for reproduction.","Mutation and crossover maintain exploration."],
	strengths: ["Works on non-differentiable problems","Naturally parallelizable","Flexible objective design"],
	weaknesses: ["Can require many evaluations","Noisy convergence behavior","Representation design matters heavily"],
	useCases: ["Combinatorial search","Hyperparameter search","Evolutionary optimization"],
	math: {"intuition":"Population search shifts probability mass toward fitter candidates over generations.","formula":"Population_(t+1) = Selection(Crossover(Mutation(Population_t)))","deepDiveMarkdown":"GAs are useful when gradients are unavailable, unreliable, or not meaningful."},
	demo: defineDemo('genetic-algorithms', () => import('$presentation/demos/genetic-algorithms.svelte'), "Track how population size and mutation rate change exploration versus convergence."),
	references: [{"label":"Introduction to Genetic Algorithms","url":"https://mitpress.mit.edu/9780262532645/an-introduction-to-genetic-algorithms/","note":"Classic text by Melanie Mitchell"},{"label":"DEAP documentation","url":"https://deap.readthedocs.io/en/master/","note":"Practical GA framework"},{"label":"Genetic Algorithms overview","url":"https://www.nature.com/articles/35057005","note":"Short overview article"}]
});
