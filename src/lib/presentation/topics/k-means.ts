import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'k-means',
	title: "k-Means",
	family: "Unsupervised structure and manifolds",
	talkPriority: 'core',
	oneLiner: "k-Means alternates between assigning points to centroids and moving centroids to cluster means.",
	intuition: "It assumes clusters are roughly spherical groups around representative centers.",
	architectureBullets: ["Pick k cluster centers.","Assign each point to the nearest centroid.","Update centroids to the mean of assigned points and repeat."],
	strengths: ["Fast and widely used","Simple geometric intuition","Good baseline for compact clusters"],
	weaknesses: ["Needs k in advance","Sensitive to initialization and outliers","Assumes roughly convex cluster shapes"],
	useCases: ["Customer segmentation","Prototype discovery","Vector quantization"],
	math: {"intuition":"The objective minimizes within-cluster squared distance to centroids.","formula":"min sum_i ||x_i - mu_(c_i)||^2","deepDiveMarkdown":"k-Means is easy to visualize, which makes it ideal for teaching clustering and iterative optimization."},
	demo: defineDemo('k-means', () => import('$presentation/demos/k-means.svelte'), "See centroids move as cluster count and spread change."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"k-means++","url":"https://theory.stanford.edu/~sergei/papers/kMeansPP-soda.pdf","note":"Improved initialization"},{"label":"Clustering chapter in ESL","url":"https://hastie.su.domains/ElemStatLearn/","note":"Statistical context"}]
});
