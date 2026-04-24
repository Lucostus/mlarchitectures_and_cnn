import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'bayesian-networks',
	title: "Bayesian Networks",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'support',
	oneLiner: "Bayesian networks encode conditional dependencies in a directed acyclic probabilistic graph.",
	intuition: "The graph tells you which variables directly influence which others and which dependencies can be factorized away.",
	architectureBullets: ["Nodes represent random variables.","Directed edges encode conditional dependence structure.","Inference propagates evidence through the graph."],
	strengths: ["Interpretable dependency structure","Handles uncertainty explicitly","Useful when causality-like structure matters"],
	weaknesses: ["Structure learning is hard","Inference can be expensive","Quality depends on good graph design or discovery"],
	useCases: ["Diagnostic systems","Risk analysis","Knowledge-driven probabilistic modeling"],
	math: {"intuition":"The full joint distribution factorizes over parents in the DAG.","formula":"P(X_1,...,X_n) = product_i P(X_i | Parents(X_i))","deepDiveMarkdown":"The graph is valuable because it compresses assumptions about dependency and conditional independence."},
	demo: defineDemo('bayesian-networks', () => import('$presentation/demos/bayesian-networks.svelte'), "See how more nodes and stronger certainty propagate evidence through a dependency graph."),
	references: [{"label":"Probabilistic Reasoning in Intelligent Systems","url":"https://bayes.cs.ucla.edu/BOOK-2K/","note":"Pearl classic"},{"label":"pgmpy documentation","url":"https://pgmpy.org/","note":"Practical tooling"},{"label":"Probabilistic ML book","url":"https://probml.github.io/pml-book/","note":"Modern reference"}]
});
