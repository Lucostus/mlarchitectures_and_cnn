import type { DemoTier, TopicSlug } from '$presentation/types';

export type DemoKind =
	| 'network'
	| 'image-grid'
	| 'sequence'
	| 'attention'
	| 'latent'
	| 'adversarial'
	| 'diffusion'
	| 'graph'
	| 'gridworld'
	| 'tree'
	| 'boundary'
	| 'probabilistic'
	| 'cluster'
	| 'manifold'
	| 'evolution'
	| 'scientific'
	| 'hybrid'
	| 'meta';

export interface SliderConfig {
	label: string;
	min: number;
	max: number;
	step?: number;
	initial: number;
	format?: (value: number) => string;
}

export interface DemoPreset {
	label: string;
	primary: number;
	secondary: number;
	note: string;
}

export interface DemoPresetConfig {
	slug: TopicSlug;
	kind: DemoKind;
	tier: DemoTier;
	summary: string;
	primary: SliderConfig;
	secondary: SliderConfig;
	presets: DemoPreset[];
}

const pct = (value: number) => `${Math.round(value * 100)}%`;

export const DEMO_PRESETS: Record<TopicSlug, DemoPresetConfig> = {
	mlp: {
		slug: 'mlp',
		kind: 'network',
		tier: 'mini-train',
		summary: 'See how extra depth bends a simple decision surface.',
		primary: { label: 'Hidden layers', min: 2, max: 6, initial: 4 },
		secondary: { label: 'Nonlinearity', min: 0.2, max: 1, step: 0.05, initial: 0.65, format: pct },
		presets: [
			{ label: 'XOR', primary: 4, secondary: 0.8, note: 'A nonlinear boundary needs hidden units.' },
			{ label: 'Shallow', primary: 2, secondary: 0.35, note: 'Capacity stays limited.' }
		]
	},
	cnn: {
		slug: 'cnn',
		kind: 'image-grid',
		tier: 'mini-train',
		summary: 'Kernel size and stride change what local image structure is preserved.',
		primary: { label: 'Kernel size', min: 2, max: 5, initial: 3 },
		secondary: { label: 'Stride', min: 1, max: 3, initial: 1 },
		presets: [
			{ label: 'Edges', primary: 3, secondary: 1, note: 'Small kernels catch local contrast well.' },
			{ label: 'Aggressive', primary: 5, secondary: 2, note: 'Larger jumps trade detail for efficiency.' }
		]
	},
	rnn: {
		slug: 'rnn',
		kind: 'sequence',
		tier: 'mini-train',
		summary: 'The hidden state rolls information forward token by token.',
		primary: { label: 'Sequence length', min: 4, max: 10, initial: 6 },
		secondary: { label: 'Memory retention', min: 0.2, max: 0.95, step: 0.05, initial: 0.6, format: pct },
		presets: [
			{ label: 'Short context', primary: 5, secondary: 0.35, note: 'Earlier tokens fade quickly.' },
			{ label: 'Persistent', primary: 9, secondary: 0.85, note: 'Longer memory is possible but harder to train.' }
		]
	},
	'lstm-gru': {
		slug: 'lstm-gru',
		kind: 'sequence',
		tier: 'mini-train',
		summary: 'Gate openness determines what enters, persists, and is exposed from memory.',
		primary: { label: 'Context length', min: 4, max: 10, initial: 7 },
		secondary: { label: 'Gate openness', min: 0.15, max: 0.95, step: 0.05, initial: 0.7, format: pct },
		presets: [
			{ label: 'Forgetful', primary: 8, secondary: 0.35, note: 'Useful when stale context hurts.' },
			{ label: 'Sticky memory', primary: 8, secondary: 0.85, note: 'Long-range dependencies survive longer.' }
		]
	},
	transformers: {
		slug: 'transformers',
		kind: 'attention',
		tier: 'mini-train',
		summary: 'Attention reallocates focus dynamically instead of compressing everything into one hidden state.',
		primary: { label: 'Token count', min: 4, max: 9, initial: 6 },
		secondary: { label: 'Focus sharpness', min: 0.2, max: 1, step: 0.05, initial: 0.75, format: pct },
		presets: [
			{ label: 'Diffuse', primary: 7, secondary: 0.35, note: 'Attention spreads broadly.' },
			{ label: 'Sharp', primary: 6, secondary: 0.9, note: 'A few token pairs dominate.' }
		]
	},
	autoencoders: {
		slug: 'autoencoders',
		kind: 'latent',
		tier: 'mini-train',
		summary: 'A bottleneck forces the model to retain only the most useful factors.',
		primary: { label: 'Latent size', min: 2, max: 6, initial: 3 },
		secondary: { label: 'Reconstruction fidelity', min: 0.25, max: 1, step: 0.05, initial: 0.7, format: pct },
		presets: [
			{ label: 'Tight bottleneck', primary: 2, secondary: 0.55, note: 'Compression is strong but detail is lost.' },
			{ label: 'Loose bottleneck', primary: 5, secondary: 0.85, note: 'Reconstruction improves with more latent capacity.' }
		]
	},
	vae: {
		slug: 'vae',
		kind: 'latent',
		tier: 'mini-train',
		summary: 'Sampling a smooth latent distribution trades exactness for generative structure.',
		primary: { label: 'Latent spread', min: 1, max: 5, initial: 3 },
		secondary: { label: 'KL pressure', min: 0.1, max: 1, step: 0.05, initial: 0.55, format: pct },
		presets: [
			{ label: 'Structured', primary: 3, secondary: 0.8, note: 'Latent space becomes smoother for sampling.' },
			{ label: 'Loose', primary: 4, secondary: 0.3, note: 'Reconstruction wins over regularization.' }
		]
	},
	gan: {
		slug: 'gan',
		kind: 'adversarial',
		tier: 'mini-train',
		summary: 'Generator and discriminator improve through a competitive feedback loop.',
		primary: { label: 'Generator strength', min: 1, max: 5, initial: 3 },
		secondary: { label: 'Discriminator sharpness', min: 0.2, max: 1, step: 0.05, initial: 0.7, format: pct },
		presets: [
			{ label: 'Balanced', primary: 3, secondary: 0.65, note: 'Both players improve together.' },
			{ label: 'Collapse risk', primary: 2, secondary: 0.9, note: 'An overpowered discriminator can destabilize learning.' }
		]
	},
	diffusion: {
		slug: 'diffusion',
		kind: 'diffusion',
		tier: 'mini-train',
		summary: 'Diffusion learns to reverse a slow corruption process step by step.',
		primary: { label: 'Noise steps', min: 4, max: 12, initial: 8 },
		secondary: { label: 'Denoise quality', min: 0.2, max: 1, step: 0.05, initial: 0.7, format: pct },
		presets: [
			{ label: 'Fast sample', primary: 5, secondary: 0.55, note: 'Fewer steps are faster but coarser.' },
			{ label: 'Refined', primary: 10, secondary: 0.8, note: 'More iterative refinement produces cleaner samples.' }
		]
	},
	gnn: {
		slug: 'gnn',
		kind: 'graph',
		tier: 'mini-train',
		summary: 'Node embeddings update by aggregating messages from neighbors.',
		primary: { label: 'Hops', min: 1, max: 4, initial: 2 },
		secondary: { label: 'Message strength', min: 0.2, max: 1, step: 0.05, initial: 0.65, format: pct },
		presets: [
			{ label: 'Local', primary: 1, secondary: 0.55, note: 'Only immediate neighbors contribute.' },
			{ label: 'Over-smoothed', primary: 4, secondary: 0.85, note: 'Too many hops can blur node identity.' }
		]
	},
	'graph-transformer-hybrids': {
		slug: 'graph-transformer-hybrids',
		kind: 'hybrid',
		tier: 'visual',
		summary: 'Global attention augments local graph message passing.',
		primary: { label: 'Graph hops', min: 1, max: 4, initial: 2 },
		secondary: { label: 'Attention reach', min: 0.2, max: 1, step: 0.05, initial: 0.7, format: pct },
		presets: [
			{ label: 'Local bias', primary: 3, secondary: 0.35, note: 'Graph structure dominates.' },
			{ label: 'Global bias', primary: 1, secondary: 0.9, note: 'Long-range dependencies gain weight.' }
		]
	},
	'neuro-symbolic-systems': {
		slug: 'neuro-symbolic-systems',
		kind: 'probabilistic',
		tier: 'visual',
		summary: 'Neural perception feeds discrete rules or constraints that sharpen decisions.',
		primary: { label: 'Rule count', min: 2, max: 6, initial: 4 },
		secondary: { label: 'Constraint weight', min: 0.2, max: 1, step: 0.05, initial: 0.75, format: pct },
		presets: [
			{ label: 'Soft rules', primary: 4, secondary: 0.35, note: 'The neural model still dominates.' },
			{ label: 'Hard constraints', primary: 5, secondary: 0.9, note: 'Rules strongly restrict outputs.' }
		]
	},
	pinns: {
		slug: 'pinns',
		kind: 'scientific',
		tier: 'visual',
		summary: 'A physics residual acts like a structural regularizer during training.',
		primary: { label: 'Boundary points', min: 3, max: 8, initial: 5 },
		secondary: { label: 'Physics weight', min: 0.2, max: 1, step: 0.05, initial: 0.65, format: pct },
		presets: [
			{ label: 'Data-driven', primary: 4, secondary: 0.3, note: 'Fit follows observations more closely.' },
			{ label: 'Constraint-driven', primary: 6, secondary: 0.85, note: 'The solution stays closer to known laws.' }
		]
	},
	'meta-learning': {
		slug: 'meta-learning',
		kind: 'meta',
		tier: 'visual',
		summary: 'The learner optimizes for fast adaptation across many related tasks.',
		primary: { label: 'Task diversity', min: 3, max: 8, initial: 5 },
		secondary: { label: 'Adaptation speed', min: 0.2, max: 1, step: 0.05, initial: 0.65, format: pct },
		presets: [
			{ label: 'Generalist', primary: 7, secondary: 0.45, note: 'Broader task variation improves robustness.' },
			{ label: 'Rapid adapt', primary: 5, secondary: 0.9, note: 'Few-shot adjustment becomes more aggressive.' }
		]
	},
	'rl-architectures': {
		slug: 'rl-architectures',
		kind: 'gridworld',
		tier: 'visual',
		summary: 'Policies map states to actions while value estimates guide improvement.',
		primary: { label: 'Exploration', min: 0.1, max: 1, step: 0.05, initial: 0.45, format: pct },
		secondary: { label: 'Reward focus', min: 0.2, max: 1, step: 0.05, initial: 0.7, format: pct },
		presets: [
			{ label: 'Explore', primary: 0.8, secondary: 0.45, note: 'The agent samples more uncertain paths.' },
			{ label: 'Exploit', primary: 0.2, secondary: 0.9, note: 'The policy leans into known rewards.' }
		]
	},
	'q-learning': {
		slug: 'q-learning',
		kind: 'gridworld',
		tier: 'mini-train',
		summary: 'Off-policy value updates target the best next action, even if behavior explores.',
		primary: { label: 'Exploration', min: 0.1, max: 1, step: 0.05, initial: 0.35, format: pct },
		secondary: { label: 'Learning rate', min: 0.1, max: 1, step: 0.05, initial: 0.6, format: pct },
		presets: [
			{ label: 'Cautious', primary: 0.3, secondary: 0.35, note: 'Convergence is slower but steadier.' },
			{ label: 'Aggressive', primary: 0.55, secondary: 0.8, note: 'Updates react faster to reward.' }
		]
	},
	sarsa: {
		slug: 'sarsa',
		kind: 'gridworld',
		tier: 'mini-train',
		summary: 'On-policy updates learn the value of the behavior policy actually being followed.',
		primary: { label: 'Exploration', min: 0.1, max: 1, step: 0.05, initial: 0.45, format: pct },
		secondary: { label: 'Learning rate', min: 0.1, max: 1, step: 0.05, initial: 0.55, format: pct },
		presets: [
			{ label: 'Safe', primary: 0.55, secondary: 0.45, note: 'On-policy learning tends to keep risky moves in view.' },
			{ label: 'Greedy', primary: 0.2, secondary: 0.75, note: 'Behavior policy quickly narrows.' }
		]
	},
	'monte-carlo-methods': {
		slug: 'monte-carlo-methods',
		kind: 'gridworld',
		tier: 'mini-train',
		summary: 'Returns are estimated from whole sampled episodes rather than one-step bootstraps.',
		primary: { label: 'Episode length', min: 3, max: 10, initial: 6 },
		secondary: { label: 'Sample count', min: 0.2, max: 1, step: 0.05, initial: 0.55, format: pct },
		presets: [
			{ label: 'Few rollouts', primary: 5, secondary: 0.35, note: 'Value estimates remain noisy.' },
			{ label: 'Many rollouts', primary: 8, secondary: 0.85, note: 'Variance drops as more episodes accumulate.' }
		]
	},
	'genetic-algorithms': {
		slug: 'genetic-algorithms',
		kind: 'evolution',
		tier: 'mini-train',
		summary: 'Selection and mutation push a population toward higher-fitness candidates.',
		primary: { label: 'Population size', min: 6, max: 16, initial: 10 },
		secondary: { label: 'Mutation rate', min: 0.1, max: 1, step: 0.05, initial: 0.45, format: pct },
		presets: [
			{ label: 'Exploit', primary: 8, secondary: 0.25, note: 'Search stabilizes around good candidates.' },
			{ label: 'Explore', primary: 14, secondary: 0.8, note: 'Diversity stays high for longer.' }
		]
	},
	'genetic-programming': {
		slug: 'genetic-programming',
		kind: 'evolution',
		tier: 'visual',
		summary: 'Programs themselves evolve, so structure changes alongside parameters.',
		primary: { label: 'Program depth', min: 2, max: 6, initial: 4 },
		secondary: { label: 'Mutation rate', min: 0.1, max: 1, step: 0.05, initial: 0.4, format: pct },
		presets: [
			{ label: 'Compact', primary: 3, secondary: 0.3, note: 'Trees stay shallow and easier to interpret.' },
			{ label: 'Creative', primary: 5, secondary: 0.75, note: 'Structure changes more radically.' }
		]
	},
	neuroevolution: {
		slug: 'neuroevolution',
		kind: 'evolution',
		tier: 'visual',
		summary: 'Evolution searches neural architectures or weights without gradient descent.',
		primary: { label: 'Population size', min: 6, max: 16, initial: 10 },
		secondary: { label: 'Topology drift', min: 0.1, max: 1, step: 0.05, initial: 0.55, format: pct },
		presets: [
			{ label: 'Weight search', primary: 10, secondary: 0.3, note: 'Topology stays relatively stable.' },
			{ label: 'Topology search', primary: 12, secondary: 0.85, note: 'Network structure mutates more often.' }
		]
	},
	'decision-trees': {
		slug: 'decision-trees',
		kind: 'tree',
		tier: 'mini-train',
		summary: 'Greedy splits partition feature space into increasingly pure leaves.',
		primary: { label: 'Depth', min: 2, max: 6, initial: 4 },
		secondary: { label: 'Min purity', min: 0.2, max: 1, step: 0.05, initial: 0.65, format: pct },
		presets: [
			{ label: 'Interpretable', primary: 3, secondary: 0.55, note: 'The tree stays short enough to inspect.' },
			{ label: 'Overfit risk', primary: 6, secondary: 0.9, note: 'Leaves memorize finer regions.' }
		]
	},
	'random-forests': {
		slug: 'random-forests',
		kind: 'tree',
		tier: 'visual',
		summary: 'Many de-correlated trees vote together to reduce variance.',
		primary: { label: 'Tree count', min: 4, max: 12, initial: 8 },
		secondary: { label: 'Feature randomness', min: 0.2, max: 1, step: 0.05, initial: 0.65, format: pct },
		presets: [
			{ label: 'Stable', primary: 10, secondary: 0.6, note: 'Voting smooths individual tree noise.' },
			{ label: 'Diverse', primary: 8, secondary: 0.9, note: 'Stronger randomness decorrelates trees.' }
		]
	},
	'gradient-boosting': {
		slug: 'gradient-boosting',
		kind: 'tree',
		tier: 'visual',
		summary: 'Weak learners are added sequentially to correct residual errors.',
		primary: { label: 'Rounds', min: 3, max: 12, initial: 6 },
		secondary: { label: 'Learning rate', min: 0.1, max: 1, step: 0.05, initial: 0.45, format: pct },
		presets: [
			{ label: 'Conservative', primary: 8, secondary: 0.25, note: 'Small residual corrections accumulate gradually.' },
			{ label: 'Fast fit', primary: 5, secondary: 0.75, note: 'Each learner makes a larger correction.' }
		]
	},
	'linear-regression': {
		slug: 'linear-regression',
		kind: 'boundary',
		tier: 'visual',
		summary: 'A straight line minimizes squared residual error on continuous targets.',
		primary: { label: 'Slope', min: 1, max: 8, initial: 4 },
		secondary: { label: 'Noise', min: 0.1, max: 1, step: 0.05, initial: 0.35, format: pct },
		presets: [
			{ label: 'Clean', primary: 4, secondary: 0.2, note: 'The line explains most variance.' },
			{ label: 'Noisy', primary: 5, secondary: 0.75, note: 'Residuals grow quickly.' }
		]
	},
	'logistic-regression': {
		slug: 'logistic-regression',
		kind: 'boundary',
		tier: 'visual',
		summary: 'A sigmoid turns a linear score into a class probability.',
		primary: { label: 'Margin tilt', min: 1, max: 8, initial: 4 },
		secondary: { label: 'Confidence', min: 0.2, max: 1, step: 0.05, initial: 0.65, format: pct },
		presets: [
			{ label: 'Balanced', primary: 4, secondary: 0.55, note: 'Probabilities transition smoothly across the boundary.' },
			{ label: 'Sharp', primary: 6, secondary: 0.9, note: 'Classification becomes more decisive.' }
		]
	},
	'ridge-lasso': {
		slug: 'ridge-lasso',
		kind: 'boundary',
		tier: 'visual',
		summary: 'Regularization shrinks weights to control variance and sometimes induce sparsity.',
		primary: { label: 'Feature count', min: 3, max: 10, initial: 6 },
		secondary: { label: 'Penalty', min: 0.1, max: 1, step: 0.05, initial: 0.55, format: pct },
		presets: [
			{ label: 'Ridge-like', primary: 7, secondary: 0.4, note: 'Weights shrink but usually remain non-zero.' },
			{ label: 'Lasso-like', primary: 8, secondary: 0.85, note: 'More features get pushed close to zero.' }
		]
	},
	svm: {
		slug: 'svm',
		kind: 'boundary',
		tier: 'visual',
		summary: 'SVMs maximize margin and can use kernels to separate nonlinear classes.',
		primary: { label: 'Margin width', min: 1, max: 8, initial: 5 },
		secondary: { label: 'Kernel effect', min: 0.1, max: 1, step: 0.05, initial: 0.55, format: pct },
		presets: [
			{ label: 'Linear', primary: 5, secondary: 0.2, note: 'A wide straight margin works on clean data.' },
			{ label: 'Kernelized', primary: 4, secondary: 0.9, note: 'Curved boundaries handle harder layouts.' }
		]
	},
	'naive-bayes': {
		slug: 'naive-bayes',
		kind: 'probabilistic',
		tier: 'visual',
		summary: 'Class probabilities combine evidence under a strong conditional independence assumption.',
		primary: { label: 'Feature count', min: 3, max: 8, initial: 5 },
		secondary: { label: 'Evidence strength', min: 0.2, max: 1, step: 0.05, initial: 0.6, format: pct },
		presets: [
			{ label: 'Sparse text', primary: 6, secondary: 0.7, note: 'Independent word evidence often works surprisingly well.' },
			{ label: 'Correlated', primary: 5, secondary: 0.3, note: 'Independence assumptions become less realistic.' }
		]
	},
	'bayesian-networks': {
		slug: 'bayesian-networks',
		kind: 'probabilistic',
		tier: 'visual',
		summary: 'Directed graphs encode conditional dependencies and support probabilistic inference.',
		primary: { label: 'Node count', min: 4, max: 8, initial: 5 },
		secondary: { label: 'Certainty', min: 0.2, max: 1, step: 0.05, initial: 0.65, format: pct },
		presets: [
			{ label: 'Strong priors', primary: 5, secondary: 0.85, note: 'Evidence propagates more decisively.' },
			{ label: 'Uncertain', primary: 6, secondary: 0.35, note: 'Posterior beliefs remain diffuse.' }
		]
	},
	hmms: {
		slug: 'hmms',
		kind: 'probabilistic',
		tier: 'visual',
		summary: 'A hidden state sequence emits observations while transitions encode temporal structure.',
		primary: { label: 'State count', min: 2, max: 6, initial: 4 },
		secondary: { label: 'Transition confidence', min: 0.2, max: 1, step: 0.05, initial: 0.6, format: pct },
		presets: [
			{ label: 'Sticky states', primary: 3, secondary: 0.85, note: 'The process remains in states for longer.' },
			{ label: 'Switchy', primary: 5, secondary: 0.35, note: 'Transitions happen more frequently.' }
		]
	},
	knn: {
		slug: 'knn',
		kind: 'boundary',
		tier: 'visual',
		summary: 'Predictions come from the nearest labeled examples in feature space.',
		primary: { label: 'Neighbors', min: 1, max: 9, initial: 5 },
		secondary: { label: 'Distance weighting', min: 0.1, max: 1, step: 0.05, initial: 0.45, format: pct },
		presets: [
			{ label: 'Local', primary: 1, secondary: 0.85, note: 'The boundary gets highly detailed.' },
			{ label: 'Smooth', primary: 7, secondary: 0.35, note: 'More neighbors average out local noise.' }
		]
	},
	'k-means': {
		slug: 'k-means',
		kind: 'cluster',
		tier: 'mini-train',
		summary: 'Centroids move toward the mean of assigned points until clusters stabilize.',
		primary: { label: 'Cluster count', min: 2, max: 6, initial: 3 },
		secondary: { label: 'Spread', min: 0.15, max: 1, step: 0.05, initial: 0.45, format: pct },
		presets: [
			{ label: 'Compact', primary: 3, secondary: 0.25, note: 'Centroids settle into tight groups.' },
			{ label: 'Messy', primary: 4, secondary: 0.75, note: 'Overlap makes assignments less stable.' }
		]
	},
	'hierarchical-clustering': {
		slug: 'hierarchical-clustering',
		kind: 'cluster',
		tier: 'visual',
		summary: 'Clusters merge progressively, building a dendrogram instead of a single partition.',
		primary: { label: 'Merge depth', min: 2, max: 6, initial: 4 },
		secondary: { label: 'Linkage tightness', min: 0.2, max: 1, step: 0.05, initial: 0.6, format: pct },
		presets: [
			{ label: 'Fine groups', primary: 3, secondary: 0.8, note: 'Stop early to keep smaller clusters.' },
			{ label: 'Coarse groups', primary: 6, secondary: 0.4, note: 'More merges produce broader groupings.' }
		]
	},
	dbscan: {
		slug: 'dbscan',
		kind: 'cluster',
		tier: 'visual',
		summary: 'Density connectivity finds arbitrary-shaped clusters and labels sparse points as noise.',
		primary: { label: 'Neighborhood radius', min: 1, max: 7, initial: 4 },
		secondary: { label: 'Min samples', min: 2, max: 8, initial: 4 },
		presets: [
			{ label: 'Strict', primary: 3, secondary: 6, note: 'More points fall into noise.' },
			{ label: 'Loose', primary: 5, secondary: 3, note: 'Clusters connect across wider regions.' }
		]
	},
	pca: {
		slug: 'pca',
		kind: 'manifold',
		tier: 'mini-train',
		summary: 'PCA finds orthogonal directions of maximum variance for linear compression.',
		primary: { label: 'Variance axis', min: 1, max: 7, initial: 4 },
		secondary: { label: 'Retained variance', min: 0.2, max: 1, step: 0.05, initial: 0.75, format: pct },
		presets: [
			{ label: '2D summary', primary: 4, secondary: 0.7, note: 'A few principal directions explain most spread.' },
			{ label: 'Tight projection', primary: 3, secondary: 0.45, note: 'Compression becomes more aggressive.' }
		]
	},
	tsne: {
		slug: 'tsne',
		kind: 'manifold',
		tier: 'mini-train',
		summary: 't-SNE preserves local neighborhoods by matching pairwise similarity structure.',
		primary: { label: 'Perplexity', min: 2, max: 8, initial: 5 },
		secondary: { label: 'Separation', min: 0.2, max: 1, step: 0.05, initial: 0.7, format: pct },
		presets: [
			{ label: 'Local', primary: 3, secondary: 0.8, note: 'Very local structure dominates the map.' },
			{ label: 'Balanced', primary: 6, secondary: 0.55, note: 'Neighborhoods broaden slightly.' }
		]
	},
	umap: {
		slug: 'umap',
		kind: 'manifold',
		tier: 'mini-train',
		summary: 'UMAP builds a fuzzy neighborhood graph and optimizes a low-dimensional layout.',
		primary: { label: 'Neighbors', min: 2, max: 9, initial: 6 },
		secondary: { label: 'Min distance', min: 0.1, max: 1, step: 0.05, initial: 0.45, format: pct },
		presets: [
			{ label: 'Separated', primary: 5, secondary: 0.2, note: 'Clusters stay visibly apart.' },
			{ label: 'Connected', primary: 8, secondary: 0.75, note: 'Global continuity becomes stronger.' }
		]
	}
};

export const getDemoPreset = (slug: TopicSlug) => DEMO_PRESETS[slug];
