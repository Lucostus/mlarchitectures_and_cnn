import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'svm',
	title: "Support Vector Machines",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'support',
	oneLiner: "SVMs seek a large-margin separator and can use kernels for nonlinear boundaries.",
	intuition: "Only the hardest boundary-defining points really matter for the classifier.",
	architectureBullets: ["The maximum-margin hyperplane separates classes when possible.","Slack variables allow imperfect separation.","Kernel tricks create nonlinear decision surfaces implicitly."],
	strengths: ["Strong on medium-sized datasets","Margin-based robustness","Kernel flexibility"],
	weaknesses: ["Scaling to very large datasets is harder","Kernel choice is nontrivial","Probabilities are not native"],
	useCases: ["Text classification","Structured medium-size tabular data","Nonlinear classification with kernels"],
	math: {"intuition":"Margin maximization tries to separate classes with the widest safe gap.","formula":"min ||w||^2 subject to y_i(w^T x_i + b) >= 1","deepDiveMarkdown":"Kernel methods are elegant because they retain linear optimization in a transformed feature space."},
	demo: defineDemo('svm', () => import('$presentation/demos/svm.svelte'), "Change margin and kernel effect to see the boundary stiffen or curve."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"A Tutorial on SVMs","url":"https://link.springer.com/article/10.1023/A:1010933404324","note":"Classic tutorial by Burges"},{"label":"LIBSVM guide","url":"https://www.csie.ntu.edu.tw/~cjlin/libsvm/","note":"Practical ecosystem"}]
});
