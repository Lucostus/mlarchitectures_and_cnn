import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'genetic-programming',
	title: "Genetic Programming",
	family: "Reinforcement learning and evolutionary methods",
	talkPriority: 'support',
	oneLiner: "Genetic programming evolves executable programs or expression trees instead of fixed-length genomes.",
	intuition: "The search does not just tune parameters; it rewrites the computational structure itself.",
	architectureBullets: ["Individuals are program trees or symbolic expressions.","Crossover swaps subtrees between programs.","Fitness rewards programs that solve the task well."],
	strengths: ["Searches over symbolic structure","Can produce interpretable expressions","Useful for symbolic regression"],
	weaknesses: ["Program bloat","Search space is very large","Evaluation cost can be high"],
	useCases: ["Symbolic regression","Rule discovery","Program synthesis experiments"],
	math: {"intuition":"The genotype is a program structure, not just a vector.","formula":"program_(t+1) = mutate_or_cross(program_t) if fitness improves","deepDiveMarkdown":"Genetic programming is most compelling when the target artifact should itself remain human-readable."},
	demo: defineDemo('genetic-programming', () => import('$presentation/demos/genetic-programming.svelte'), "See how larger program depth and stronger mutation change symbolic search behavior."),
	references: [{"label":"Genetic Programming","url":"https://mitpress.mit.edu/9780262611272/genetic-programming/","note":"Koza classic"},{"label":"DEAP GP docs","url":"https://deap.readthedocs.io/en/master/tutorials/advanced/gp.html","note":"Practical GP tooling"},{"label":"Symbolic regression overview","url":"https://arxiv.org/abs/2107.14351","note":"Modern survey context"}]
});
