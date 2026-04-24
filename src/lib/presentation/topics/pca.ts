import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'pca',
	title: "Principal Component Analysis",
	family: "Unsupervised structure and manifolds",
	talkPriority: 'core',
	oneLiner: "PCA rotates data onto orthogonal directions of maximal variance.",
	intuition: "If data really lies near a lower-dimensional linear subspace, PCA finds the axes that preserve most of the spread.",
	architectureBullets: ["Center the data and compute covariance structure.","Eigenvectors define principal directions.","Projection onto top components compresses while preserving variance."],
	strengths: ["Fast linear compression","Good for visualization pre-processing","Improves decorrelation"],
	weaknesses: ["Only linear","Variance is not always semantics","Sensitive to feature scaling"],
	useCases: ["Dimensionality reduction","Noise reduction","Exploratory visualization"],
	math: {"intuition":"Principal components are eigenvectors of the covariance matrix.","formula":"Sigma v = lambda v","deepDiveMarkdown":"PCA is the baseline manifold method because it is simple, deterministic, and often surprisingly informative."},
	demo: defineDemo('pca', () => import('$presentation/demos/pca.svelte'), "See how much variance a linear projection can keep."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"PCA docs","url":"https://scikit-learn.org/stable/modules/decomposition.html#pca","note":"Practical guide"},{"label":"Elements of Statistical Learning","url":"https://hastie.su.domains/ElemStatLearn/","note":"Statistical grounding"}]
});
