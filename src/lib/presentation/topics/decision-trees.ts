import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'decision-trees',
	title: "Decision Trees",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'core',
	oneLiner: "Decision trees recursively split feature space into regions with purer targets.",
	intuition: "A tree asks one simple question at a time until the remaining examples look similar enough.",
	architectureBullets: ["Each internal node chooses a feature threshold or category split.","Leaves output a class or value estimate.","Greedy impurity reduction builds the tree top-down."],
	strengths: ["Interpretable","Handles mixed feature types","Little preprocessing required"],
	weaknesses: ["High variance","Can overfit deeply","Greedy splits are not globally optimal"],
	useCases: ["Interpretable classification","Rule extraction","Base learners in ensembles"],
	math: {"intuition":"Splits maximize impurity reduction such as Gini or entropy decrease.","formula":"Gain = Impurity(parent) - sum_j p_j Impurity(child_j)","deepDiveMarkdown":"Trees are easy to explain but unstable; small data changes can alter the structure a lot."},
	demo: defineDemo('decision-trees', () => import('$presentation/demos/decision-trees.svelte'), "See how greater depth and stricter purity create more detailed partitions."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"CART overview","url":"https://www.stat.berkeley.edu/~breiman/RandomForests/cc_home.htm","note":"Breiman material"},{"label":"Elements of Statistical Learning","url":"https://hastie.su.domains/ElemStatLearn/","note":"Canonical statistical reference"}]
});
