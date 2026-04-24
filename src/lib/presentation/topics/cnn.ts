import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'cnn',
	title: "Convolutional Neural Networks",
	family: "Foundations and sequence models",
	talkPriority: 'core',
	oneLiner: "CNNs reuse local filters across space so nearby pixels can share detectors.",
	intuition: "Instead of fully connecting every pixel to every neuron, a CNN learns small reusable pattern extractors that gradually turn local edges into larger shapes and object parts.",
	architectureBullets: ["Convolutions slide a kernel over the input to produce feature maps with far fewer parameters than dense layers.","Kernel size and stride determine the receptive field and how much detail survives each layer.","Stacked layers move from edges to textures to object parts, which is why CNNs are strong on images."],
	strengths: ["Efficient parameter sharing","Strong image inductive bias","Excellent for local spatial patterns"],
	weaknesses: ["Less natural for long-range global context","Architecture design still matters","Translation invariance can hide exact spatial detail"],
	useCases: ["Image classification","Segmentation backbones","Audio spectrogram processing"],
	math: {"intuition":"A kernel performs the same local dot product at many positions.","formula":"(K * X)[i,j] = sum_m sum_n K[m,n] X[i+m,j+n]","deepDiveMarkdown":"Convolution lowers parameter count relative to dense connections while encoding locality and shift reuse."},
	demo: defineDemo('cnn', () => import('$presentation/demos/cnn.svelte'), "Adjust kernel size and stride to see how local image structure is preserved or discarded."),
	references: [{"label":"Gradient-Based Learning Applied to Document Recognition","url":"https://ieeexplore.ieee.org/document/726791","note":"Classic CNN reference for convolution, pooling, and parameter sharing"},{"label":"ImageNet Classification with Deep CNNs","url":"https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks","note":"Modern deep CNN scaling example"},{"label":"CS231n Convolutional Nets","url":"https://cs231n.github.io/convolutional-networks/","note":"Supports the receptive-field and feature-hierarchy intuition"}]
});
