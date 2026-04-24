import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'rl-architectures',
	title: "Reinforcement Learning Architectures",
	family: "Reinforcement learning and evolutionary methods",
	talkPriority: 'core',
	oneLiner: "RL architectures optimize sequential decisions from reward feedback rather than direct labels.",
	intuition: "The agent must learn what to do by interacting, observing consequences, and trading exploration against exploitation.",
	architectureBullets: ["State, action, reward, and policy define the control loop.","Value-based and policy-based variants optimize different internal targets.","Credit assignment makes delayed rewards difficult."],
	strengths: ["Optimizes behavior directly","Works without supervised labels","Fits control and planning tasks"],
	weaknesses: ["Sample inefficient","Reward design is fragile","Instability is common in realistic environments"],
	useCases: ["Games","Robotics","Adaptive decision systems"],
	math: {"intuition":"The goal is expected cumulative discounted reward.","formula":"G_t = sum_k gamma^k r_(t+k+1)","deepDiveMarkdown":"Most RL methods differ in how they estimate returns and how directly they optimize policies."},
	demo: defineDemo('rl-architectures', () => import('$presentation/demos/rl-architectures.svelte'), "See how exploration and reward emphasis change the policy landscape in a toy gridworld."),
	references: [{"label":"Reinforcement Learning: Sutton and Barto","url":"http://incompleteideas.net/book/the-book-2nd.html","note":"Canonical RL reference"},{"label":"OpenAI Spinning Up","url":"https://spinningup.openai.com/en/latest/","note":"Practical RL orientation"},{"label":"Deep RL course notes","url":"https://huggingface.co/learn/deep-rl-course/unit0/introduction","note":"Accessible modern refresher"}]
});
