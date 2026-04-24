import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'transformers',
	title: "Transformers",
	family: "Foundations and sequence models",
	talkPriority: 'core',
	oneLiner: "Transformers use self-attention to let tokens communicate directly across the sequence.",
	intuition: "Instead of compressing the past into one state, every token can choose which other tokens matter most, while positional information tells the model where each token sits in the sequence.",
	architectureBullets: ["Queries, keys, and values define how tokens attend to one another.","Positional encodings preserve order because attention alone is permutation-invariant.","Encoder stacks contextualize all tokens together, while decoder stacks additionally mask future tokens for generation."],
	strengths: ["Scales well with data and compute","Handles long-range dependencies","General-purpose backbone across many modalities"],
	weaknesses: ["High compute and memory cost","Needs substantial data to shine","Interpretability remains limited"],
	useCases: ["LLMs","Vision transformers","Multimodal foundation models"],
	math: {"intuition":"Attention weights score compatibility between token queries and keys.","formula":"Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) V","deepDiveMarkdown":"Parallel token interactions are a major reason transformers displaced recurrent models at scale."},
	demo: defineDemo('transformers', () => import('$presentation/demos/transformers.svelte'), "See how sharper or broader attention redistributes relevance across tokens."),
	references: [{"label":"Attention Is All You Need","url":"https://arxiv.org/abs/1706.03762","note":"Primary source for self-attention, positional encoding, and encoder-decoder structure"},{"label":"The Illustrated Transformer","url":"https://jalammar.github.io/illustrated-transformer/","note":"Supports the high-level mental model for token interactions"},{"label":"Annotated Transformer","url":"https://nlp.seas.harvard.edu/2018/04/03/attention.html","note":"Supports implementation-level details behind the slide claims"}]
});
