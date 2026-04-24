import { defineDemo, defineTopic } from '$presentation/topic-helper';

export default defineTopic({
	slug: 'sarsa',
	title: "SARSA",
	family: "Reinforcement learning and evolutionary methods",
	talkPriority: 'core',
	oneLiner: "SARSA updates values using the action actually selected by the current behavior policy.",
	intuition: "Because it learns from the policy it is following, SARSA tends to reflect the cost of risky exploration more directly.",
	architectureBullets: ["State-action-reward-state-action defines the update tuple.","Targets use the next chosen action instead of a max operator.","On-policy learning ties value estimates to current behavior."],
	strengths: ["More conservative than Q-learning in risky settings","Clear on-policy interpretation","Good teaching contrast to off-policy updates"],
	weaknesses: ["Performance depends on exploration policy","May converge more cautiously","Still limited by tabular assumptions unless approximated"],
	useCases: ["Safe exploratory control","Introductory RL comparisons","Gridworld tasks"],
	math: {"intuition":"The target follows what the current policy really does next.","formula":"Q(s,a) <- Q(s,a) + alpha[r + gamma Q(s',a') - Q(s,a)]","deepDiveMarkdown":"SARSA captures the value of exploratory behavior itself, which can matter in hazardous environments."},
	demo: defineDemo('sarsa', () => import('$presentation/demos/sarsa.svelte'), "Compare on-policy updates against greedier value updates in the same gridworld."),
	references: [{"label":"Reinforcement Learning: Sutton and Barto","url":"http://incompleteideas.net/book/the-book-2nd.html","note":"Canonical RL reference"},{"label":"On-Policy TD Control","url":"https://www.cs.ualberta.ca/~sutton/book/ebook/node64.html","note":"Sutton and Barto reference section"},{"label":"SARSA tutorial notes","url":"https://huggingface.co/learn/deep-rl-course/unit1/sarsa","note":"Modern pedagogical explanation"}]
});
