---
title: "LLaVA-OneVision"
description: "Large Multi-modal Models Can Interpret Features in Large Multi-modal Models"
publishDate: "2024-08-03"
tags: ["vision", "models", "research"]
---

![LLaVA-OneVision](https://llava-vl.github.io/blog/2024-08-05-llava-onevision/demos/fig1.png)

We present LLaVA-OneVision, a family of open large multimodal models (LMMs) developed by consolidating our insights into data, models, and visual representations in the LLaVA-NeXT blog series. Our experimental results demonstrate show that LLaVA-OneVision is the first single model that can simultaneously push the performance boundaries of open LMMs in three important computer vision scenarios: single-image, multi-image and video scenarios. Importantly, the design of LLaVA-OneVision allow strong transfer learning across different modalities/scenarios, yielding new emerging capabilities. In particular, strong video understanding and cross-scenario capabilities are demosntrated through task transfer from images to videos.

We open-source the LLaVA-OneVision to facilitate future development of LMM in the community.

[Training Code](https://github.com/LLaVA-VL/LLaVA-NeXT): Cook a SOTA model with our released training code

[🤗 Checkpoints](https://huggingface.co/collections/lmms-lab/llava-onevision-66a259c3526e15166d6bba37): Access pre-trained model checkpoints (0.5B, 7B, 72B)

[🤗 LLaVA-OneVision Data](https://huggingface.co/datasets/lmms-lab/LLaVA-OneVision-Data): Explore training datasets for Single-Image and OneVision stages
