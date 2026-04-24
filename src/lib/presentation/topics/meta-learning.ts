import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'meta-learning',
	title: "Meta-learning Models",
	family: "Graph and advanced neural systems",
	talkPriority: 'support',
	oneLiner: "Meta-learning trains models to adapt quickly to new tasks rather than just solve one task well.",
	intuition: "The outer loop learns an initialization or update rule that makes inner-loop adaptation cheap.",
	architectureBullets: ["Training samples many related tasks rather than one static dataset.","Meta-parameters optimize future fast adaptation.","Few-shot performance is the typical target."],
	strengths: ["Strong few-shot adaptation","Reuses experience across tasks","Useful when tasks repeat but labels are scarce"],
	weaknesses: ["Task distribution matters heavily","Bi-level optimization can be expensive","Generalization outside the training task family can fail"],
	useCases: ["Few-shot classification","Adaptive control","Fast personalization"],
	math: {"intuition":"The outer objective evaluates performance after one or a few inner updates.","formula":"theta* = argmin_theta sum_T L_T(U(theta, T))","deepDiveMarkdown":"Meta-learning is about optimizing for learnability, not just task accuracy at the end of training."},
	demo: defineDemo('meta-learning', () => import('$presentation/demos/meta-learning.svelte'), "Compare broader task diversity with faster inner-loop adaptation."),
	references: [{"label":"MAML","url":"https://arxiv.org/abs/1703.03400","note":"Canonical gradient-based meta-learning paper"},{"label":"Meta-Learning survey","url":"https://arxiv.org/abs/1810.03548","note":"Broad survey"},{"label":"Dive into Deep Learning","url":"https://d2l.ai/","note":"Practical open textbook"}]
});
