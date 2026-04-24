import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'q-learning',
	title: "Q-Learning",
	family: "Reinforcement learning and evolutionary methods",
	talkPriority: 'core',
	oneLiner: "Q-Learning estimates state-action value and updates toward the greedy next action target.",
	intuition: "Even while behaving exploratorily, the update asks what the best available future action would be.",
	architectureBullets: ["Learns Q(s, a) directly from transitions.","Uses the max over next-state actions in the target.","Off-policy updates decouple behavior from target policy."],
	strengths: ["Conceptually simple","Strong value-learning baseline","Extends naturally to DQN-style deep RL"],
	weaknesses: ["Can be overoptimistic","Needs discrete or approximated actions","Exploration still remains hard"],
	useCases: ["Tabular RL","Discrete control tasks","Teaching core RL ideas"],
	math: {"intuition":"One-step bootstrap uses the best next action estimate.","formula":"Q(s,a) <- Q(s,a) + alpha[r + gamma max_a' Q(s',a') - Q(s,a)]","deepDiveMarkdown":"The off-policy max target is why Q-learning can converge to an optimal policy under the right assumptions."},
	demo: defineDemo('q-learning', () => import('$presentation/demos/q-learning.svelte'), "Watch how exploration and learning rate affect a tabular value surface."),
	references: [{"label":"Reinforcement Learning: Sutton and Barto","url":"http://incompleteideas.net/book/the-book-2nd.html","note":"Canonical RL reference"},{"label":"Q-learning","url":"https://www.gatsby.ucl.ac.uk/~dayan/papers/cjch.pdf","note":"Watkins and Dayan paper"},{"label":"OpenAI Spinning Up: RL Intro","url":"https://spinningup.openai.com/en/latest/spinningup/rl_intro.html","note":"Modern explanation"}]
});
