import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'pinns',
	title: "Physics-Informed Neural Networks",
	family: "Graph and advanced neural systems",
	talkPriority: 'support',
	oneLiner: "PINNs add differential-equation residuals and boundary constraints directly into the loss.",
	intuition: "The model is not just fitted to data; it is also penalized when it violates known physical laws.",
	architectureBullets: ["Inputs are coordinates or conditions in the physical domain.","Autodiff computes derivatives needed for PDE residuals.","Boundary and initial conditions are trained jointly with data fit."],
	strengths: ["Encodes strong scientific priors","Can work with limited labeled data","Useful where simulation laws are known"],
	weaknesses: ["Optimization can be difficult","Scaling to complex PDEs is hard","Loss balancing is delicate"],
	useCases: ["Scientific computing","Inverse problems","Data-assimilation setups"],
	math: {"intuition":"Loss combines data mismatch with a physics residual term.","formula":"L = L_data + lambda L_PDE + mu L_boundary","deepDiveMarkdown":"PINNs are appealing because they let one model satisfy observations and governing equations at once."},
	demo: defineDemo('pinns', () => import('$presentation/demos/pinns.svelte'), "Adjust the physics weight and see how it changes the fitted solution curve."),
	references: [{"label":"Physics-Informed Neural Networks","url":"https://arxiv.org/abs/1711.10561","note":"Original PINN paper"},{"label":"PINNs repository","url":"https://github.com/maziarraissi/PINNs","note":"Reference implementation"},{"label":"Scientific Machine Learning overview","url":"https://book.sciml.ai/","note":"Broader context"}]
});
