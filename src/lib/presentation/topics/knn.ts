import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'knn',
	title: "k-Nearest Neighbors",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'support',
	oneLiner: "k-NN predicts from the labels of nearby examples in feature space with almost no explicit training.",
	intuition: "The stored dataset itself acts as the model; locality defines the decision rule.",
	architectureBullets: ["Distance metric defines neighborhood structure.","Prediction uses the nearest k examples.","Larger k smooths the boundary, smaller k keeps it local."],
	strengths: ["Simple and intuitive","No parametric training phase","Can model irregular boundaries"],
	weaknesses: ["Slow at inference on large datasets","Sensitive to scaling and metric choice","Stores the full dataset"],
	useCases: ["Small-data classification","Similarity search baselines","Instance-based learning demos"],
	math: {"intuition":"Classification comes from a local vote among nearby points.","formula":"y_hat = mode({y_i : x_i in N_k(x)})","deepDiveMarkdown":"k-NN is best understood as geometry-driven memorization rather than abstraction into parameters."},
	demo: defineDemo('knn', () => import('$presentation/demos/knn.svelte'), "Compare local versus smoothed neighborhoods by changing k."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"Nearest Neighbors docs","url":"https://scikit-learn.org/stable/modules/neighbors.html","note":"Practical guide"},{"label":"Pattern Classification","url":"https://archive.org/details/patternclassific0000duda","note":"Classic reference"}]
});
