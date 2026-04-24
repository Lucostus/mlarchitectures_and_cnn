import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'gnn',
	title: "Graph Neural Networks",
	family: "Graph and advanced neural systems",
	talkPriority: 'core',
	oneLiner: "GNNs update node representations by repeatedly aggregating information from graph neighborhoods.",
	intuition: "Each node learns by listening to nearby nodes and edges instead of fixed Euclidean neighbors.",
	architectureBullets: ["Message passing sends learned signals across graph edges.","Aggregation mixes neighbor information into each node state.","Stacking layers expands the receptive field to multi-hop neighborhoods."],
	strengths: ["Native relational inductive bias","Good on molecules and networks","Flexible node, edge, and graph-level outputs"],
	weaknesses: ["Over-smoothing with too many layers","Graph batching can be awkward","Performance depends on graph quality"],
	useCases: ["Molecular property prediction","Recommender systems","Fraud or social network analysis"],
	math: {"intuition":"Node updates combine a self-term with an aggregate from neighbors.","formula":"h_v^(l+1) = phi(h_v^l, AGG_{u in N(v)} psi(h_v^l, h_u^l, e_uv))","deepDiveMarkdown":"The aggregation operator is the core inductive bias; it defines how local structure becomes representation."},
	demo: defineDemo('gnn', () => import('$presentation/demos/gnn.svelte'), "Change hop count and message strength to see local versus global graph mixing."),
	references: [{"label":"A Comprehensive Survey on Graph Neural Networks","url":"https://arxiv.org/abs/1901.00596","note":"Broad survey"},{"label":"Semi-Supervised Classification with GCNs","url":"https://arxiv.org/abs/1609.02907","note":"Canonical graph convolution paper"},{"label":"PyG Introduction","url":"https://pytorch-geometric.readthedocs.io/en/latest/","note":"Practical library docs"}]
});
