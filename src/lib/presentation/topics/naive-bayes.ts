import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'naive-bayes',
	title: "Naive Bayes",
	family: "Classical supervised and probabilistic methods",
	talkPriority: 'support',
	oneLiner: "Naive Bayes combines feature evidence assuming conditional independence within each class.",
	intuition: "It often works because many weakly informative independent signals are enough, especially in sparse domains.",
	architectureBullets: ["Class priors set the initial belief.","Each feature contributes evidence independently under the model.","Posterior class probabilities follow from Bayes rule."],
	strengths: ["Extremely fast","Works well on text and sparse features","Good baseline with small data"],
	weaknesses: ["Independence assumption is usually false","Limited interaction modeling","Calibration can be poor"],
	useCases: ["Spam filtering","Document classification","Quick probabilistic baselines"],
	math: {"intuition":"Posterior probability multiplies prior belief by per-feature likelihood contributions.","formula":"P(y|x) proportional to P(y) product_i P(x_i | y)","deepDiveMarkdown":"The model is “naive,” but that simplification keeps variance low and learning extremely fast."},
	demo: defineDemo('naive-bayes', () => import('$presentation/demos/naive-bayes.svelte'), "See how stronger or weaker evidence changes posterior class belief."),
	references: [{"label":"Scikit-learn User Guide","url":"https://scikit-learn.org/stable/user_guide.html","note":"Canonical classical ML guide"},{"label":"Naive Bayes docs","url":"https://scikit-learn.org/stable/modules/naive_bayes.html","note":"Practical guide"},{"label":"Pattern Classification","url":"https://archive.org/details/patternclassific0000duda","note":"Classic reference"}]
});
