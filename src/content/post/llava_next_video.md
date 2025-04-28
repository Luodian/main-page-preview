---
title: "LLaVA-NeXT-Video"
description: "Video Instruction Tuning With Synthetic Data"
publishDate: "2024-10-03"
tags: ["vision", "models"]
---

We explore LLaVA-NeXT's capabilities in video understanding tasks, highlighting its strong performance. Key improvements include:

SoTA Performance! Without seeing any video data, LLaVA-Next demonstrates strong zero-shot modality transfer ability, outperforming all the existing open-source LMMs (e.g., LLaMA-VID) that have been specifically trained for videos. Compared with proprietary ones, it achieves comparable performance with Gemini Pro on NextQA and ActivityNet-QA.

Strong length generalization ability. Despite being trained under the sequence length constraint of a 4096-token limit, LLaVA-Next demonstrates remarkable ability to generalize to longer sequences. This capability ensures robust performance even when processing long-frame content that exceeds the original token length limitation.

DPO pushes performance. DPO with AI feedback on videos yields significant performance gains.
