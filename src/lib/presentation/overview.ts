import type { FamilyOverview } from '$presentation/types';

export const FAMILY_OVERVIEW: FamilyOverview[] = [
	{
		title: 'Dense and convolutional networks',
		bestFor: 'Tabular and image tasks with stable supervised objectives.',
		pros: ['Strong function approximation', 'Easy to stack and optimize', 'CNNs exploit spatial locality'],
		cons: ['Need data and tuning', 'Weak explicit memory', 'Less interpretable than classical baselines'],
		dataFits: ['tabular', 'image']
	},
	{
		title: 'Sequence and attention models',
		bestFor: 'Text, time series, code, and any modality where order or long-range context matters.',
		pros: ['Capture temporal context', 'Transformers scale well', 'Flexible across modalities'],
		cons: ['Training cost can be high', 'RNNs struggle with long dependencies', 'Attention models can be opaque'],
		dataFits: ['sequence', 'multimodal']
	},
	{
		title: 'Latent and generative models',
		bestFor: 'Compression, synthesis, denoising, representation learning, and controllable sampling.',
		pros: ['Useful latent spaces', 'Strong generation quality', 'Can support self-supervised pipelines'],
		cons: ['Training instability for GANs', 'Diffusion is slow at sampling', 'Latent quality depends on objective'],
		dataFits: ['latent-generation', 'image', 'audio']
	},
	{
		title: 'Graph, symbolic, and scientific hybrids',
		bestFor: 'Relational data, rules plus learning, and domains with known structure or physical laws.',
		pros: ['Injects structure and priors', 'Can improve sample efficiency', 'Good for non-Euclidean data'],
		cons: ['More design complexity', 'Harder tooling', 'Scaling depends heavily on graph size and sparsity'],
		dataFits: ['graph', 'scientific', 'knowledge']
	},
	{
		title: 'Control and search architectures',
		bestFor: 'Decision making, exploration, adaptive control, and optimization over policies or populations.',
		pros: ['Optimizes behavior directly', 'Works without labeled targets', 'Evolution handles non-differentiable search'],
		cons: ['Sample inefficient', 'Credit assignment is hard', 'Results can vary sharply with reward design'],
		dataFits: ['control', 'simulation']
	},
	{
		title: 'Classical ML and manifold methods',
		bestFor: 'Structured datasets, interpretable baselines, smaller data regimes, and exploratory analysis.',
		pros: ['Fast to train', 'Often strong baselines', 'Good interpretability or geometric intuition'],
		cons: ['Feature engineering may matter', 'Some methods do not scale cleanly', 'Can miss rich hierarchical structure'],
		dataFits: ['tabular', 'small-data', 'exploration']
	}
];

export const PROBLEM_FIT_MAP = [
	{ problem: 'Tabular prediction', families: ['Dense/MLP', 'Trees/Boosting', 'Linear models', 'SVM'] },
	{ problem: 'Image understanding', families: ['CNN', 'Transformers', 'Autoencoders', 'Diffusion'] },
	{ problem: 'Sequence modeling', families: ['RNN', 'LSTM/GRU', 'Transformers', 'HMM'] },
	{ problem: 'Relational reasoning', families: ['GNN', 'Bayesian networks', 'Graph+Transformer hybrids'] },
	{ problem: 'Control and policies', families: ['RL architectures', 'Q-Learning', 'SARSA', 'Monte Carlo'] },
	{ problem: 'Latent generation', families: ['VAE', 'GAN', 'Diffusion', 'Autoencoders'] }
];
