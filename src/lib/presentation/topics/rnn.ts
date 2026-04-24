import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'rnn',
	title: "Recurrent Neural Networks",
	family: "Foundations and sequence models",
	talkPriority: 'core',
	oneLiner: "RNNs reuse one transition function across time so earlier inputs influence later states.",
	intuition: "A recurrent hidden state acts like a rolling summary of everything seen so far, but that summary gets harder to preserve as the sequence grows because gradients must survive many repeated transitions.",
	architectureBullets: ["The same weights are applied at every time step.","Hidden state carries context from one step to the next.","Training unfolds the recurrence through time for backpropagation."],
	strengths: ["Natural for ordered data","Compact parameter sharing over time","Good mental model for sequential state"],
	weaknesses: ["Vanishing or exploding gradients","Long-range dependencies are hard","Sequential computation limits parallelism"],
	useCases: ["Time-series forecasting","Simple sequence labeling","Autoregressive toy tasks"],
	math: {"intuition":"Each new hidden state mixes current input with the previous state.","formula":"h_t = tanh(W_x x_t + W_h h_(t-1) + b)","deepDiveMarkdown":"When the same transition is unrolled across many steps, gradients are repeatedly multiplied, which is why plain RNNs often lose long-range context."},
	demo: defineDemo('rnn', () => import('$presentation/demos/rnn.svelte'), "Watch hidden-state retention change as sequences get longer."),
	references: [{"label":"Finding Structure in Time","url":"https://crl.ucsd.edu/~elman/Papers/fsit.pdf","note":"Elman recurrent networks"},{"label":"Learning Long-Term Dependencies with Gradient Descent is Difficult","url":"https://www.researchgate.net/publication/5583935_Learning_long-term_dependencies_with_gradient_descent_is_difficult","note":"Vanishing-gradient analysis"},{"label":"Dive into Deep Learning","url":"https://d2l.ai/","note":"Practical open textbook"}]
});
