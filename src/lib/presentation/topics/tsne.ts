import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'tsne',
	title: "t-SNE",
	family: "Unsupervised structure and manifolds",
	talkPriority: 'support',
	oneLiner: "t-SNE maps high-dimensional points into low dimensions by preserving local neighborhood similarity.",
	intuition: "It is a visualization tool, not a faithful metric projection of global geometry.",
	architectureBullets: ["High-dimensional similarities are turned into pairwise probabilities.","Low-dimensional points are optimized to match those local similarities.","Perplexity controls the neighborhood scale."],
	strengths: ["Excellent local cluster visualization","Reveals neighborhood structure","Popular exploratory tool"],
	weaknesses: ["Poor at global geometry","Expensive relative to PCA","Plots can be misread as metric truth"],
	useCases: ["Embedding visualization","Cluster inspection","Exploratory feature analysis"],
	math: {"intuition":"The objective matches local pairwise similarity distributions between spaces.","formula":"min KL(P || Q)","deepDiveMarkdown":"t-SNE is powerful for showing local groups, but distances between far clusters are not usually trustworthy."},
	demo: defineDemo('tsne', () => import('$presentation/demos/tsne.svelte'), "See how perplexity and separation affect the visual neighborhood layout."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"Visualizing Data using t-SNE","url":"https://www.jmlr.org/papers/v9/vandermaaten08a.html","note":"Original t-SNE paper"},{"label":"Manifold learning docs","url":"https://scikit-learn.org/stable/modules/manifold.html#t-sne","note":"Practical notes"}]
});
