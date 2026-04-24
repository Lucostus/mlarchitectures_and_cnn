import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'hierarchical-clustering',
	title: "Hierarchical Clustering",
	family: "Unsupervised structure and manifolds",
	talkPriority: 'support',
	oneLiner: "Hierarchical clustering builds nested groups by repeatedly merging or splitting clusters.",
	intuition: "Instead of one flat partition, it gives a whole tree of grouping resolutions.",
	architectureBullets: ["Agglomerative methods start from single points and merge upward.","Linkage rules define distance between clusters.","Dendrogram cuts determine the final grouping resolution."],
	strengths: ["No need to choose one k up front","Dendrogram reveals multi-scale structure","Works well for exploratory analysis"],
	weaknesses: ["Can be expensive","Linkage choice changes results","Greedy merges are irreversible"],
	useCases: ["Exploratory clustering","Taxonomy building","Bioinformatics and similarity analysis"],
	math: {"intuition":"The method repeatedly merges the closest clusters under a chosen linkage metric.","formula":"d(A,B) depends on linkage: min, max, average, or Ward objective","deepDiveMarkdown":"Hierarchical clustering is useful when the grouping granularity is itself an object of interest."},
	demo: defineDemo('hierarchical-clustering', () => import('$presentation/demos/hierarchical-clustering.svelte'), "See how merge depth and linkage tightness change the grouping tree."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"Hierarchical clustering docs","url":"https://scikit-learn.org/stable/modules/clustering.html#hierarchical-clustering","note":"Practical guide"},{"label":"Elements of Statistical Learning","url":"https://hastie.su.domains/ElemStatLearn/","note":"Cluster analysis reference"}]
});
