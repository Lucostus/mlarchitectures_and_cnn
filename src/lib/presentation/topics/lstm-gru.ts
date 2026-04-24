import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'lstm-gru',
	title: "LSTM / GRU",
	family: "Foundations and sequence models",
	talkPriority: 'core',
	oneLiner: "Advanced RNNs use gates to control what information is written, kept, and exposed.",
	intuition: "Gates give the model a learned memory-management policy instead of always overwriting state, and GRUs simplify that policy by merging the explicit cell state into a leaner recurrent update.",
	architectureBullets: ["LSTMs separate a persistent cell state from the exposed hidden state.","Forget, input, and output gates regulate what is stored, updated, and revealed.","GRUs replace that split with update and reset gates, which keeps the mechanism simpler while preserving much of the memory benefit."],
	strengths: ["Better long-range memory than plain RNNs","Still relatively compact","Useful on medium-length sequential tasks"],
	weaknesses: ["Still sequential to train","Harder to scale than transformers","Memory is compressed into a fixed-size state"],
	useCases: ["Speech and sensor streams","Medium-length forecasting","Resource-limited sequence models"],
	math: {"intuition":"Sigmoid gates act like soft valves on memory contents.","formula":"c_t = f_t ⊙ c_(t-1) + i_t ⊙ c~_t","deepDiveMarkdown":"The additive cell update is what makes LSTMs more stable for long temporal credit assignment."},
	demo: defineDemo('lstm-gru', () => import('$presentation/demos/lstm-gru.svelte'), "Explore how gate openness changes what the recurrent memory keeps or discards."),
	references: [{"label":"Long Short-Term Memory","url":"https://www.bioinf.jku.at/publications/older/2604.pdf","note":"Original LSTM paper and gating motivation"},{"label":"Empirical Evaluation of Gated Recurrent Neural Networks","url":"https://arxiv.org/abs/1412.3555","note":"Useful LSTM versus GRU comparison"},{"label":"Learning Phrase Representations using RNN Encoder-Decoder","url":"https://arxiv.org/abs/1406.1078","note":"Original GRU-style gated update formulation"}]
});
