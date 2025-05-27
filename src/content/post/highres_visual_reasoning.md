---
title: "High-Resolution Visual Reasoning via Multi-Turn Grounding-Based Reinforcement Learning"
description: "MGPO enables LMMs to iteratively focus on key image regions through automatic grounding, achieving superior performance on high-resolution visual tasks without requiring grounding annotations"
publishDate: "2025-05-28"
tags: ["vision", "models", "reinforcement-learning", "research"]
---

<!-- ![MGPO](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/1.png) -->
<!-- <img src="https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/1.png" width="40%"> -->
<!-- [![1.png](https://i.postimg.cc/d3cvhPt0/1.png)](https://postimg.cc/47Pj00cC) -->

[![Pix-Pin-2025-04-28-12-16-06.gif](https://i.postimg.cc/26yHF2ZT/v2-0ae2cec95c7e5a2b67fd74203c5f5120-1440w.jpg)](https://postimg.cc/V5xBKG96)


[Code@Github](https://github.com/EvolvingLMMs-Lab/MGPO) 

## 1. Introduction

SOTA large multimodal model (LMM) architectures, such as Qwen2.5-VL, typically build on a powerful large language model (LLM) (e.g. Qwen2.5) integrated with an external Native Resolution Vision Transformer (NaViT). Such approach also presents challenges in high-resolution real-world scenarios, as these inputs are converted into enormous visual tokens, many of which are irrelevant to the downstream task. By comparison, when processing high-resolution real-world scenarios, the human visual system employs task-driven visual search strategies to ground and scrutinize critical regions of interest. Motivated by this biological mechanism, we attempt to equip LLMs with similar visual search capabilities by leveraging visual grounding to focus on key image regions.

However, empowering LMMs with such grounding-based visual reasoning capabilities is non-trivial, primarily due to the scarcity and high cost of obtaining grounding annotations for standard visual-question-answering (VQA) datasets, which are required for constructing multi-turn grounding-based conversation data for supervised fine-tuning (SFT). In this paper, **we highlight that accurate grounding behavior can emerge within a reinforcement learning (RL) paradigm, even when training supervision is provided solely through a binary reward function derived from the correctness of the final answer.**

To this end, we introduce **Multi-turn Grounding-based Policy Optimization (MGPO)**, a reinforcement learning (RL) algorithm that enables LMMs to iteratively focus on key image regions by automatically cropping sub-images, based on model-predicted grounding coordinates within a multi-turn conversation framework. Given a high-resolution image and a question, the model first predicts the coordinates of key regions relevant to the query. An image cropping function is then triggered to extract and return the corresponding sub-image. In subsequent turns, the model can integrate previous in-context convesations (including both the original image and cropped sub-image) to solve the question. 

![Figure 1: Examples of models trained with multi-turn grounding-based RL on high-resolution realworld tasks. The model first identifies key regions, which are then automatically cropped and returned as sub-images. Notably, despite only a binary reward function derived from the correctness of the final answer, the model gradually emerge robust grounding capability throughout the RL process. The conversation in the figure only shows key parts, the full conversation is provided in Figure 9.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/2.png)

In summary, MGPO mainly offers the following advantages:

- **Top-down and Interpretable Visual Reasoning.** MGPO equips LMMs with a top-down, question-driven visual search mechanism for high-resolution scenarios and provides interpretable outputs that indicate which image regions are attended to throughout the reasoning process.
- **Overcomes Maximum Pixel Constraints.** MGPO can overcomes the maximum pixel limitation of LMMs. As shown in the first example of Figure 1, even when resizing a high-resolution image within pixel limits results in a blurred input, the model can still identify relevant coordinates and crop clear sub-images from the original input for further analysis.
- **Without Additional Grounding Annotations.** MGPO can be post-trained directly on standard VQA datasets without the need for extra grounding annotations, and experimental results demonstrate substantial improvements in intermediate grounding performance compared to GRPO

Ultimately, we utilize MGPO to post-train Qwen2.5-VL-7B using visual-question-short answering data, yet achieves strong intermediate grounding performance without requiring grounding annotations (examples shown in Figure 1). Compared to GRPO, MGPO yields a 5.4% improvement on the in-distribution MME-Realworld benchmark and a 5.2% gain on the challenging out-of-distribution V* Bench. Notably, leveraging with only 21K post-training samples, our model surpasses OpenAI's o1 and GPT-4o models on the OOD V* Bench. 

## 2. Multi-turn Grounding-Based RL

Figure illustrates a comparison of different post-training paradigms for LMMs. In our MGPO, the model operates over K sequential interaction, dynamically grounding and reasoning by conditioning on the full history of visual and textual context at each step.

![Figure 2: Comparison of different post-training paradigms for LMMs. Our MGPO automatically crops and returns sub-image to the model based on its predicted grounding coordinates, enabling the model to iteratively focus on key regions and effectively solve high-resolution visual tasks.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/3.png)

**Multi-turn Template without Cold Start.** In practice, we observe that LLMs struggle to autonomously generate grounding coordinates during the rollout process, which hinder effective multi-turn RL. To address this, we design a fixed two-turn dialogue template, as shown in Figure 3, to explicitly activate the model's grounding and reasoning abilities.

![Figure 3: Fixed multi-turn grounding template, which eliminate cold start SFT process.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/4.png)

**Grounding Key Visual Areas.** Within the two-turn MGPO framework, the extraction of sub-images is performed with respect to the original high-resolution image. Since the grounding coordinates predicted by Qwen2.5-VL are inherently dependent on the resolution of the input image, it is necessary to normalize the predicted coordinates by the input image dimensions and subsequently map them back to the coordinate space of the original image. This normalization procedure is particularly crucial when the original image resolution exceeds the maximum pixel limit of the LMM, as it enables the model to access higher-fidelity sub-image for processing. A illustration of this process is provided in the Figure 4.

![Figure 4: A illustration of cropping sub-image based on grounding coordinates.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/5.png)

## 3. Experiments

### 3.1 Datasets & Metrics

To evaluate the effectiveness of the our approach, experiments are conducted on two established datasets: MME-Realworld and V* Bench. Both datasets are specifically designed to evaluate the capabilities of LMMs in analyzing high-resolution images and capturing fine-grained visual information.

**MME-Realworld.** The MME-Realworld dataset comprises a diverse array of tasks, which are systematically categorized into perception and reasoning domains. For in-distribution evaluation, the lite subset of MME-Realworld, consisting of 1,919 samples, is reserved as the test set, while the remaining 21,690 samples are utilized for training.

**V* Bench.** V* Bench serves as an out-of-distribution benchmark, focuses on detailed visual grounding on high-resolution images. This vision-centric benchmark requires LMMs to accurately localize and interpret specific visual information, which has also been adopted by OpenAI to assess the visual reasoning capabilities of their latest o3 and o4-mini models. This benchmark contains 191 test samples.

All datasets employ the multiple-choice question format, and model performance is consistently
measured by accuracy on both the in-distribution (MME-Realworld) and out-of-distribution (V*
Bench) test sets. Figure 5 illustrates the distribution of image resolutions across different datasets.

![Figure 5: Distribution of image resolutions (width × height) across different datasets.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/6.png)

### 3.2 Experimental Setup

We employ the verl framework to enable distributed training across multiple machines and GPUs, and utilize vLLM to accelerate inference during the rollout phase. For reinforcement learning, we adopt the naive GRPO algorithm as RL baseline, where a post-prompt is added: "{question}\nOutput the coordinates ofthe key image area relevant to the problem in JSON format. And put the answer letter (A, B, C, D, or E) within \boxed{}." Both GRPO and our proposed MGPO leverage a binary accuracy reward function, assigning a reward of 1 if the final multiple-choice answer is correct and 0 otherwise.

All experiments are conducted using the Qwen2.5-VL-7B model. To prevent out-of-memory errors, the maximum number of input image pixels is limited to 1,003,520 (1280 × 28 × 28), corresponding to a maximum of 1280 visual tokens per image. Images exceeding this pixel threshold are resized to comply with this constraint.

### 3.3 Main Results

Table 1 presents the performance comparison of different post-training paradigms on Qwen2.5-VL7B, including SFT, GRPO and our MGPO. All three post-training methods substantially improve the model's performance on high-resolution visual tasks, as measured by both OOD V* Bench and ID MME-Realworld benchmarks. 

Notably, we observe that GRPO does not yield significant improvements over SFT, which contrasts with conclusions drawn from prior work on multi-modal mathematical tasks. We hypothesize that, for high-resolution vision-centric tasks, the primary challenge lies in enabling the model to perceive fine-grained image details, rather than performing complex, lengthy reasoning.

In contrast, our MGPO algorithm achieves remarkable gains, outperforming both SFT and GRPO. Specifically, MGPO delivers a substantial 5.2% absolute improvement over the GRPO baseline on the V* Bench (OOD) benchmark, and a 5.4% gain in overall MME-Realworld (ID) performance. These results demonstrate the effectiveness of multi-turn grounding and iterative sub-image cropping in addressing the challenges of high-resolution visual understanding.

Additionally, we compare our results with OpenAI's o1 and GPT-4o models. To ensure a fair comparison, we report only the OOD V* Bench results. Notably, our MGPO post-trained model surpasses both o1 and GPT-4o, despite being based on a 7B model and trained with a small-scale dataset of 21k samples.

![Table 1: Performance comparison of different post-training paradigms for LMMs. V* Bench serves as an out-of-distribution evaluation, while MME-Realworld serves as an in-distribution evaluation. Abbreviations: OCR—Optical Character Recognition in the wild; RS—Remote Sensing; DT—Diagram and Table; MO—Video Monitoring; AD—Autonomous Driving.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/7.png)

Figure 6 illustrates the comparative performance trajectories of MGPO and GRPO on the V* Bench throughout the RL training process. As training progresses, MGPO consistently surpasses GRPO, highlighting its superior capacity to address high-resolution scenarios that remain unresolved by GRPO.

![Figure 6: Performance comparison of V* Bench between MGPO and GRPO.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/8.png)

**Effect of LMM Maximum Input Image Resolution.** Table 2 compares the impact of varying maximum input image resolutions for LMMs. We observe that MGPO yields greater performance improvements on the V* Bench when the maximum input pixel limit is lower. This is because, when high-resolution images are aggressively resized, many tasks become more challenging to solve directly. however, MGPO can first identify key regions and crop clearer sub-images from the original image, thereby facilitating more effective task completion.

![Table 2: Performance comparison of various post-training paradigms for LMMs under different maximum input image resolutions.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/9.png)

## 4. Grounding-based RL without Grounding Annotations

In this section, we highlight the insight that it is feasible to train powerful grounding-based RL models even without grounding annotations. This insight can broadens the applicability of grounding-based RL paradigms, as obtaining high-quality grounding annotations is often expensive and labor-intensive.

### 4.1 Emergent Grounding Ability During RL Training

To assess whether models can develop accurate grounding capabilities in the absence of grounding supervision, we analyze the proportion of rollouts that generate valid grounding coordinates during RL training (e.g., ensuring coordinates within the input image boundaries). Figure 7 illustrates the comparison between GRPO and MGPO. Regarding to GRPO, the ratio of valid grounding coordinates remains low and exhibits minimal improvement throughout training, indicating that the model struggles to ground correct image regions. In contrast, MGPO demonstrates a clear upward trajectory, with the proportion of valid grounding coordinates steadily increasing as training progresses.

![Figure 7: The ratio of valid grounding coordinates during RL rollouts.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/10.png)

Additionally, we evaluate whether the grounding sub-images from the test set can be directly used to answer the question using Qwen2.5-VL-7B. As presented in Table 3, the comparative results across different methods demonstrate the superior accuracy of grounding achieved by MGPO. In the second stage of MGPO, the model is provided with either the cropped subimage or the original image, without any auxiliary reward for generating valid sub-image coordinates. Notably, the model autonomously increases the proportion of valid grounding coordinates, suggesting that it is capable of learning to localize key regions and utilize subimages to improve question answering performance.

![Table 3: Ratio of grounding subimages that can directly answer the question using Qwen2.5-VL-7B on the V* Bench.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/11.png)


### 4.2 Further Experiments on Image Counting Tasks

To further substantiate the insight, we conduct additional experiments on the Image Counting task, leveraging the fact that the Image Count dataset provides both the grounding annotations (in point format) and the corresponding count as the final answer. Specifically, we randomly sample 3,000 instances from the Pixmo-Points dataset for post-training. Pixmo-Count is used as the indistribution (ID) evaluation benchmark, while FSC-147 serves as the out-of-distribution (OOD) benchmark.

During GRPO post-training, the model is prompted to first grounding (point) each object in the image and subsequently provide the total count. We compare two reward function: (1) the binary accuracy reward based solely on the correctness of the final count, and (2) incorporating an additional point reward. The point reward is computed by matching the model's predicted point list with the ground-truth point list using the Hungarian algorithm, such that a higher number of matched ratio results in a higher reward.

The results, summarized in Table 4, indicate that introducing the additional point reward does not yield significant performance improvements. We further visualize the outputs of the GRPO model trained solely with the accuracy reward (see Figure 8), and observe that the model is capable of accurately localizing object points even without explicit grounding supervision. These results support our conclusion that explicit grounding annotations are not necessary for effective RL-based learning, as the model inherently learns to perform precise grounding as a prerequisite for solving the counting task.

![Table 4: Performance comparison of image count task. Additional point reward do not lead to significant performance improvements.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/12.png)

![Figure 8: Visualization of point predictions from the GRPO model trained with only accuracy reward.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/13.png)

## 5. Limitation

All experiments of MGPO are conducted using a fixed two-turn template, rather than allowing the model to autonomously decide when to perform image cropping based on the input question, as illustrated in lasted OpenAI models such as o3 and o4-mini. This limitation stems from our observation that Qwen2.5-VL, when directly subjected to RL post-training, struggles to generate grounding coordinates without explicit prompt guidance.

Nevertheless, we believe that our trained models can be leveraged to generate high-quality chain-ofthought (CoT) data for subsequent SFT. By adopting a multi-stage training strategy that combines SFT and RL, as in DeepSeek-R1, may ultimately enable the model to autonomously decide when and how to perform grounding. We leave this direction for future work.


## Authors

- [Xinyu Huang](https://xinyu1205.github.io/)
- [Yuhao Dong](https://scholar.google.com/citations?user=kMui170AAAAJ&hl=zh-CN)
- Wei Li
- Jinming Wu
- Zihao Deng
- [Bo Li](https://brianboli.com/)
- Zejun Ma

## Citation
If you find our work to be useful for your research, please consider citing.

```bibtex
@article{huang2025highres,
  title={High-Resolution Visual Reasoning via Multi-Turn Grounding-Based Reinforcement Learning},
  author={Huang, Xinyu and Dong, Yuhao and Li, Wei and Wu, Jinming and Deng, Zihao and Li, Bo and Ma, Zejun},
  url={https://github.com/EvolvingLMMs-Lab/MGPO},
  year={2025}
}
```

## Appendix

![Figure 9: A full conversation example of MGPO post-trained model on high-resolution image tasks.](https://raw.githubusercontent.com/xinyu1205/MGPO/main/images/14.png)


