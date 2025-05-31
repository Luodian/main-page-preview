---
title: "Search-R1"
description: "Search-R1 is a new method for image retrieval that uses a combination of a large language model and a retrieval-augmented model to achieve state-of-the-art performance"
publishDate: "2025-06-01"
tags: ["vision", "models", "research"]
---

**TL;DR**

MMSearch-R1 is the first end-to-end RL-based solution designed to equip LMMs with the capability to perform search on demand in real-world internet environments. It outperforms same-sized RAG baselines and approaches the performance of larger models while requiring significantly fewer search calls.

🔗 [Code](https://github.com/EvolvingLMMs-Lab/multimodal-search-r1) | [Paper](https://arxiv.org/abs/2506.00000) | [Model](https://huggingface.co/EvolvingLMMs-Lab/MMSearch-R1-7B) | [Data](https://huggingface.co/datasets/EvolvingLMMs-Lab/FVQA)

![**Figure 1:** MMSearch-R1 learns to recognize the boundaries of its knowledge and perform on-demand search, significantly reducing the number of searches required while outperforming RAG-based models on knowledge-intensive and info-seeking VQA tasks.](attachment:851b0ffd-2a3e-4383-a793-5f705995fd9d:image.png)

**Figure 1:** MMSearch-R1 learns to recognize the boundaries of its knowledge and perform on-demand search, significantly reducing the number of searches required while outperforming RAG-based models on knowledge-intensive and info-seeking VQA tasks.

## 1. Introduction

Scaling up vision-language paired data has become a widely adopted paradigm for Large Multimodal Models (LMMs) to acquire grounded knowledge of the visual world. Although this static training strategy has proven effective, it remains limited in capturing complex and evolving real-world knowledge. In particular, state-of-the-art LMMs continue to struggle with long-tail facts, newly emerging information, and domain-specific content that is often restricted by privacy or copyright constraints. As a result, their performance remains suboptimal on knowledge-intensive and information-seeking visual question answering tasks, frequently generating hallucinated outputs when confronted with inputs beyond their training distribution, such as unfamiliar visual content or previously unseen textual information. This limitation raises important concerns regarding their factual reliability in real-world applications.

Integrating search capabilities into LMMs offers a promising solution to above limitations. However, existing approaches such as Retrieval-Augmented Generation (RAG) and prompt-based agents remain suboptimal. RAG methods rely on a fixed retrieve-then-generate pipeline grounded in static corpora, often leading to over-retrieval, high computational cost, and the unrealistic assumption that all necessary information is already available. This rigid setup fails to reflect the dynamic and unpredictable nature of real-world scenarios. In contrast, prompt-based agents can access real-time search engines, but their parameters are not optimized through learning, preventing them from truly acquiring effective search behaviors or adapting to open-world environments.

To address these limitations, we aim to train LMMs that can interact with real-world environments and acquire three essential search-related capabilities: (1) *when to search*, (2) *what to search for*, and (3) *how to reason over search results to answer user queries*. Building on these goals, we introduce **MMSearch-R1**, the first end-to-end reinforcement learning framework designed to empower LMMs with on-demand search capabilities in open, internet-based environments. Our efforts are summarized as follows:

- **Dataset Construction** We propose an automated approach to construct a multimodal search VQA dataset by estimating the model’s familiarity with each question. This enables the generation of search-required and search-free samples, further complemented by manually annotated test data covering diverse knowledge types and difficulty levels.
- **Multimodal Search Tool Integration** We develop a real-world search pipeline combining an image search tool and a text search tool, enabling LMMs to retrieve relevant visual and textual information for unfamiliar inputs.
- **Wiser Search via Reinforcement Learning** We introduce a GRPO-based RL framework that trains LMMs to decide when, what, and how to search. Our method achieves superior performance over RAG-based baselines while reducing search calls by over 30%.
- **Open-Sourced Dataset and Framework** We will release our model, dataset and training framework to support future research in search-augmented multimodal reasoning.

## 2. Method

### **2.1. Building Iterative Multimodal Search-Integrated RL Framework**

![**Figure 2:** Illustration of training in MMSearch-R1. Top: The GRPO training pipeline integrated with multimodal search tools. Bottom: A detailed view of the rollout process and search tool execution.](attachment:975f8b1d-4c70-4020-a640-297a13837e41:image.png)

**Figure 2:** Illustration of training in MMSearch-R1. Top: The GRPO training pipeline integrated with multimodal search tools. Bottom: A detailed view of the rollout process and search tool execution.

We built on veRL and adopt standard GRPO as our base RL algorithm, with modifications to allow search interactions with the real-world environment during the rollout process, as illustrated in Figure 2 and below.

- **Multimodal Search Tools** We equip the model with two types of search tools to interact with real-world internet content. The first is an image search tool, which takes the input image and returns the top-5 visually similar webpages, each represented by a thumbnail and a title. This enables the model to identify unfamiliar visual entities in the image. The second is a text search pipeline, where the model formulates a query based on the user question, retrieves relevant webpages, and processes their content into concise summaries. This allows the model to acquire textual knowledge needed to answer the question accurately.
- **Rollout with Multi-turn Multimodal Search** The rollout process is designed to be multi-turn and iterative. At each step, the model receives new information, such as the original question or retrieved search results, and performs reasoning based on the accumulated context. It then selects an action from a predefined action space, which includes invoking search tools or answering the question. This process continues until the model generates a final answer or reaches the maximum number of allowed turns. To support this interaction, we define and utilize a set of special tokens to structure the model's outputs and the environment's feedback.
- **Reward Modeling** Our reward consists of two components: an accuracy score with search penalty and a format score. For accuracy score, we evaluate model performance using exact string match against the ground truth, assigning a score of 1 for correct answers and 0 otherwise. For correct responses, a penalty factor (between 0 and 1) is applied if any search was used, encouraging the model to rely on internal knowledge and invoke search only when necessary. This design promotes efficient, on-demand search behavior. The format score verifies whether the model follows the required output structure, ensuring compatibility with the environment interface.

$$
reward = (1 - \alpha)\cdot Acc\_Score\cdot Search\_Penalty + \alpha\cdot Format\_Score
$$

### 2.2. Curating Search-balanced VQA Datasets

![**Figure 3:** Illustration of data construction process of FVQA dataset: (a). An automated pipeline for visual knowledge-required VQA samples collection; (b). Knowledge taxonomy; (c). Overall pipeline showing the composition and origin of FVQA from various automatic and manually curated sources.](attachment:fc80bc76-a435-4272-a8b8-adb029d65787:image.png)

**Figure 3:** Illustration of data construction process of FVQA dataset: (a). An automated pipeline for visual knowledge-required VQA samples collection; (b). Knowledge taxonomy; (c). Overall pipeline showing the composition and origin of FVQA from various automatic and manually curated sources.

To effectively train models for on-demand search using simple outcome-based reinforcement learning, we require a **search-balanced dataset** that includes both search-required and search-free questions. This balance allows the model to learn when to rely on internal knowledge and when to invoke external search. We propose three key criteria for such datasets: (1). Coverage of Both Search-Required/Free Questions; (2). Concise and Verifiabl Answers; (3). Diversity in Knowledge and Difficulty. Follow these criteria, we construct a multimodal search VQA dataset, **FactualVQA (FVQA)**, using a combination of automated pipelines and manual annotation.

- **VQA Collection** We first gather a pool of candidate VQA samples requiring either visual or textual knowledge. For visual knowledge, we develop an automated pipeline that collects images related to head and tail visual concepts in the MetaCLIP vocabulary from the internet. Based on these images, we use GPT-4o to generate corresponding questions that assess the model’s recognition capabilities. For textual knowledge, we sample questions from the InfoSeek training set. We annotate the knowledge type for each question using GPT4o and maintain a balanced distribution across categories.
- **Search Balancing** To distinguish between search-required and search-free questions, we use a preliminary model equipped with search capabilities to classify the collected VQA samples. Based on this classification, we construct a search-balanced training set of 5,000 examples, named FVQA-train, which includes approximately 3,400 search-required and 1,600 search-free questions.
- **Human Annotation** Human annotators are involved throughout the data curation process to ensure diversity, authenticity, and label quality—especially for the test set of FVQA.

## 3. Experimental Findings

We evaluated MMSearch-R1 against both closed-source models (GPT-4o and Gemini 2.5 Pro) and open-source models from the Qwen2.5-VL series on knowledge-intensive and information-seeking VQA tasks (FVQA-test, InfoSeek, MMSearch, SimpleVQA, and LiveVQA). All baseline models are tasked with solving VQA problems in two different workflows. (1) Direct Answer: Models are prompted to directly generate a short and precise answer without accessing external information. (2) Answer under RAG Workflow: In this workflow, models are required to perform exactly two search operations using our multimodal search tools for each VQA example, first performing an image search and then a text search. Specifically, given an input image and question, the model is provided with the image search results and the original question in the first round and is prompted to generate a text query to assist in answering. In the second round, the retrieved results based on the text query are fed into the model, and the model is asked to produce the final answer. Under a fixed budget of search steps, the RAG workflow typically exposes the model to more external information compared to the on-demand search strategy.

![**Table 1:** Performance of MMSearch-R1 across benchmarks. "Acc (%)" denotes the accuracy evaluated by LLM-as-Judge, while "SR (%)" represents the search ratio, defined as the percentage of total search calls made relative to the maximum allowed search steps for each method.](attachment:3d99aa88-cfa7-40f5-8afa-9374f9b7c41d:image.png)

**Table 1:** Performance of MMSearch-R1 across benchmarks. "Acc (%)" denotes the accuracy evaluated by LLM-as-Judge, while "SR (%)" represents the search ratio, defined as the percentage of total search calls made relative to the maximum allowed search steps for each method.

- ***Finding 1: RL training enables models to better recognize the boundaries of their knowledge and perform on-demand search more effectively.*** As shown in Table 1, MMSearch-R1-7B outperforms same-sized RAG-based models by an average of **3%** in accuracy while reducing the average search rate by **32.9%**, across both in-domain and out-of-domain test sets. This demonstrates that our RL-trained model achieves higher correctness with fewer search calls, indicating more efficient and selective use of external information.

![**Figure 4:** (a). Performance comparison between the Base model and the RL-trained model under the RAG workflow. (b). Answer behavior breakdown of Base (inner circle) and RL (outer circle) models in InfoSeek and SimpleVQA.](attachment:55f9746c-dca1-4ef8-9604-a37c3ac3b34f:image.png)

**Figure 4:** (a). Performance comparison between the Base model and the RL-trained model under the RAG workflow. (b). Answer behavior breakdown of Base (inner circle) and RL (outer circle) models in InfoSeek and SimpleVQA.

- ***Finding 2: RL training enhances the model’s ability to generate effective text queries and summarize retrieved information.*** To evaluate the ablities of query generation and information summarization, we follow a fixed RAG setup where both image and text search are executed for every question. This isolates the model's ability to interact with retrieved information. As shown in Figure 4(a), MMSearch-R1-7B consistently outperforms the base model on both in-domain and out-of-domain tasks.
- ***Finding 3: RL improves the model's ability to utilize its internal knowledge.*** As shown in Figure 4(b), there is a clear upward trend in the *Correct without Search* proportion from the base model to the RL-trained model. These gains indicate that the RL-trained model can answer substantially more questions correctly without invoking the search tool, demonstrating improved recall and reasoning based on its internal knowledge.

![**Figure 5:** (a). Performance improvements of SFT and RL over Base across five VQA datasets. (b). Training dynamics of reward and search ratio for different strategies](attachment:196738f1-a6d1-4835-97fa-b63abb12be86:image.png)

**Figure 5:** (a). Performance improvements of SFT and RL over Base across five VQA datasets. (b). Training dynamics of reward and search ratio for different strategies

- ***Finding 4: RL achieves greater performance improvements and exhibits higher data efficiency compared to supervised SFT.*** We distill GPT-4o's behavior on our collected VQA samples to construct SFT data, and fine-tune Qwen2.5-VL-7B on it. This serves as a supervised learning baseline for comparison against our reinforcement learning-trained model. As shown in Figure 5(a), the results show that the model trained with RL consistently outperforms the one trained with SFT across all tasks, despite being trained on only about half as much data.
- ***Finding 5: Training with balanced data and a search penalty in the reward effectively guide the model to perform on-demand search.*** Figure 5(b) illustrates the training dynamics of reward and search ratio during reinforcement learning. Removing either the search penalty or data balancing leads to distinct trade-offs. Although both ablated variants achieve slightly higher rewards, they do so at the cost of overusing the search tool, with search ratios rapidly converging to nearly 100%.

## 4. Conclusion

MMSearch-R1 learns to recognize knowledge gaps, selectively invoke image or text search, and reason over retrieved content. It outperforms same-sized RAG baselines and approaches the performance of larger models while requiring significantly fewer search calls. Our framework, dataset, and findings offer practical insights into training LMMs with real-world interaction capabilities and lay the groundwork for building multimodal agents that are both adaptive and interactive. We look forward to the next major advancement in multimodal intelligence emerging as models increasingly engage with and explore the real world through more tools, further evolving their reasoning and adaptive capabilities.

## Authors

- [Jinming Wu*](https://www.notion.so/Jinming-Kimmy-Wu-b22c1682d48d47939dcd7c41bf6a6bab?pvs=21)
- [Zihao Deng*](https://scholar.google.com/citations?user=kMui170AAAAJ&hl=zh-CN)
- [Wei Li](https://scholar.google.com/citations?user=q8ZrKVIAAAAJ&hl=zh-CN)
- [Yiding Liu](https://liuyiding.net/)
- [Bo You](https://scholar.google.com/citations?user=XwY9LXoAAAAJ&hl=zh-CN)
- [Bo Li](https://brianboli.com/)
- [Zejun Ma](https://scholar.google.com/citations?user=XwY9LXoAAAAJ&hl=zh-CN)

*equal contribution

## Citation

```bibtex
@article{wu2025searchr1,
  title={Search-R1: A Multimodal Search-Augmented Reinforcement Learning Framework for LMMs},
  author={Wu, Jinming and Deng, Zihao and Li, Wei and Liu, Yiding and You, Bo and Li, Bo and Ma, Zejun},
  url={https://github.com/EvolvingLMMs-Lab/multimodal-search-r1},
  year={2025}
}
```