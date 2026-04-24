import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'dbscan',
	title: "DBSCAN",
	family: "Unsupervised structure and manifolds",
	talkPriority: 'support',
	oneLiner: "DBSCAN groups points through density connectivity and labels sparse points as noise.",
	intuition: "Clusters are dense regions separated by sparse space, not necessarily spherical blobs.",
	architectureBullets: ["Neighborhood radius epsilon defines local density reach.","Core points need enough neighbors to seed a cluster.","Noise points remain unassigned when density is too low."],
	strengths: ["Finds irregular cluster shapes","Handles outliers explicitly","No need to predefine cluster count"],
	weaknesses: ["Sensitive to epsilon and min-samples","Struggles with varying density","Distance metrics still matter"],
	useCases: ["Spatial clustering","Anomaly detection","Exploratory pattern mining"],
	math: {"intuition":"Clusters expand through chains of density-reachable points.","formula":"core(x) if |N_epsilon(x)| >= min_samples","deepDiveMarkdown":"DBSCAN’s main advantage is geometric flexibility; its main challenge is choosing a useful density scale."},
	demo: defineDemo('dbscan', () => import('$presentation/demos/dbscan.svelte'), "See how neighborhood radius and minimum density change cluster discovery."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"DBSCAN original paper","url":"https://aaai.org/papers/kdd96-037-a-density-based-algorithm-for-discovering-clusters-in-large-spatial-databases-with-noise/","note":"Foundational method"},{"label":"Clustering docs","url":"https://scikit-learn.org/stable/modules/clustering.html#dbscan","note":"Practical notes"}]
});
