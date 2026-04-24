export const COMPARISON_SLIDES = [
	{
		id: 'comparison-model-selection',
		title: 'Model Selection Heuristics',
		eyebrow: 'Which family should you reach for first?',
		rows: [
			['Small tabular dataset', 'Gradient boosting or random forests'],
			['Image recognition with local patterns', 'CNNs first, then vision transformers if scale allows'],
			['Long context text or code', 'Transformers'],
			['Sequential control task', 'RL with value or policy methods'],
			['Need a strong interpretable baseline', 'Linear/logistic regression, trees, Naive Bayes'],
			['Need structure-aware reasoning', 'GNNs or neuro-symbolic hybrids']
		]
	},
	{
		id: 'comparison-training-tradeoffs',
		title: 'Training and Deployment Tradeoffs',
		eyebrow: 'Compute, data, and interpretability rarely peak together.',
		rows: [
			['Highest deployment simplicity', 'Linear models, trees, Naive Bayes'],
			['Highest data hunger', 'Large transformers and diffusion models'],
			['Fastest training loop for prototypes', 'k-NN, linear models, shallow trees'],
			['Most unstable optimization', 'GANs and some RL setups'],
			['Best prior injection', 'PINNs, Bayesian networks, neuro-symbolic systems'],
			['Best latent controllability', 'VAEs and structured autoencoders']
		]
	}
];
