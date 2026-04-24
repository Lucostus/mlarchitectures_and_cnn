import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const topicDir = join(process.cwd(), 'src/lib/presentation/topics');
const demoDir = join(process.cwd(), 'src/lib/presentation/demos');

mkdirSync(topicDir, { recursive: true });
mkdirSync(demoDir, { recursive: true });

const ref = (label, url, note) => ({ label, url, note });

const common = {
	deepLearningBook: ref('Deep Learning Book', 'https://www.deeplearningbook.org/', 'General deep learning reference'),
	d2l: ref('Dive into Deep Learning', 'https://d2l.ai/', 'Practical open textbook'),
	sklearn: ref('Scikit-learn User Guide', 'https://scikit-learn.org/stable/user_guide.html', 'Canonical classical ML guide'),
	rlBook: ref(
		'Reinforcement Learning: Sutton and Barto',
		'http://incompleteideas.net/book/the-book-2nd.html',
		'Canonical RL reference'
	)
};

const topics = [
	{
		slug: 'mlp',
		title: 'Feedforward Neural Networks / MLPs',
		family: 'Foundations and sequence models',
		talkPriority: 'core',
		oneLiner: 'Dense layers compose affine transforms and nonlinearities to model fixed-size input-output mappings.',
		intuition: 'An MLP repeatedly remixes features until the representation is linearly useful for the task.',
		architectureBullets: [
			'Each layer applies a learned matrix, bias, and nonlinearity.',
			'Depth lets the network build hierarchical internal features.',
			'Backpropagation moves gradients from loss to every weight.'
		],
		strengths: ['Flexible universal approximator', 'Works well on engineered tabular features', 'Good baseline for dense prediction problems'],
		weaknesses: ['Ignores explicit structure in space or time', 'Needs scaling and regularization', 'Can overfit small datasets quickly'],
		useCases: ['Tabular classification', 'Regression on structured features', 'Small autoencoder or policy networks'],
		math: {
			intuition: 'Layered affine maps plus nonlinear activation create curved decision boundaries.',
			formula: 'h_(l+1) = sigma(W_l h_l + b_l)',
			deepDiveMarkdown: 'Training minimizes loss over all weights using gradient descent; depth expands expressivity but can complicate optimization.'
		},
		learningGoal: 'See how added hidden layers and stronger nonlinearities reshape a toy decision surface.',
		references: [
			common.deepLearningBook,
			common.d2l,
			ref('CS231n Neural Networks', 'https://cs231n.github.io/neural-networks-1/', 'Readable dense-network refresher')
		]
	},
	{
		slug: 'cnn',
		title: 'Convolutional Neural Networks',
		family: 'Foundations and sequence models',
		talkPriority: 'core',
		oneLiner: 'CNNs reuse local filters across space so nearby pixels can share detectors.',
		intuition: 'Instead of fully connecting every pixel to every neuron, a CNN learns small reusable pattern extractors.',
		architectureBullets: [
			'Convolutions slide a kernel over the input to produce feature maps.',
			'Pooling or strides reduce resolution while expanding receptive field.',
			'Stacked layers move from edges to textures to object parts.'
		],
		strengths: ['Efficient parameter sharing', 'Strong image inductive bias', 'Excellent for local spatial patterns'],
		weaknesses: ['Less natural for long-range global context', 'Architecture design still matters', 'Translation invariance can hide exact spatial detail'],
		useCases: ['Image classification', 'Segmentation backbones', 'Audio spectrogram processing'],
		math: {
			intuition: 'A kernel performs the same local dot product at many positions.',
			formula: '(K * X)[i,j] = sum_m sum_n K[m,n] X[i+m,j+n]',
			deepDiveMarkdown: 'Convolution lowers parameter count relative to dense connections while encoding locality and shift reuse.'
		},
		learningGoal: 'Adjust kernel size and stride to see how local image structure is preserved or discarded.',
		references: [
			ref('LeNet', 'http://yann.lecun.com/exdb/lenet/', 'Classic CNN architecture'),
			common.deepLearningBook,
			ref('CS231n Convolutional Nets', 'https://cs231n.github.io/convolutional-networks/', 'Practical visual intuition')
		]
	},
	{
		slug: 'rnn',
		title: 'Recurrent Neural Networks',
		family: 'Foundations and sequence models',
		talkPriority: 'core',
		oneLiner: 'RNNs reuse one transition function across time so earlier inputs influence later states.',
		intuition: 'A recurrent hidden state acts like a rolling summary of everything seen so far.',
		architectureBullets: [
			'The same weights are applied at every time step.',
			'Hidden state carries context from one step to the next.',
			'Training unfolds the recurrence through time for backpropagation.'
		],
		strengths: ['Natural for ordered data', 'Compact parameter sharing over time', 'Good mental model for sequential state'],
		weaknesses: ['Vanishing or exploding gradients', 'Long-range dependencies are hard', 'Sequential computation limits parallelism'],
		useCases: ['Time-series forecasting', 'Simple sequence labeling', 'Autoregressive toy tasks'],
		math: {
			intuition: 'Each new hidden state mixes current input with the previous state.',
			formula: 'h_t = tanh(W_x x_t + W_h h_(t-1) + b)',
			deepDiveMarkdown: 'Because gradients repeatedly multiply through time, plain RNNs tend to forget distant context.'
		},
		learningGoal: 'Watch hidden-state retention change as sequences get longer.',
		references: [
			common.deepLearningBook,
			common.d2l,
			ref('RNN Intro', 'https://karpathy.github.io/2015/05/21/rnn-effectiveness/', 'Classic sequence intuition')
		]
	},
	{
		slug: 'lstm-gru',
		title: 'LSTM / GRU',
		family: 'Foundations and sequence models',
		talkPriority: 'core',
		oneLiner: 'Advanced RNNs use gates to control what information is written, kept, and exposed.',
		intuition: 'Gates give the model a learned memory-management policy instead of always overwriting state.',
		architectureBullets: [
			'LSTMs separate cell state from exposed hidden state.',
			'Forget, input, and output gates regulate information flow.',
			'GRUs simplify the design with fewer gates and merged memory.'
		],
		strengths: ['Better long-range memory than plain RNNs', 'Still relatively compact', 'Useful on medium-length sequential tasks'],
		weaknesses: ['Still sequential to train', 'Harder to scale than transformers', 'Memory is compressed into a fixed-size state'],
		useCases: ['Speech and sensor streams', 'Medium-length forecasting', 'Resource-limited sequence models'],
		math: {
			intuition: 'Sigmoid gates act like soft valves on memory contents.',
			formula: 'c_t = f_t ⊙ c_(t-1) + i_t ⊙ c~_t',
			deepDiveMarkdown: 'The additive cell update is what makes LSTMs more stable for long temporal credit assignment.'
		},
		learningGoal: 'Explore how gate openness changes what the recurrent memory keeps or discards.',
		references: [
			ref('LSTM paper', 'https://www.bioinf.jku.at/publications/older/2604.pdf', 'Hochreiter and Schmidhuber'),
			common.deepLearningBook,
			common.d2l
		]
	},
	{
		slug: 'transformers',
		title: 'Transformers',
		family: 'Foundations and sequence models',
		talkPriority: 'core',
		oneLiner: 'Transformers use self-attention to let tokens communicate directly across the sequence.',
		intuition: 'Instead of compressing the past into one state, every token can choose which other tokens matter most.',
		architectureBullets: [
			'Queries, keys, and values define how tokens attend to one another.',
			'Multi-head attention captures multiple relation patterns simultaneously.',
			'Feed-forward blocks and residuals refine token representations.'
		],
		strengths: ['Scales well with data and compute', 'Handles long-range dependencies', 'General-purpose backbone across many modalities'],
		weaknesses: ['High compute and memory cost', 'Needs substantial data to shine', 'Interpretability remains limited'],
		useCases: ['LLMs', 'Vision transformers', 'Multimodal foundation models'],
		math: {
			intuition: 'Attention weights score compatibility between token queries and keys.',
			formula: 'Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) V',
			deepDiveMarkdown: 'Parallel token interactions are a major reason transformers displaced recurrent models at scale.'
		},
		learningGoal: 'See how sharper or broader attention redistributes relevance across tokens.',
		references: [
			ref('Attention Is All You Need', 'https://arxiv.org/abs/1706.03762', 'Original transformer paper'),
			common.d2l,
			ref('Annotated Transformer', 'https://nlp.seas.harvard.edu/2018/04/03/attention.html', 'Readable implementation walkthrough')
		]
	},
	{
		slug: 'autoencoders',
		title: 'Autoencoders',
		family: 'Representation and generation',
		talkPriority: 'core',
		oneLiner: 'Autoencoders learn compressed latent codes by reconstructing their own inputs.',
		intuition: 'The model is forced to keep only the most useful information if the middle bottleneck is smaller than the input.',
		architectureBullets: [
			'An encoder maps input to a latent representation.',
			'A decoder reconstructs the input from that latent code.',
			'The bottleneck shape determines what information survives.'
		],
		strengths: ['Useful latent features', 'Good for denoising or compression', 'Simple self-supervised objective'],
		weaknesses: ['Can learn trivial identity if unconstrained', 'Latent space may not be smooth', 'Reconstruction quality may dominate semantic utility'],
		useCases: ['Dimensionality reduction', 'Anomaly detection', 'Pretraining'],
		math: {
			intuition: 'Training minimizes reconstruction error between input and decoded output.',
			formula: 'L = ||x - decoder(encoder(x))||^2',
			deepDiveMarkdown: 'Useful autoencoders usually need a bottleneck or additional structure to avoid simple copying.'
		},
		learningGoal: 'Change latent size and fidelity to see the compression tradeoff directly.',
		references: [
			common.deepLearningBook,
			common.d2l,
			ref('Reducing the Dimensionality of Data with Neural Networks', 'https://pubmed.ncbi.nlm.nih.gov/16873662/', 'Classic deep autoencoder result')
		]
	},
	{
		slug: 'vae',
		title: 'Variational Autoencoders',
		family: 'Representation and generation',
		talkPriority: 'core',
		oneLiner: 'VAEs regularize latent space into a probability distribution so sampling becomes meaningful.',
		intuition: 'A VAE trades exact reconstructions for a smooth latent geometry you can sample from.',
		architectureBullets: [
			'Encoder predicts a latent mean and variance rather than one point.',
			'Reparameterization keeps sampling differentiable during training.',
			'Decoder learns to reconstruct from sampled latent vectors.'
		],
		strengths: ['Smooth latent interpolation', 'Principled probabilistic objective', 'Useful for representation learning'],
		weaknesses: ['Reconstructions can look blurry', 'KL term can overpower reconstruction', 'Samples may be less sharp than GANs'],
		useCases: ['Latent exploration', 'Data generation', 'Semi-supervised learning'],
		math: {
			intuition: 'The ELBO balances reconstruction quality against latent regularity.',
			formula: 'ELBO = E_q(z|x)[log p(x|z)] - KL(q(z|x) || p(z))',
			deepDiveMarkdown: 'KL pressure keeps latent codes close to a prior so nearby regions decode sensibly.'
		},
		learningGoal: 'Compare smooth latent sampling against pure reconstruction pressure.',
		references: [
			ref('Auto-Encoding Variational Bayes', 'https://arxiv.org/abs/1312.6114', 'Original VAE paper'),
			common.deepLearningBook,
			common.d2l
		]
	},
	{
		slug: 'gan',
		title: 'Generative Adversarial Networks',
		family: 'Representation and generation',
		talkPriority: 'core',
		oneLiner: 'GANs train a generator and discriminator in opposition until samples look realistic.',
		intuition: 'Generation improves because another network is constantly trying to expose fake outputs.',
		architectureBullets: [
			'The generator maps noise to candidate samples.',
			'The discriminator scores real versus generated examples.',
			'Both networks co-evolve through adversarial loss.'
		],
		strengths: ['Sharp high-fidelity samples', 'Strong image synthesis history', 'No explicit likelihood needed'],
		weaknesses: ['Training instability', 'Mode collapse risk', 'Balancing generator and discriminator is difficult'],
		useCases: ['Image synthesis', 'Super-resolution', 'Style transfer variants'],
		math: {
			intuition: 'A minimax game pushes generated and real distributions closer together.',
			formula: 'min_G max_D E[log D(x)] + E[log(1 - D(G(z)))]',
			deepDiveMarkdown: 'The adversarial objective is powerful but brittle because each player changes the other player’s target.'
		},
		learningGoal: 'Watch generator and discriminator balance shift and see when instability appears.',
		references: [
			ref('GAN paper', 'https://arxiv.org/abs/1406.2661', 'Original GAN paper'),
			common.deepLearningBook,
			ref('NIPS 2016 Tutorial: GANs', 'https://arxiv.org/abs/1701.00160', 'Good conceptual overview')
		]
	},
	{
		slug: 'diffusion',
		title: 'Diffusion Models',
		family: 'Representation and generation',
		talkPriority: 'core',
		oneLiner: 'Diffusion models learn to reverse incremental noise corruption into coherent samples.',
		intuition: 'Generation becomes a denoising trajectory instead of one giant jump from noise to output.',
		architectureBullets: [
			'A forward process gradually adds noise to data.',
			'A model learns the reverse denoising direction at each step.',
			'Sampling iteratively refines a noisy starting point.'
		],
		strengths: ['High sample quality', 'Stable training relative to GANs', 'Flexible conditioning'],
		weaknesses: ['Slow sampling', 'Large compute demand', 'Many denoising steps can be expensive'],
		useCases: ['Image and audio generation', 'Inpainting', 'Text-to-image systems'],
		math: {
			intuition: 'The model predicts noise or score information to undo corruption.',
			formula: 'x_t = sqrt(alpha_t) x_(t-1) + sqrt(1-alpha_t) epsilon',
			deepDiveMarkdown: 'The reverse process turns generation into a sequence of easier denoising subproblems.'
		},
		learningGoal: 'See how more noise steps and stronger denoising change generation quality.',
		references: [
			ref('Denoising Diffusion Probabilistic Models', 'https://arxiv.org/abs/2006.11239', 'DDPM paper'),
			ref('Score-Based Generative Modeling', 'https://arxiv.org/abs/1907.05600', 'Score matching connection'),
			common.d2l
		]
	},
	{
		slug: 'gnn',
		title: 'Graph Neural Networks',
		family: 'Graph and advanced neural systems',
		talkPriority: 'core',
		oneLiner: 'GNNs update node representations by repeatedly aggregating information from graph neighborhoods.',
		intuition: 'Each node learns by listening to nearby nodes and edges instead of fixed Euclidean neighbors.',
		architectureBullets: [
			'Message passing sends learned signals across graph edges.',
			'Aggregation mixes neighbor information into each node state.',
			'Stacking layers expands the receptive field to multi-hop neighborhoods.'
		],
		strengths: ['Native relational inductive bias', 'Good on molecules and networks', 'Flexible node, edge, and graph-level outputs'],
		weaknesses: ['Over-smoothing with too many layers', 'Graph batching can be awkward', 'Performance depends on graph quality'],
		useCases: ['Molecular property prediction', 'Recommender systems', 'Fraud or social network analysis'],
		math: {
			intuition: 'Node updates combine a self-term with an aggregate from neighbors.',
			formula: 'h_v^(l+1) = phi(h_v^l, AGG_{u in N(v)} psi(h_v^l, h_u^l, e_uv))',
			deepDiveMarkdown: 'The aggregation operator is the core inductive bias; it defines how local structure becomes representation.'
		},
		learningGoal: 'Change hop count and message strength to see local versus global graph mixing.',
		references: [
			ref('A Comprehensive Survey on Graph Neural Networks', 'https://arxiv.org/abs/1901.00596', 'Broad survey'),
			ref('Semi-Supervised Classification with GCNs', 'https://arxiv.org/abs/1609.02907', 'Canonical graph convolution paper'),
			ref('PyG Introduction', 'https://pytorch-geometric.readthedocs.io/en/latest/', 'Practical library docs')
		]
	},
	{
		slug: 'graph-transformer-hybrids',
		title: 'Graph + Transformer Hybrids',
		family: 'Graph and advanced neural systems',
		talkPriority: 'support',
		oneLiner: 'Hybrid models mix graph-local message passing with transformer-style global attention.',
		intuition: 'The graph says who is connected locally while attention lets important distant nodes still communicate.',
		architectureBullets: [
			'Graph edges encode structure-aware neighborhood bias.',
			'Attention layers provide long-range interaction beyond explicit edges.',
			'Positional or structural encodings preserve graph identity.'
		],
		strengths: ['Captures local and global relations', 'Useful on complex relational data', 'Flexible expressive hybrid design'],
		weaknesses: ['Higher implementation complexity', 'Heavier compute than pure GNNs', 'Design choices are highly problem-dependent'],
		useCases: ['Molecular modeling', 'Knowledge graphs', 'Document or scene graphs'],
		math: {
			intuition: 'Attention augments graph aggregation rather than replacing it outright.',
			formula: 'h^(l+1) = GNN(h^l, G) + Attn(h^l, structural encodings)',
			deepDiveMarkdown: 'These hybrids aim to keep graph inductive bias while escaping pure local message-passing limits.'
		},
		learningGoal: 'Compare local graph hops against broader attention reach.',
		references: [
			ref('Graph Transformer Networks', 'https://arxiv.org/abs/1911.06455', 'Representative hybrid paper'),
			ref('GraphGPS', 'https://arxiv.org/abs/2205.12454', 'Modern local-global graph recipe'),
			ref('Graph Neural Networks in PyTorch', 'https://pytorch-geometric.readthedocs.io/en/latest/', 'Tooling context')
		]
	},
	{
		slug: 'neuro-symbolic-systems',
		title: 'Neuro-symbolic Systems',
		family: 'Graph and advanced neural systems',
		talkPriority: 'support',
		oneLiner: 'Neuro-symbolic systems combine neural perception with rules, logic, or discrete reasoning.',
		intuition: 'Neural nets are good at perception; symbolic systems are good at explicit structure and constraints.',
		architectureBullets: [
			'Neural modules turn raw data into candidate facts or entities.',
			'Rules or logic constrain what conclusions are valid.',
			'The full system can reason more explicitly than a pure black box.'
		],
		strengths: ['Injects domain knowledge', 'Can improve explainability', 'Useful when hard rules matter'],
		weaknesses: ['Integration is hard', 'Symbolic representations can be brittle', 'Tooling is less mature than standard deep learning'],
		useCases: ['Knowledge-intensive QA', 'Planning with perception', 'Scientific and enterprise rule systems'],
		math: {
			intuition: 'The core idea is structured constraints on top of learned scores.',
			formula: 'argmax_y f_theta(x, y) subject to logical constraints',
			deepDiveMarkdown: 'Neuro-symbolic design usually trades raw end-to-end simplicity for better structure and controllability.'
		},
		learningGoal: 'See how stronger rule weight narrows the model’s hypothesis space.',
		references: [
			ref('Neurosymbolic AI Survey', 'https://arxiv.org/abs/2305.00813', 'Survey of the area'),
			ref('Logical Neural Networks', 'https://arxiv.org/abs/2006.13155', 'Representative logic-neural approach'),
			ref('Probabilistic Logic and Neural Nets', 'https://probml.github.io/pml-book/', 'Broader probabilistic perspective')
		]
	},
	{
		slug: 'pinns',
		title: 'Physics-Informed Neural Networks',
		family: 'Graph and advanced neural systems',
		talkPriority: 'support',
		oneLiner: 'PINNs add differential-equation residuals and boundary constraints directly into the loss.',
		intuition: 'The model is not just fitted to data; it is also penalized when it violates known physical laws.',
		architectureBullets: [
			'Inputs are coordinates or conditions in the physical domain.',
			'Autodiff computes derivatives needed for PDE residuals.',
			'Boundary and initial conditions are trained jointly with data fit.'
		],
		strengths: ['Encodes strong scientific priors', 'Can work with limited labeled data', 'Useful where simulation laws are known'],
		weaknesses: ['Optimization can be difficult', 'Scaling to complex PDEs is hard', 'Loss balancing is delicate'],
		useCases: ['Scientific computing', 'Inverse problems', 'Data-assimilation setups'],
		math: {
			intuition: 'Loss combines data mismatch with a physics residual term.',
			formula: 'L = L_data + lambda L_PDE + mu L_boundary',
			deepDiveMarkdown: 'PINNs are appealing because they let one model satisfy observations and governing equations at once.'
		},
		learningGoal: 'Adjust the physics weight and see how it changes the fitted solution curve.',
		references: [
			ref('Physics-Informed Neural Networks', 'https://arxiv.org/abs/1711.10561', 'Original PINN paper'),
			ref('PINNs repository', 'https://github.com/maziarraissi/PINNs', 'Reference implementation'),
			ref('Scientific Machine Learning overview', 'https://book.sciml.ai/', 'Broader context')
		]
	},
	{
		slug: 'meta-learning',
		title: 'Meta-learning Models',
		family: 'Graph and advanced neural systems',
		talkPriority: 'support',
		oneLiner: 'Meta-learning trains models to adapt quickly to new tasks rather than just solve one task well.',
		intuition: 'The outer loop learns an initialization or update rule that makes inner-loop adaptation cheap.',
		architectureBullets: [
			'Training samples many related tasks rather than one static dataset.',
			'Meta-parameters optimize future fast adaptation.',
			'Few-shot performance is the typical target.'
		],
		strengths: ['Strong few-shot adaptation', 'Reuses experience across tasks', 'Useful when tasks repeat but labels are scarce'],
		weaknesses: ['Task distribution matters heavily', 'Bi-level optimization can be expensive', 'Generalization outside the training task family can fail'],
		useCases: ['Few-shot classification', 'Adaptive control', 'Fast personalization'],
		math: {
			intuition: 'The outer objective evaluates performance after one or a few inner updates.',
			formula: 'theta* = argmin_theta sum_T L_T(U(theta, T))',
			deepDiveMarkdown: 'Meta-learning is about optimizing for learnability, not just task accuracy at the end of training.'
		},
		learningGoal: 'Compare broader task diversity with faster inner-loop adaptation.',
		references: [
			ref('MAML', 'https://arxiv.org/abs/1703.03400', 'Canonical gradient-based meta-learning paper'),
			ref('Meta-Learning survey', 'https://arxiv.org/abs/1810.03548', 'Broad survey'),
			common.d2l
		]
	},
	{
		slug: 'rl-architectures',
		title: 'Reinforcement Learning Architectures',
		family: 'Reinforcement learning and evolutionary methods',
		talkPriority: 'core',
		oneLiner: 'RL architectures optimize sequential decisions from reward feedback rather than direct labels.',
		intuition: 'The agent must learn what to do by interacting, observing consequences, and trading exploration against exploitation.',
		architectureBullets: [
			'State, action, reward, and policy define the control loop.',
			'Value-based and policy-based variants optimize different internal targets.',
			'Credit assignment makes delayed rewards difficult.'
		],
		strengths: ['Optimizes behavior directly', 'Works without supervised labels', 'Fits control and planning tasks'],
		weaknesses: ['Sample inefficient', 'Reward design is fragile', 'Instability is common in realistic environments'],
		useCases: ['Games', 'Robotics', 'Adaptive decision systems'],
		math: {
			intuition: 'The goal is expected cumulative discounted reward.',
			formula: 'G_t = sum_k gamma^k r_(t+k+1)',
			deepDiveMarkdown: 'Most RL methods differ in how they estimate returns and how directly they optimize policies.'
		},
		learningGoal: 'See how exploration and reward emphasis change the policy landscape in a toy gridworld.',
		references: [
			common.rlBook,
			ref('OpenAI Spinning Up', 'https://spinningup.openai.com/en/latest/', 'Practical RL orientation'),
			ref('Deep RL course notes', 'https://huggingface.co/learn/deep-rl-course/unit0/introduction', 'Accessible modern refresher')
		]
	},
	{
		slug: 'q-learning',
		title: 'Q-Learning',
		family: 'Reinforcement learning and evolutionary methods',
		talkPriority: 'core',
		oneLiner: 'Q-Learning estimates state-action value and updates toward the greedy next action target.',
		intuition: 'Even while behaving exploratorily, the update asks what the best available future action would be.',
		architectureBullets: [
			'Learns Q(s, a) directly from transitions.',
			'Uses the max over next-state actions in the target.',
			'Off-policy updates decouple behavior from target policy.'
		],
		strengths: ['Conceptually simple', 'Strong value-learning baseline', 'Extends naturally to DQN-style deep RL'],
		weaknesses: ['Can be overoptimistic', 'Needs discrete or approximated actions', 'Exploration still remains hard'],
		useCases: ['Tabular RL', 'Discrete control tasks', 'Teaching core RL ideas'],
		math: {
			intuition: 'One-step bootstrap uses the best next action estimate.',
			formula: 'Q(s,a) <- Q(s,a) + alpha[r + gamma max_a\' Q(s\',a\') - Q(s,a)]',
			deepDiveMarkdown: 'The off-policy max target is why Q-learning can converge to an optimal policy under the right assumptions.'
		},
		learningGoal: 'Watch how exploration and learning rate affect a tabular value surface.',
		references: [
			common.rlBook,
			ref('Q-learning', 'https://www.gatsby.ucl.ac.uk/~dayan/papers/cjch.pdf', 'Watkins and Dayan paper'),
			ref('OpenAI Spinning Up: RL Intro', 'https://spinningup.openai.com/en/latest/spinningup/rl_intro.html', 'Modern explanation')
		]
	},
	{
		slug: 'sarsa',
		title: 'SARSA',
		family: 'Reinforcement learning and evolutionary methods',
		talkPriority: 'core',
		oneLiner: 'SARSA updates values using the action actually selected by the current behavior policy.',
		intuition: 'Because it learns from the policy it is following, SARSA tends to reflect the cost of risky exploration more directly.',
		architectureBullets: [
			'State-action-reward-state-action defines the update tuple.',
			'Targets use the next chosen action instead of a max operator.',
			'On-policy learning ties value estimates to current behavior.'
		],
		strengths: ['More conservative than Q-learning in risky settings', 'Clear on-policy interpretation', 'Good teaching contrast to off-policy updates'],
		weaknesses: ['Performance depends on exploration policy', 'May converge more cautiously', 'Still limited by tabular assumptions unless approximated'],
		useCases: ['Safe exploratory control', 'Introductory RL comparisons', 'Gridworld tasks'],
		math: {
			intuition: 'The target follows what the current policy really does next.',
			formula: 'Q(s,a) <- Q(s,a) + alpha[r + gamma Q(s\',a\') - Q(s,a)]',
			deepDiveMarkdown: 'SARSA captures the value of exploratory behavior itself, which can matter in hazardous environments.'
		},
		learningGoal: 'Compare on-policy updates against greedier value updates in the same gridworld.',
		references: [
			common.rlBook,
			ref('On-Policy TD Control', 'https://www.cs.ualberta.ca/~sutton/book/ebook/node64.html', 'Sutton and Barto reference section'),
			ref('SARSA tutorial notes', 'https://huggingface.co/learn/deep-rl-course/unit1/sarsa', 'Modern pedagogical explanation')
		]
	},
	{
		slug: 'monte-carlo-methods',
		title: 'Monte Carlo Methods',
		family: 'Reinforcement learning and evolutionary methods',
		talkPriority: 'support',
		oneLiner: 'Monte Carlo methods estimate returns from complete sampled episodes rather than bootstrapping one step ahead.',
		intuition: 'Instead of asking what happens next, Monte Carlo methods wait until the episode ends and use the actual return.',
		architectureBullets: [
			'Full-episode returns provide unbiased but high-variance targets.',
			'First-visit and every-visit variants differ in how they average returns.',
			'No model of the environment is required.'
		],
		strengths: ['Simple conceptually', 'No bootstrapping bias', 'Useful baseline for episodic tasks'],
		weaknesses: ['Needs episode termination', 'High variance', 'Slow learning on long-horizon tasks'],
		useCases: ['Episodic games', 'Policy evaluation', 'Introductory RL'],
		math: {
			intuition: 'The return is computed after rolling out the full episode.',
			formula: 'V(s) <- average of sampled returns G_t after visits to s',
			deepDiveMarkdown: 'Monte Carlo sits at the opposite end from bootstrapped TD methods: less bias, more variance.'
		},
		learningGoal: 'See how episode length and sample count affect the stability of return estimates.',
		references: [
			common.rlBook,
			ref('Monte Carlo RL notes', 'https://huggingface.co/learn/deep-rl-course/unit1/monte-carlo', 'Modern explanation'),
			ref('Policy evaluation overview', 'https://www.andrew.cmu.edu/course/10-703/textbook/BartoSutton.pdf', 'Standard RL text excerpt')
		]
	},
	{
		slug: 'genetic-algorithms',
		title: 'Genetic Algorithms',
		family: 'Reinforcement learning and evolutionary methods',
		talkPriority: 'support',
		oneLiner: 'Genetic algorithms search by selection, crossover, and mutation over populations of candidate solutions.',
		intuition: 'Instead of following gradients, a whole population competes and recombines toward better fitness.',
		architectureBullets: [
			'Fitness scores rank candidate solutions.',
			'Selection favors better individuals for reproduction.',
			'Mutation and crossover maintain exploration.'
		],
		strengths: ['Works on non-differentiable problems', 'Naturally parallelizable', 'Flexible objective design'],
		weaknesses: ['Can require many evaluations', 'Noisy convergence behavior', 'Representation design matters heavily'],
		useCases: ['Combinatorial search', 'Hyperparameter search', 'Evolutionary optimization'],
		math: {
			intuition: 'Population search shifts probability mass toward fitter candidates over generations.',
			formula: 'Population_(t+1) = Selection(Crossover(Mutation(Population_t)))',
			deepDiveMarkdown: 'GAs are useful when gradients are unavailable, unreliable, or not meaningful.'
		},
		learningGoal: 'Track how population size and mutation rate change exploration versus convergence.',
		references: [
			ref('Introduction to Genetic Algorithms', 'https://mitpress.mit.edu/9780262532645/an-introduction-to-genetic-algorithms/', 'Classic text by Melanie Mitchell'),
			ref('DEAP documentation', 'https://deap.readthedocs.io/en/master/', 'Practical GA framework'),
			ref('Genetic Algorithms overview', 'https://www.nature.com/articles/35057005', 'Short overview article')
		]
	},
	{
		slug: 'genetic-programming',
		title: 'Genetic Programming',
		family: 'Reinforcement learning and evolutionary methods',
		talkPriority: 'support',
		oneLiner: 'Genetic programming evolves executable programs or expression trees instead of fixed-length genomes.',
		intuition: 'The search does not just tune parameters; it rewrites the computational structure itself.',
		architectureBullets: [
			'Individuals are program trees or symbolic expressions.',
			'Crossover swaps subtrees between programs.',
			'Fitness rewards programs that solve the task well.'
		],
		strengths: ['Searches over symbolic structure', 'Can produce interpretable expressions', 'Useful for symbolic regression'],
		weaknesses: ['Program bloat', 'Search space is very large', 'Evaluation cost can be high'],
		useCases: ['Symbolic regression', 'Rule discovery', 'Program synthesis experiments'],
		math: {
			intuition: 'The genotype is a program structure, not just a vector.',
			formula: 'program_(t+1) = mutate_or_cross(program_t) if fitness improves',
			deepDiveMarkdown: 'Genetic programming is most compelling when the target artifact should itself remain human-readable.'
		},
		learningGoal: 'See how larger program depth and stronger mutation change symbolic search behavior.',
		references: [
			ref('Genetic Programming', 'https://mitpress.mit.edu/9780262611272/genetic-programming/', 'Koza classic'),
			ref('DEAP GP docs', 'https://deap.readthedocs.io/en/master/tutorials/advanced/gp.html', 'Practical GP tooling'),
			ref('Symbolic regression overview', 'https://arxiv.org/abs/2107.14351', 'Modern survey context')
		]
	},
	{
		slug: 'neuroevolution',
		title: 'Neuroevolution',
		family: 'Reinforcement learning and evolutionary methods',
		talkPriority: 'support',
		oneLiner: 'Neuroevolution applies evolutionary search to neural network weights, topologies, or both.',
		intuition: 'Evolution can search neural design spaces without differentiating through the full objective.',
		architectureBullets: [
			'Individuals encode network weights or architectures.',
			'Fitness comes from task performance rather than gradient loss.',
			'Topology evolution can grow networks along with weights.'
		],
		strengths: ['Gradient-free optimization', 'Good for black-box objectives', 'Can search architectures and controllers jointly'],
		weaknesses: ['Evaluation cost can explode', 'Often less sample-efficient than gradient methods', 'Population management adds complexity'],
		useCases: ['Game agents', 'Architecture search', 'Controller design in simulation'],
		math: {
			intuition: 'Selection keeps neural candidates that perform best on the task.',
			formula: 'theta_(t+1) = EvolutionStep(theta_t, fitness(theta_t))',
			deepDiveMarkdown: 'Neuroevolution is attractive when objectives are sparse, deceptive, or not differentiable.'
		},
		learningGoal: 'Compare stable weight search with more aggressive topology drift.',
		references: [
			ref('NEAT', 'https://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf', 'Canonical topology-evolving method'),
			ref('Deep Neuroevolution', 'https://arxiv.org/abs/1712.06567', 'Modern large-scale example'),
			ref('Evolution Strategies as a Scalable Alternative to RL', 'https://arxiv.org/abs/1703.03864', 'Related black-box optimization view')
		]
	},
	{
		slug: 'decision-trees',
		title: 'Decision Trees',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'core',
		oneLiner: 'Decision trees recursively split feature space into regions with purer targets.',
		intuition: 'A tree asks one simple question at a time until the remaining examples look similar enough.',
		architectureBullets: [
			'Each internal node chooses a feature threshold or category split.',
			'Leaves output a class or value estimate.',
			'Greedy impurity reduction builds the tree top-down.'
		],
		strengths: ['Interpretable', 'Handles mixed feature types', 'Little preprocessing required'],
		weaknesses: ['High variance', 'Can overfit deeply', 'Greedy splits are not globally optimal'],
		useCases: ['Interpretable classification', 'Rule extraction', 'Base learners in ensembles'],
		math: {
			intuition: 'Splits maximize impurity reduction such as Gini or entropy decrease.',
			formula: 'Gain = Impurity(parent) - sum_j p_j Impurity(child_j)',
			deepDiveMarkdown: 'Trees are easy to explain but unstable; small data changes can alter the structure a lot.'
		},
		learningGoal: 'See how greater depth and stricter purity create more detailed partitions.',
		references: [
			common.sklearn,
			ref('CART overview', 'https://www.stat.berkeley.edu/~breiman/RandomForests/cc_home.htm', 'Breiman material'),
			ref('Elements of Statistical Learning', 'https://hastie.su.domains/ElemStatLearn/', 'Canonical statistical reference')
		]
	},
	{
		slug: 'random-forests',
		title: 'Random Forests',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'core',
		oneLiner: 'Random forests average many de-correlated trees to reduce variance without losing nonlinear flexibility.',
		intuition: 'One tree is unstable; many randomized trees voting together are much harder to knock off course.',
		architectureBullets: [
			'Bootstrap samples create diverse training subsets.',
			'Random feature subsampling decorrelates trees.',
			'Predictions aggregate through voting or averaging.'
		],
		strengths: ['Strong default tabular baseline', 'Robust to scaling and feature engineering', 'Captures nonlinear interactions'],
		weaknesses: ['Less interpretable than one tree', 'Larger ensembles cost more at inference', 'Can struggle on sparse high-dimensional text'],
		useCases: ['Tabular prediction', 'Feature importance estimates', 'Out-of-the-box baseline modeling'],
		math: {
			intuition: 'Variance drops because many weakly correlated trees average out one another’s noise.',
			formula: 'y_hat = (1/T) sum_t tree_t(x)',
			deepDiveMarkdown: 'Feature randomness is crucial; without it the trees become too similar for the ensemble to help much.'
		},
		learningGoal: 'Compare tree count and feature randomness to see stability emerge through voting.',
		references: [
			common.sklearn,
			ref('Random Forests', 'https://www.stat.berkeley.edu/~breiman/randomforest2001.pdf', 'Breiman original paper'),
			ref('Elements of Statistical Learning', 'https://hastie.su.domains/ElemStatLearn/', 'Ensemble reference')
		]
	},
	{
		slug: 'gradient-boosting',
		title: 'Gradient Boosting',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'core',
		oneLiner: 'Boosting adds weak learners sequentially so each new model corrects residual errors from the current ensemble.',
		intuition: 'Instead of voting many independent trees, boosting focuses each new tree on what the earlier trees still miss.',
		architectureBullets: [
			'Learners are added one after another rather than in parallel.',
			'Each stage targets the current residual or gradient direction.',
			'Shrinkage and depth control regularization.'
		],
		strengths: ['Excellent on tabular data', 'Captures nonlinearities and interactions', 'Highly performant in practice'],
		weaknesses: ['Sensitive to hyperparameters', 'Sequential training is slower', 'Can overfit if rounds or depth are too high'],
		useCases: ['Kaggle-style tabular tasks', 'Risk modeling', 'Ranking and structured business data'],
		math: {
			intuition: 'Each stage takes a small step in function space toward lower loss.',
			formula: 'F_m(x) = F_(m-1)(x) + eta h_m(x)',
			deepDiveMarkdown: 'Modern libraries like XGBoost, LightGBM, and CatBoost are practical engineering refinements of this idea.'
		},
		learningGoal: 'See how more rounds and larger learning rates change residual correction behavior.',
		references: [
			common.sklearn,
			ref('XGBoost paper', 'https://arxiv.org/abs/1603.02754', 'Popular optimized boosting system'),
			ref('LightGBM docs', 'https://lightgbm.readthedocs.io/en/latest/', 'Production boosting library')
		]
	},
	{
		slug: 'linear-regression',
		title: 'Linear Regression',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'support',
		oneLiner: 'Linear regression fits a weighted sum of input features to predict continuous targets.',
		intuition: 'It asks whether one straight hyperplane can explain the signal well enough.',
		architectureBullets: [
			'Prediction is a weighted sum plus bias.',
			'Training minimizes squared residual error.',
			'Coefficients describe directional feature influence.'
		],
		strengths: ['Fast and interpretable', 'Strong baseline', 'Good for linear trends and diagnostics'],
		weaknesses: ['Misses nonlinear interactions', 'Sensitive to multicollinearity', 'Feature design often matters'],
		useCases: ['Forecast baselines', 'Causal-style inspection with caveats', 'Continuous-response tabular tasks'],
		math: {
			intuition: 'The best-fit line minimizes total squared error.',
			formula: 'y_hat = w^T x + b',
			deepDiveMarkdown: 'Even simple linear models remain valuable because they are cheap, transparent, and often competitive on clean structured data.'
		},
		learningGoal: 'Adjust slope and noise to see when a linear trend is enough.',
		references: [
			common.sklearn,
			ref('Elements of Statistical Learning', 'https://hastie.su.domains/ElemStatLearn/', 'Statistical foundations'),
			ref('Linear models in scikit-learn', 'https://scikit-learn.org/stable/modules/linear_model.html', 'Practical docs')
		]
	},
	{
		slug: 'logistic-regression',
		title: 'Logistic Regression',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'support',
		oneLiner: 'Logistic regression maps a linear score through a sigmoid to estimate class probability.',
		intuition: 'It keeps the simplicity of a linear separator but returns calibrated class likelihoods instead of raw scores.',
		architectureBullets: [
			'Linear log-odds are converted into probabilities.',
			'Cross-entropy is optimized for classification.',
			'Decision boundaries remain linear in feature space.'
		],
		strengths: ['Fast, stable, and interpretable', 'Good probabilistic baseline', 'Works well with sparse linear signals'],
		weaknesses: ['Limited to linear decision boundaries without feature engineering', 'Can underfit complex interactions', 'Scaling and regularization still matter'],
		useCases: ['Binary classification', 'Text classification baselines', 'Probabilistic tabular models'],
		math: {
			intuition: 'The sigmoid squashes any linear score into the range from 0 to 1.',
			formula: 'P(y=1|x) = sigma(w^T x + b)',
			deepDiveMarkdown: 'Logistic regression is often underestimated because clean features make linear boundaries surprisingly competitive.'
		},
		learningGoal: 'See how margin tilt and confidence reshape a simple classification surface.',
		references: [
			common.sklearn,
			ref('Logistic Regression docs', 'https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression', 'Practical guide'),
			ref('Elements of Statistical Learning', 'https://hastie.su.domains/ElemStatLearn/', 'Theoretical grounding')
		]
	},
	{
		slug: 'ridge-lasso',
		title: 'Ridge / Lasso',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'support',
		oneLiner: 'Ridge and lasso add penalties to linear models to reduce variance and sometimes enforce sparsity.',
		intuition: 'Both methods shrink coefficients, but lasso can zero some of them out completely.',
		architectureBullets: [
			'Ridge uses an L2 penalty and spreads shrinkage smoothly.',
			'Lasso uses an L1 penalty and promotes sparse coefficients.',
			'Regularization trades small bias for lower variance.'
		],
		strengths: ['Improves generalization', 'Useful on high-dimensional data', 'Lasso supports feature selection'],
		weaknesses: ['Still fundamentally linear', 'Penalty choice matters', 'Correlated features complicate sparse selection'],
		useCases: ['Wide tabular data', 'Text or genomics features', 'Regularized baselines'],
		math: {
			intuition: 'The objective adds a penalty to discourage large coefficients.',
			formula: 'L = ||y - Xw||^2 + lambda ||w||_p',
			deepDiveMarkdown: 'Ridge usually keeps all features; lasso is more likely to produce a compact model.'
		},
		learningGoal: 'Compare regularization strength as coefficients shrink or disappear.',
		references: [
			common.sklearn,
			ref('Regularization Path docs', 'https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification', 'Ridge and lasso in practice'),
			ref('Elements of Statistical Learning', 'https://hastie.su.domains/ElemStatLearn/', 'Regularization foundations')
		]
	},
	{
		slug: 'svm',
		title: 'Support Vector Machines',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'support',
		oneLiner: 'SVMs seek a large-margin separator and can use kernels for nonlinear boundaries.',
		intuition: 'Only the hardest boundary-defining points really matter for the classifier.',
		architectureBullets: [
			'The maximum-margin hyperplane separates classes when possible.',
			'Slack variables allow imperfect separation.',
			'Kernel tricks create nonlinear decision surfaces implicitly.'
		],
		strengths: ['Strong on medium-sized datasets', 'Margin-based robustness', 'Kernel flexibility'],
		weaknesses: ['Scaling to very large datasets is harder', 'Kernel choice is nontrivial', 'Probabilities are not native'],
		useCases: ['Text classification', 'Structured medium-size tabular data', 'Nonlinear classification with kernels'],
		math: {
			intuition: 'Margin maximization tries to separate classes with the widest safe gap.',
			formula: 'min ||w||^2 subject to y_i(w^T x_i + b) >= 1',
			deepDiveMarkdown: 'Kernel methods are elegant because they retain linear optimization in a transformed feature space.'
		},
		learningGoal: 'Change margin and kernel effect to see the boundary stiffen or curve.',
		references: [
			common.sklearn,
			ref('A Tutorial on SVMs', 'https://link.springer.com/article/10.1023/A:1010933404324', 'Classic tutorial by Burges'),
			ref('LIBSVM guide', 'https://www.csie.ntu.edu.tw/~cjlin/libsvm/', 'Practical ecosystem')
		]
	},
	{
		slug: 'naive-bayes',
		title: 'Naive Bayes',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'support',
		oneLiner: 'Naive Bayes combines feature evidence assuming conditional independence within each class.',
		intuition: 'It often works because many weakly informative independent signals are enough, especially in sparse domains.',
		architectureBullets: [
			'Class priors set the initial belief.',
			'Each feature contributes evidence independently under the model.',
			'Posterior class probabilities follow from Bayes rule.'
		],
		strengths: ['Extremely fast', 'Works well on text and sparse features', 'Good baseline with small data'],
		weaknesses: ['Independence assumption is usually false', 'Limited interaction modeling', 'Calibration can be poor'],
		useCases: ['Spam filtering', 'Document classification', 'Quick probabilistic baselines'],
		math: {
			intuition: 'Posterior probability multiplies prior belief by per-feature likelihood contributions.',
			formula: 'P(y|x) proportional to P(y) product_i P(x_i | y)',
			deepDiveMarkdown: 'The model is “naive,” but that simplification keeps variance low and learning extremely fast.'
		},
		learningGoal: 'See how stronger or weaker evidence changes posterior class belief.',
		references: [
			common.sklearn,
			ref('Naive Bayes docs', 'https://scikit-learn.org/stable/modules/naive_bayes.html', 'Practical guide'),
			ref('Pattern Classification', 'https://archive.org/details/patternclassific0000duda', 'Classic reference')
		]
	},
	{
		slug: 'bayesian-networks',
		title: 'Bayesian Networks',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'support',
		oneLiner: 'Bayesian networks encode conditional dependencies in a directed acyclic probabilistic graph.',
		intuition: 'The graph tells you which variables directly influence which others and which dependencies can be factorized away.',
		architectureBullets: [
			'Nodes represent random variables.',
			'Directed edges encode conditional dependence structure.',
			'Inference propagates evidence through the graph.'
		],
		strengths: ['Interpretable dependency structure', 'Handles uncertainty explicitly', 'Useful when causality-like structure matters'],
		weaknesses: ['Structure learning is hard', 'Inference can be expensive', 'Quality depends on good graph design or discovery'],
		useCases: ['Diagnostic systems', 'Risk analysis', 'Knowledge-driven probabilistic modeling'],
		math: {
			intuition: 'The full joint distribution factorizes over parents in the DAG.',
			formula: 'P(X_1,...,X_n) = product_i P(X_i | Parents(X_i))',
			deepDiveMarkdown: 'The graph is valuable because it compresses assumptions about dependency and conditional independence.'
		},
		learningGoal: 'See how more nodes and stronger certainty propagate evidence through a dependency graph.',
		references: [
			ref('Probabilistic Reasoning in Intelligent Systems', 'https://bayes.cs.ucla.edu/BOOK-2K/', 'Pearl classic'),
			ref('pgmpy documentation', 'https://pgmpy.org/', 'Practical tooling'),
			ref('Probabilistic ML book', 'https://probml.github.io/pml-book/', 'Modern reference')
		]
	},
	{
		slug: 'hmms',
		title: 'Hidden Markov Models',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'support',
		oneLiner: 'HMMs model a hidden state chain that emits observable outputs over time.',
		intuition: 'You do not see the true state directly; you infer it from the observation sequence and the transition dynamics.',
		architectureBullets: [
			'Transitions describe how hidden states evolve.',
			'Emission probabilities connect hidden states to observations.',
			'Forward-backward and Viterbi support inference and decoding.'
		],
		strengths: ['Clear probabilistic sequence model', 'Interpretable hidden states', 'Strong historical baseline for temporal data'],
		weaknesses: ['Markov assumptions are restrictive', 'Observation models can be simplistic', 'Limited expressivity compared with deep sequence models'],
		useCases: ['Speech and handwriting history', 'Sequence segmentation', 'Probabilistic time-series baselines'],
		math: {
			intuition: 'State transitions and emissions jointly explain the observed sequence.',
			formula: 'P(x,z) = P(z_1) product_t P(z_t|z_(t-1)) P(x_t|z_t)',
			deepDiveMarkdown: 'HMMs are important because they make latent temporal structure explicit and tractable.'
		},
		learningGoal: 'See how state count and transition confidence affect inferred sequence structure.',
		references: [
			ref('Rabiner HMM tutorial', 'https://www.cs.sjsu.edu/~stamp/RUA/HMM.pdf', 'Classic sequence-model tutorial'),
			ref('hmmlearn documentation', 'https://hmmlearn.readthedocs.io/en/latest/', 'Practical toolkit'),
			ref('Probabilistic ML book', 'https://probml.github.io/pml-book/', 'Modern probabilistic reference')
		]
	},
	{
		slug: 'knn',
		title: 'k-Nearest Neighbors',
		family: 'Classical supervised and probabilistic methods',
		talkPriority: 'support',
		oneLiner: 'k-NN predicts from the labels of nearby examples in feature space with almost no explicit training.',
		intuition: 'The stored dataset itself acts as the model; locality defines the decision rule.',
		architectureBullets: [
			'Distance metric defines neighborhood structure.',
			'Prediction uses the nearest k examples.',
			'Larger k smooths the boundary, smaller k keeps it local.'
		],
		strengths: ['Simple and intuitive', 'No parametric training phase', 'Can model irregular boundaries'],
		weaknesses: ['Slow at inference on large datasets', 'Sensitive to scaling and metric choice', 'Stores the full dataset'],
		useCases: ['Small-data classification', 'Similarity search baselines', 'Instance-based learning demos'],
		math: {
			intuition: 'Classification comes from a local vote among nearby points.',
			formula: 'y_hat = mode({y_i : x_i in N_k(x)})',
			deepDiveMarkdown: 'k-NN is best understood as geometry-driven memorization rather than abstraction into parameters.'
		},
		learningGoal: 'Compare local versus smoothed neighborhoods by changing k.',
		references: [
			common.sklearn,
			ref('Nearest Neighbors docs', 'https://scikit-learn.org/stable/modules/neighbors.html', 'Practical guide'),
			ref('Pattern Classification', 'https://archive.org/details/patternclassific0000duda', 'Classic reference')
		]
	},
	{
		slug: 'k-means',
		title: 'k-Means',
		family: 'Unsupervised structure and manifolds',
		talkPriority: 'core',
		oneLiner: 'k-Means alternates between assigning points to centroids and moving centroids to cluster means.',
		intuition: 'It assumes clusters are roughly spherical groups around representative centers.',
		architectureBullets: [
			'Pick k cluster centers.',
			'Assign each point to the nearest centroid.',
			'Update centroids to the mean of assigned points and repeat.'
		],
		strengths: ['Fast and widely used', 'Simple geometric intuition', 'Good baseline for compact clusters'],
		weaknesses: ['Needs k in advance', 'Sensitive to initialization and outliers', 'Assumes roughly convex cluster shapes'],
		useCases: ['Customer segmentation', 'Prototype discovery', 'Vector quantization'],
		math: {
			intuition: 'The objective minimizes within-cluster squared distance to centroids.',
			formula: 'min sum_i ||x_i - mu_(c_i)||^2',
			deepDiveMarkdown: 'k-Means is easy to visualize, which makes it ideal for teaching clustering and iterative optimization.'
		},
		learningGoal: 'See centroids move as cluster count and spread change.',
		references: [
			common.sklearn,
			ref('k-means++', 'https://theory.stanford.edu/~sergei/papers/kMeansPP-soda.pdf', 'Improved initialization'),
			ref('Clustering chapter in ESL', 'https://hastie.su.domains/ElemStatLearn/', 'Statistical context')
		]
	},
	{
		slug: 'hierarchical-clustering',
		title: 'Hierarchical Clustering',
		family: 'Unsupervised structure and manifolds',
		talkPriority: 'support',
		oneLiner: 'Hierarchical clustering builds nested groups by repeatedly merging or splitting clusters.',
		intuition: 'Instead of one flat partition, it gives a whole tree of grouping resolutions.',
		architectureBullets: [
			'Agglomerative methods start from single points and merge upward.',
			'Linkage rules define distance between clusters.',
			'Dendrogram cuts determine the final grouping resolution.'
		],
		strengths: ['No need to choose one k up front', 'Dendrogram reveals multi-scale structure', 'Works well for exploratory analysis'],
		weaknesses: ['Can be expensive', 'Linkage choice changes results', 'Greedy merges are irreversible'],
		useCases: ['Exploratory clustering', 'Taxonomy building', 'Bioinformatics and similarity analysis'],
		math: {
			intuition: 'The method repeatedly merges the closest clusters under a chosen linkage metric.',
			formula: 'd(A,B) depends on linkage: min, max, average, or Ward objective',
			deepDiveMarkdown: 'Hierarchical clustering is useful when the grouping granularity is itself an object of interest.'
		},
		learningGoal: 'See how merge depth and linkage tightness change the grouping tree.',
		references: [
			common.sklearn,
			ref('Hierarchical clustering docs', 'https://scikit-learn.org/stable/modules/clustering.html#hierarchical-clustering', 'Practical guide'),
			ref('Elements of Statistical Learning', 'https://hastie.su.domains/ElemStatLearn/', 'Cluster analysis reference')
		]
	},
	{
		slug: 'dbscan',
		title: 'DBSCAN',
		family: 'Unsupervised structure and manifolds',
		talkPriority: 'support',
		oneLiner: 'DBSCAN groups points through density connectivity and labels sparse points as noise.',
		intuition: 'Clusters are dense regions separated by sparse space, not necessarily spherical blobs.',
		architectureBullets: [
			'Neighborhood radius epsilon defines local density reach.',
			'Core points need enough neighbors to seed a cluster.',
			'Noise points remain unassigned when density is too low.'
		],
		strengths: ['Finds irregular cluster shapes', 'Handles outliers explicitly', 'No need to predefine cluster count'],
		weaknesses: ['Sensitive to epsilon and min-samples', 'Struggles with varying density', 'Distance metrics still matter'],
		useCases: ['Spatial clustering', 'Anomaly detection', 'Exploratory pattern mining'],
		math: {
			intuition: 'Clusters expand through chains of density-reachable points.',
			formula: 'core(x) if |N_epsilon(x)| >= min_samples',
			deepDiveMarkdown: 'DBSCAN’s main advantage is geometric flexibility; its main challenge is choosing a useful density scale.'
		},
		learningGoal: 'See how neighborhood radius and minimum density change cluster discovery.',
		references: [
			common.sklearn,
			ref('DBSCAN original paper', 'https://aaai.org/papers/kdd96-037-a-density-based-algorithm-for-discovering-clusters-in-large-spatial-databases-with-noise/', 'Foundational method'),
			ref('Clustering docs', 'https://scikit-learn.org/stable/modules/clustering.html#dbscan', 'Practical notes')
		]
	},
	{
		slug: 'pca',
		title: 'Principal Component Analysis',
		family: 'Unsupervised structure and manifolds',
		talkPriority: 'core',
		oneLiner: 'PCA rotates data onto orthogonal directions of maximal variance.',
		intuition: 'If data really lies near a lower-dimensional linear subspace, PCA finds the axes that preserve most of the spread.',
		architectureBullets: [
			'Center the data and compute covariance structure.',
			'Eigenvectors define principal directions.',
			'Projection onto top components compresses while preserving variance.'
		],
		strengths: ['Fast linear compression', 'Good for visualization pre-processing', 'Improves decorrelation'],
		weaknesses: ['Only linear', 'Variance is not always semantics', 'Sensitive to feature scaling'],
		useCases: ['Dimensionality reduction', 'Noise reduction', 'Exploratory visualization'],
		math: {
			intuition: 'Principal components are eigenvectors of the covariance matrix.',
			formula: 'Sigma v = lambda v',
			deepDiveMarkdown: 'PCA is the baseline manifold method because it is simple, deterministic, and often surprisingly informative.'
		},
		learningGoal: 'See how much variance a linear projection can keep.',
		references: [
			common.sklearn,
			ref('PCA docs', 'https://scikit-learn.org/stable/modules/decomposition.html#pca', 'Practical guide'),
			ref('Elements of Statistical Learning', 'https://hastie.su.domains/ElemStatLearn/', 'Statistical grounding')
		]
	},
	{
		slug: 'tsne',
		title: 't-SNE',
		family: 'Unsupervised structure and manifolds',
		talkPriority: 'support',
		oneLiner: 't-SNE maps high-dimensional points into low dimensions by preserving local neighborhood similarity.',
		intuition: 'It is a visualization tool, not a faithful metric projection of global geometry.',
		architectureBullets: [
			'High-dimensional similarities are turned into pairwise probabilities.',
			'Low-dimensional points are optimized to match those local similarities.',
			'Perplexity controls the neighborhood scale.'
		],
		strengths: ['Excellent local cluster visualization', 'Reveals neighborhood structure', 'Popular exploratory tool'],
		weaknesses: ['Poor at global geometry', 'Expensive relative to PCA', 'Plots can be misread as metric truth'],
		useCases: ['Embedding visualization', 'Cluster inspection', 'Exploratory feature analysis'],
		math: {
			intuition: 'The objective matches local pairwise similarity distributions between spaces.',
			formula: 'min KL(P || Q)',
			deepDiveMarkdown: 't-SNE is powerful for showing local groups, but distances between far clusters are not usually trustworthy.'
		},
		learningGoal: 'See how perplexity and separation affect the visual neighborhood layout.',
		references: [
			common.sklearn,
			ref('Visualizing Data using t-SNE', 'https://www.jmlr.org/papers/v9/vandermaaten08a.html', 'Original t-SNE paper'),
			ref('Manifold learning docs', 'https://scikit-learn.org/stable/modules/manifold.html#t-sne', 'Practical notes')
		]
	},
	{
		slug: 'umap',
		title: 'UMAP',
		family: 'Unsupervised structure and manifolds',
		talkPriority: 'support',
		oneLiner: 'UMAP builds a fuzzy neighborhood graph and optimizes a compact low-dimensional embedding.',
		intuition: 'It tries to preserve local structure like t-SNE while often retaining more global continuity and running faster.',
		architectureBullets: [
			'Construct a weighted neighborhood graph in high dimensions.',
			'Optimize a low-dimensional layout that preserves graph relationships.',
			'Neighbor count and min-distance control locality and cluster compactness.'
		],
		strengths: ['Fast and scalable visualization', 'Often better global continuity than t-SNE', 'Useful as a generic embedding tool'],
		weaknesses: ['Still sensitive to hyperparameters', 'Not a perfect global metric map', 'Interpretation can still be overconfident'],
		useCases: ['Embedding visualization', 'Preprocessing before clustering', 'Exploratory manifold learning'],
		math: {
			intuition: 'UMAP preserves fuzzy neighbor relations between the original and embedded graphs.',
			formula: 'min cross_entropy(fuzzy_graph_high, fuzzy_graph_low)',
			deepDiveMarkdown: 'UMAP is often the pragmatic choice when you want manifold visualization that is fast and tunable.'
		},
		learningGoal: 'Compare neighbor count and minimum distance to see local versus global structure shift.',
		references: [
			ref('UMAP paper', 'https://arxiv.org/abs/1802.03426', 'Foundational UMAP reference'),
			ref('UMAP docs', 'https://umap-learn.readthedocs.io/en/latest/', 'Practical guide'),
			common.sklearn
		]
	}
];

