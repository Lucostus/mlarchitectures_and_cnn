import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'random-forests',
	title: "Random Forests",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'core',
	oneLiner: "Random forests average many de-correlated trees to reduce variance without losing nonlinear flexibility.",
	intuition: "One tree is unstable; many randomized trees voting together are much harder to knock off course.",
	architectureBullets: ["Bootstrap samples create diverse training subsets.","Random feature subsampling decorrelates trees.","Predictions aggregate through voting or averaging."],
	strengths: ["Strong default tabular baseline","Robust to scaling and feature engineering","Captures nonlinear interactions"],
	weaknesses: ["Less interpretable than one tree","Larger ensembles cost more at inference","Can struggle on sparse high-dimensional text"],
	useCases: ["Tabular prediction","Feature importance estimates","Out-of-the-box baseline modeling"],
	math: {"intuition":"Variance drops because many weakly correlated trees average out one another’s noise.","formula":"y_hat = (1/T) sum_t tree_t(x)","deepDiveMarkdown":"Feature randomness is crucial; without it the trees become too similar for the ensemble to help much."},
	demo: defineDemo('random-forests', () => import('$presentation/demos/random-forests.svelte'), "Compare tree count and feature randomness to see stability emerge through voting."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"Random Forests","url":"https://www.stat.berkeley.edu/~breiman/randomforest2001.pdf","note":"Breiman original paper"},{"label":"Elements of Statistical Learning","url":"https://hastie.su.domains/ElemStatLearn/","note":"Ensemble reference"}]
});
