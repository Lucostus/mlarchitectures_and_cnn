import type { ChapterDefinition } from '$presentation/types';

export const CHAPTERS: ChapterDefinition[] = [
	{
		id: 'foundations',
		title: 'Foundations and Sequence Models',
		kicker: 'From dense layers to attention',
		summary:
			'These architectures move from static function approximation into models that can preserve or reweight context.',
		accent: 'from-coral-500/70 via-coral-400/50 to-cyan-400/40',
		topics: ['mlp', 'cnn', 'rnn', 'lstm-gru', 'transformers']
	},
	{
		id: 'representation',
		title: 'Representation and Generation',
		kicker: 'Learning useful latent structure',
		summary:
			'Autoencoding and generative families compress, sample, and reconstruct data in latent spaces.',
		accent: 'from-teal-400/70 via-cyan-400/45 to-gold-400/40',
		topics: ['autoencoders', 'vae', 'gan', 'diffusion']
	},
	{
		id: 'advanced-neural',
		title: 'Graph and Advanced Neural Systems',
		kicker: 'Structure-aware and hybrid reasoning',
		summary:
			'These systems combine neural learners with graph structure, symbolic priors, physics constraints, or task adaptation.',
		accent: 'from-gold-400/70 via-coral-400/45 to-lime-400/35',
		topics: ['gnn', 'graph-transformer-hybrids', 'neuro-symbolic-systems', 'pinns', 'meta-learning']
	},
	{
		id: 'rl-evolution',
		title: 'Reinforcement Learning and Evolutionary Search',
		kicker: 'Decision making under feedback',
		summary:
			'Reinforcement and evolutionary approaches optimize sequential behavior through reward signals or population search.',
		accent: 'from-lime-400/65 via-teal-400/45 to-cyan-400/35',
		topics: [
			'rl-architectures',
			'q-learning',
			'sarsa',
			'monte-carlo-methods',
			'genetic-algorithms',
			'genetic-programming',
			'neuroevolution'
		]
	},
	{
		id: 'classical-supervised',
		title: 'Classical Supervised and Probabilistic Methods',
		kicker: 'Strong baselines with interpretable tradeoffs',
		summary:
			'These methods remain competitive when data is structured, compute is limited, or interpretability matters.',
		accent: 'from-cyan-400/65 via-teal-400/40 to-sand-200/30',
		topics: [
			'decision-trees',
			'random-forests',
			'gradient-boosting',
			'linear-regression',
			'logistic-regression',
			'ridge-lasso',
			'svm',
			'naive-bayes',
			'bayesian-networks',
			'hmms',
			'knn'
		]
	},
	{
		id: 'unsupervised',
		title: 'Unsupervised Structure and Manifolds',
		kicker: 'Finding patterns without labels',
		summary:
			'Clustering and dimensionality reduction methods reveal groups, geometry, and compressed representations.',
		accent: 'from-sand-200/45 via-gold-400/45 to-coral-400/45',
		topics: ['k-means', 'hierarchical-clustering', 'dbscan', 'pca', 'tsne', 'umap']
	}
];
