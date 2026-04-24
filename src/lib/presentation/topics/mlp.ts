import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'mlp',
	title: "Feedforward Neural Networks / MLPs",
	family: "Foundations and sequence models",
	talkPriority: 'core',
	oneLiner: "Dense layers compose affine transforms and nonlinearities to model fixed-size input-output mappings.",
	intuition: "An MLP repeatedly remixes a fixed-size feature vector until a task that would be linear in the wrong feature space becomes easier in the learned one.",
	architectureBullets: ["Each layer applies a learned matrix, bias, and nonlinearity.","Unlike linear regression or logistic regression, stacked nonlinear layers can bend the decision boundary.","Depth lets the network build progressively more useful internal features before the output layer."],
	strengths: ["Flexible universal approximator","Works well on engineered tabular features","Good baseline for dense prediction problems"],
	weaknesses: ["Ignores explicit structure in space or time","Needs scaling and regularization","Can overfit small datasets quickly"],
	useCases: ["Tabular classification","Regression on structured features","Small autoencoder or policy networks"],
	math: {"intuition":"Layered affine maps plus nonlinear activation create curved decision boundaries.","formula":"h_(l+1) = sigma(W_l h_l + b_l)","deepDiveMarkdown":"Training minimizes loss over all weights using gradient descent; depth expands expressivity but can complicate optimization."},
	demo: defineDemo('mlp', () => import('$presentation/demos/mlp.svelte'), "See how added hidden layers and stronger nonlinearities reshape a toy decision surface."),
	references: [{"label":"Learning Representations by Back-Propagating Errors","url":"https://www.nature.com/articles/323533a0","note":"Canonical backpropagation reference for multilayer perceptrons"},{"label":"Deep Learning Book","url":"https://www.deeplearningbook.org/","note":"Supports the expressivity and optimization discussion"},{"label":"CS231n Neural Networks","url":"https://cs231n.github.io/neural-networks-1/","note":"Supports the geometric intuition behind nonlinear decision boundaries"}]
});
