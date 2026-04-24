import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'logistic-regression',
	title: "Logistic Regression",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'support',
	oneLiner: "Logistic regression maps a linear score through a sigmoid to estimate class probability.",
	intuition: "It keeps the simplicity of a linear separator but returns calibrated class likelihoods instead of raw scores.",
	architectureBullets: ["Linear log-odds are converted into probabilities.","Cross-entropy is optimized for classification.","Decision boundaries remain linear in feature space."],
	strengths: ["Fast, stable, and interpretable","Good probabilistic baseline","Works well with sparse linear signals"],
	weaknesses: ["Limited to linear decision boundaries without feature engineering","Can underfit complex interactions","Scaling and regularization still matter"],
	useCases: ["Binary classification","Text classification baselines","Probabilistic tabular models"],
	math: {"intuition":"The sigmoid squashes any linear score into the range from 0 to 1.","formula":"P(y=1|x) = sigma(w^T x + b)","deepDiveMarkdown":"Logistic regression is often underestimated because clean features make linear boundaries surprisingly competitive."},
	demo: defineDemo('logistic-regression', () => import('$presentation/demos/logistic-regression.svelte'), "See how margin tilt and confidence reshape a simple classification surface."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"Logistic Regression docs","url":"https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression","note":"Practical guide"},{"label":"Elements of Statistical Learning","url":"https://hastie.su.domains/ElemStatLearn/","note":"Theoretical grounding"}]
});
