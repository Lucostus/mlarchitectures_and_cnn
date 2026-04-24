import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'umap',
	title: "UMAP",
	family: "Unsupervised structure and manifolds",
	talkPriority: 'support',
	oneLiner: "UMAP builds a fuzzy neighborhood graph and optimizes a compact low-dimensional embedding.",
	intuition: "It tries to preserve local structure like t-SNE while often retaining more global continuity and running faster.",
	architectureBullets: ["Construct a weighted neighborhood graph in high dimensions.","Optimize a low-dimensional layout that preserves graph relationships.","Neighbor count and min-distance control locality and cluster compactness."],
	strengths: ["Fast and scalable visualization","Often better global continuity than t-SNE","Useful as a generic embedding tool"],
	weaknesses: ["Still sensitive to hyperparameters","Not a perfect global metric map","Interpretation can still be overconfident"],
	useCases: ["Embedding visualization","Preprocessing before clustering","Exploratory manifold learning"],
	math: {"intuition":"UMAP preserves fuzzy neighbor relations between the original and embedded graphs.","formula":"min cross_entropy(fuzzy_graph_high, fuzzy_graph_low)","deepDiveMarkdown":"UMAP is often the pragmatic choice when you want manifold visualization that is fast and tunable."},
	demo: defineDemo('umap', () => import('$presentation/demos/umap.svelte'), "Compare neighbor count and minimum distance to see local versus global structure shift."),
	references: [{"label":"UMAP paper","url":"https://arxiv.org/abs/1802.03426","note":"Foundational UMAP reference"},{"label":"UMAP docs","url":"https://umap-learn.readthedocs.io/en/latest/","note":"Practical guide"},{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"}]
});
