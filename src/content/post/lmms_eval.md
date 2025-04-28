---
title: "LMMs-Eval"
description: "Reality Check on the Evaluation of Large Multimodal Models"
publishDate: "2024-07-17"
tags: ["benchmarks", "models", "evaluation", "tools", "research"]
---

![Banner](https://camo.githubusercontent.com/fcf179566ff0a9e40aed13cc848bbf4544e516cee79635b8571b0dcc60eb925a/68747470733a2f2f692e706f7374696d672e63632f4b766b4c7a6246392f575832303234313231322d3031343430302d32782e706e67)

In today's world, we're on an exciting journey toward creating Artificial General Intelligence (AGI), much like the enthusiasm of the 1960s moon landing. This journey is powered by advanced large language models (LLMs) and large multimodal models (LMMs), which are complex systems capable of understanding, learning, and performing a wide variety of human tasks.

To gauge how advanced these models are, we use a variety of evaluation benchmarks. These benchmarks are tools that help us understand the capabilities of these models, showing us how close we are to achieving AGI.

However, finding and using these benchmarks is a big challenge. The necessary benchmarks and datasets are spread out and hidden in various places like Google Drive, Dropbox, and different school and research lab websites. It feels like we're on a treasure hunt, but the maps are scattered everywhere.

In the field of language models, there has been a valuable precedent set by the work of lm-evaluation-harness. They offer integrated data and model interfaces, enabling rapid evaluation of language models and serving as the backend support framework for the open-llm-leaderboard, and has gradually become the underlying ecosystem of the era of foundation models.

We humbly obsorbed the exquisite and efficient design of lm-evaluation-harness and introduce lmms-eval, an evaluation framework meticulously crafted for consistent and efficient evaluation of LMM.