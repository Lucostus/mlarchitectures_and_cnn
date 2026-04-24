import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'neuro-symbolic-systems',
	title: "Neuro-symbolic Systems",
	family: "Graph and advanced neural systems",
	talkPriority: 'support',
	oneLiner: "Neuro-symbolic systems combine neural perception with rules, logic, or discrete reasoning.",
	intuition: "Neural nets are good at perception; symbolic systems are good at explicit structure and constraints.",
	architectureBullets: ["Neural modules turn raw data into candidate facts or entities.","Rules or logic constrain what conclusions are valid.","The full system can reason more explicitly than a pure black box."],
	strengths: ["Injects domain knowledge","Can improve explainability","Useful when hard rules matter"],
	weaknesses: ["Integration is hard","Symbolic representations can be brittle","Tooling is less mature than standard deep learning"],
	useCases: ["Knowledge-intensive QA","Planning with perception","Scientific and enterprise rule systems"],
	math: {"intuition":"The core idea is structured constraints on top of learned scores.","formula":"argmax_y f_theta(x, y) subject to logical constraints","deepDiveMarkdown":"Neuro-symbolic design usually trades raw end-to-end simplicity for better structure and controllability."},
	demo: defineDemo('neuro-symbolic-systems', () => import('$presentation/demos/neuro-symbolic-systems.svelte'), "See how stronger rule weight narrows the model’s hypothesis space."),
	references: [{"label":"Neurosymbolic AI Survey","url":"https://arxiv.org/abs/2305.00813","note":"Survey of the area"},{"label":"Logical Neural Networks","url":"https://arxiv.org/abs/2006.13155","note":"Representative logic-neural approach"},{"label":"Probabilistic Logic and Neural Nets","url":"https://probml.github.io/pml-book/","note":"Broader probabilistic perspective"}]
});