for (const topic of topics) {
	const topicFile = `import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
\tslug: '${topic.slug}',
\ttitle: ${JSON.stringify(topic.title)},
\tfamily: ${JSON.stringify(topic.family)},
\ttalkPriority: '${topic.talkPriority}',
\toneLiner: ${JSON.stringify(topic.oneLiner)},
\tintuition: ${JSON.stringify(topic.intuition)},
\tarchitectureBullets: ${JSON.stringify(topic.architectureBullets)},
\tstrengths: ${JSON.stringify(topic.strengths)},
\tweaknesses: ${JSON.stringify(topic.weaknesses)},
\tuseCases: ${JSON.stringify(topic.useCases)},
\tmath: ${JSON.stringify(topic.math)},
\tdemo: defineDemo('${topic.slug}', () => import('$presentation/demos/${topic.slug}.svelte'), ${JSON.stringify(topic.learningGoal)}),
\treferences: ${JSON.stringify(topic.references)}
});
`;

	const demoFile = `<script lang="ts">
\timport TopicDemo from '$lib/components/demos/TopicDemo.svelte';
\timport { getDemoPreset } from '$presentation/demo-presets';

\tconst config = getDemoPreset('${topic.slug}');
</script>

<TopicDemo {config} />
`;

	writeFileSync(join(topicDir, `${topic.slug}.ts`), topicFile);
	writeFileSync(join(demoDir, `${topic.slug}.svelte`), demoFile);
}

console.log(`Generated ${topics.length} topic files and demo wrappers.`);
