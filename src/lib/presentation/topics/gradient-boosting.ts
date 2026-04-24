import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'gradient-boosting',
	title: "Gradient Boosting",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'core',
	oneLiner: "Boosting adds weak learners sequentially so each new model corrects residual errors from the current ensemble.",
	intuition: "Instead of voting many independent trees, boosting focuses each new tree on what the earlier trees still miss.",
	architectureBullets: ["Learners are added one after another rather than in parallel.","Each stage targets the current residual or gradient direction.","Shrinkage and depth control regularization."],
	strengths: ["Excellent on tabular data","Captures nonlinearities and interactions","Highly performant in practice"],
	weaknesses: ["Sensitive to hyperparameters","Sequential training is slower","Can overfit if rounds or depth are too high"],
	useCases: ["Kaggle-style tabular tasks","Risk modeling","Ranking and structured business data"],
	math: {"intuition":"Each stage takes a small step in function space toward lower loss.","formula":"F_m(x) = F_(m-1)(x) + eta h_m(x)","deepDiveMarkdown":"Modern libraries like XGBoost, LightGBM, and CatBoost are practical engineering refinements of this idea."},
	demo: defineDemo('gradient-boosting', () => import('$presentation/demos/gradient-boosting.svelte'), "See how more rounds and larger learning rates change residual correction behavior."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"XGBoost paper","url":"https://arxiv.org/abs/1603.02754","note":"Popular optimized boosting system"},{"label":"LightGBM docs","url":"https://lightgbm.readthedocs.io/en/latest/","note":"Production boosting library"}]
});
