import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'ridge-lasso',
	title: "Ridge / Lasso",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'support',
	oneLiner: "Ridge and lasso add penalties to linear models to reduce variance and sometimes enforce sparsity.",
	intuition: "Both methods shrink coefficients, but lasso can zero some of them out completely.",
	architectureBullets: ["Ridge uses an L2 penalty and spreads shrinkage smoothly.","Lasso uses an L1 penalty and promotes sparse coefficients.","Regularization trades small bias for lower variance."],
	strengths: ["Improves generalization","Useful on high-dimensional data","Lasso supports feature selection"],
	weaknesses: ["Still fundamentally linear","Penalty choice matters","Correlated features complicate sparse selection"],
	useCases: ["Wide tabular data","Text or genomics features","Regularized baselines"],
	math: {"intuition":"The objective adds a penalty to discourage large coefficients.","formula":"L = ||y - Xw||^2 + lambda ||w||_p","deepDiveMarkdown":"Ridge usually keeps all features; lasso is more likely to produce a compact model."},
	demo: defineDemo('ridge-lasso', () => import('$presentation/demos/ridge-lasso.svelte'), "Compare regularization strength as coefficients shrink or disappear."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"Regularization Path docs","url":"https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification","note":"Ridge and lasso in practice"},{"label":"Elements of Statistical Learning","url":"https://hastie.su.domains/ElemStatLearn/","note":"Regularization foundations"}]
});
