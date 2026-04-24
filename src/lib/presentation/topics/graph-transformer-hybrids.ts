import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'graph-transformer-hybrids',
	title: "Graph + Transformer Hybrids",
	family: "Graph and advanced neural systems",
	talkPriority: 'support',
	oneLiner: "Hybrid models mix graph-local message passing with transformer-style global attention.",
	intuition: "The graph says who is connected locally while attention lets important distant nodes still communicate.",
	architectureBullets: ["Graph edges encode structure-aware neighborhood bias.","Attention layers provide long-range interaction beyond explicit edges.","Positional or structural encodings preserve graph identity."],
	strengths: ["Captures local and global relations","Useful on complex relational data","Flexible expressive hybrid design"],
	weaknesses: ["Higher implementation complexity","Heavier compute than pure GNNs","Design choices are highly problem-dependent"],
	useCases: ["Molecular modeling","Knowledge graphs","Document or scene graphs"],
	math: {"intuition":"Attention augments graph aggregation rather than replacing it outright.","formula":"h^(l+1) = GNN(h^l, G) + Attn(h^l, structural encodings)","deepDiveMarkdown":"These hybrids aim to keep graph inductive bias while escaping pure local message-passing limits."},
	demo: defineDemo('graph-transformer-hybrids', () => import('$presentation/demos/graph-transformer-hybrids.svelte'), "Compare local graph hops against broader attention reach."),
	references: [{"label":"Graph Transformer Networks","url":"https://arxiv.org/abs/1911.06455","note":"Representative hybrid paper"},{"label":"GraphGPS","url":"https://arxiv.org/abs/2205.12454","note":"Modern local-global graph recipe"},{"label":"Graph Neural Networks in PyTorch","url":"https://pytorch-geometric.readthedocs.io/en/latest/","note":"Tooling context"}]
});
