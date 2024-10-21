const currentDay = new Date().toISOString().split("T")[0];

export const mockBlogs = [
  {
    number: "1",
    title: "My First Article",
    date: `${currentDay}`,
    content:
      "This is my first blog. I love to blog. Let's see how long I can get this paragraph to be before I decide that this is enough. Wait, I could just get ChatGPT to generate some fake blogs! I'm a genius but first, let me create this application that I've been trying to make that was supposed to only take two days to make. Lord help me, I've yapped to the end of the oblivion. OH CHRISTMAS TREE, OH CHRISTMAS TREE, HOW I WISH YOU A MERRY CHRISTMAS.",
  },
  {
    number: "2",
    title: "My Second Article",
    date: `${currentDay}`,
    content:
      "In our fast-paced world, we often focus on big goals and forget to celebrate the small steps along the way. This post explores how acknowledging small victories can build momentum, boost confidence, and improve overall well-being. Strategies for tracking progress, journaling, and rewarding yourself are also covered.",
  },
  {
    number: "3",
    title: "My Third Article",
    date: `${currentDay}`,
    content:
      "The world is increasingly moving towards eco-conscious choices, and businesses must adapt. This article discusses the rise of sustainable business practices, how they impact branding, and practical ways companies can reduce their carbon footprint. Examples of innovative green startups and corporate giants leading the charge will be highlighted.",
  },
  {
    number: "4",
    title: "My Fourth Article",
    date: `${currentDay}`,
    content:
      "Artificial Intelligence is transforming industries, but how does it affect creative fields like design, music, and writing? This post delves into the impact of AI tools on creative work, the future of human creativity, and whether technology will help or hinder artistic expression. Interviews with AI researchers and creatives offer unique insights.",
  },
];
