import type { Component } from 'svelte';

export type TopicSlug =
	| 'mlp'
	| 'cnn'
	| 'rnn'
	| 'lstm-gru'
	| 'transformers'
	| 'autoencoders'
	| 'vae'
	| 'gan'
	| 'diffusion'
	| 'gnn'
	| 'graph-transformer-hybrids'
	| 'neuro-symbolic-systems'
	| 'pinns'
	| 'meta-learning'
	| 'rl-architectures'
	| 'q-learning'
	| 'sarsa'
	| 'monte-carlo-methods'
	| 'genetic-algorithms'
	| 'genetic-programming'
	| 'neuroevolution'
	| 'decision-trees'
	| 'random-forests'
	| 'gradient-boosting'
	| 'linear-regression'
	| 'logistic-regression'
	| 'ridge-lasso'
	| 'svm'
	| 'naive-bayes'
	| 'bayesian-networks'
	| 'hmms'
	| 'knn'
	| 'k-means'
	| 'hierarchical-clustering'
	| 'dbscan'
	| 'pca'
	| 'tsne'
	| 'umap';

export type DemoTier = 'visual' | 'sim' | 'mini-train';
export type SlideKind =
	| 'cover'
	| 'agenda'
	| 'overview'
	| 'chapter'
	| 'topic'
	| 'comparison'
	| 'closing'
	| 'references';

export type ChapterId =
	| 'foundations'
	| 'representation'
	| 'advanced-neural'
	| 'rl-evolution'
	| 'classical-supervised'
	| 'unsupervised';

export interface ReferenceLink {
	label: string;
	url: string;
	note?: string;
}

export interface MathCard {
	intuition: string;
	formula?: string;
	deepDiveMarkdown?: string;
}

export interface DemoDefinition {
	tier: DemoTier;
	component: () => Promise<{ default: Component }>;
	learningGoal: string;
	controls: string[];
}

export interface TopicDefinition {
	slug: TopicSlug;
	title: string;
	family: string;
	talkPriority: 'core' | 'support';
	oneLiner: string;
	intuition: string;
	architectureBullets: string[];
	strengths: string[];
	weaknesses: string[];
	useCases: string[];
	math: MathCard;
	demo: DemoDefinition;
	references: ReferenceLink[];
}

export interface SlideDefinition {
	id: string;
	kind: SlideKind;
	title: string;
	topicSlug?: TopicSlug;
	chapterId?: ChapterId;
	notes?: string;
}

export interface ChapterDefinition {
	id: ChapterId;
	title: string;
	kicker: string;
	summary: string;
	accent: string;
	topics: TopicSlug[];
}

export interface FamilyOverview {
	title: string;
	bestFor: string;
	pros: string[];
	cons: string[];
	dataFits: string[];
}
