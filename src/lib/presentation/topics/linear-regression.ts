import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'linear-regression',
	title: "Linear Regression",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'support',
	oneLiner: "Linear regression fits a weighted sum of input features to predict continuous targets.",
	intuition: "It asks whether one straight hyperplane can explain the signal well enough.",
	architectureBullets: ["Prediction is a weighted sum plus bias.","Training minimizes squared residual error.","Coefficients describe directional feature influence."],
	strengths: ["Fast and interpretable","Strong baseline","Good for linear trends and diagnostics"],
	weaknesses: ["Misses nonlinear interactions","Sensitive to multicollinearity","Feature design often matters"],
	useCases: ["Forecast baselines","Causal-style inspection with caveats","Continuous-response tabular tasks"],
	math: {"intuition":"The best-fit line minimizes total squared error.","formula":"y_hat = w^T x + b","deepDiveMarkdown":"Even simple linear models remain valuable because they are cheap, transparent, and often competitive on clean structured data."},
	demo: defineDemo('linear-regression', () => import('$presentation/demos/linear-regression.svelte'), "Adjust slope and noise to see when a linear trend is enough."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"Elements of Statistical Learning","url":"https://hastie.su.domains/ElemStatLearn/","note":"Statistical foundations"},{"label":"Linear models in scikit-learn","url":"https://scikit-learn.org/stable/modules/linear_model.html","note":"Practical docs"}]
});
