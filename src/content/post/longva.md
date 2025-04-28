---
title: "LongVA"
description: "Long Context Transfer from Language to Vision"
publishDate: "2024-06-24"
tags: ["vision", "models", "research"]
---

![Banner](https://github.com/EvolvingLMMs-Lab/LongVA/blob/main/vision_niah/niah_output/LongVA-7B/heatmap.png?raw=true)


Gemini has amazed the world with its capability to understand hour-long videos. However, we still lack an open-source alternative with similar capabilities. Our latest research presents an innovative solution towards long video LMM, shifting the focus from reducing visual tokens per frame to leveraging the long context capabilities of language models. Here, we present our SoTA video model, Long Video Assistant (LongVA), and our novel benchmark, Visual Needle-In-A-Haystack (V-NIAH).

Long Context Transfer We discovered and verified that the long context capability of language models can be directly transferred to the video domain in modality-aligned multi-modal models. On V-NIAH, LongVA is the only open-source model capable of accurately retrieving visual information from inputs with 2000 frames or more than 200K visual tokens.

UniRes We proposed UniRes, a unified visual encoding scheme that encodes both images and videos. In UniRes, a video is encoded the same as multiple image crops in a sequence. Leveraging the Long Context Transfer property and UniRes, LongVA exhibits superior zero-shot performance in video tasks without any video-specific training data.

SoTA Performance LongVA achieves state-of-the-art performance on the comprehensive Video-MME benchmarks among 7B models. Its performance increases with denser sampling of video frames. We also conduct careful experiments to ablate where it improvements come from.