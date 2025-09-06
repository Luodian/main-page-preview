---
title: "LLaVA-OneVision: Easy Visual Task Transfer"
description: "The first single model that can simultaneously push the performance boundaries of open LMMs in three important computer vision scenarios: single-image, multi-image, and video"
publishDate: "2024-08-05"
tags: ["vision", "multimodal", "research", "llava", "video"]
---

![LLaVA-OneVision](https://llava-vl.github.io/blog/2024-08-05-llava-onevision/demos/fig1.png)

## Overview

We present **LLaVA-OneVision**, a family of open large multimodal models (LMMs) developed by consolidating our insights into data, models, and visual representations in the LLaVA-NeXT blog series. LLaVA-OneVision is the **first single model** that can simultaneously push the performance boundaries of open LMMs in three important computer vision scenarios: **single-image**, **multi-image**, and **video** scenarios.

## Key Features

### Unified Architecture
LLaVA-OneVision is designed to have a similar maximum visual token count across different scenarios, enabling flexible extension to multiple visual signal types while maintaining consistent performance.

### Model Sizes
- **0.5B parameters** - Lightweight deployment
- **7B parameters** - Balanced performance
- **72B parameters** - State-of-the-art capabilities

## Emerging Capabilities

The design of LLaVA-OneVision enables strong transfer learning across different modalities and scenarios, yielding impressive emerging capabilities:

### 1. Cross-Scenario Understanding
Seamlessly process and understand content across single images, multiple images, and videos within a unified framework.

### 2. Advanced Visual Analysis
- **Diagram and table interpretation** - Understanding complex visual structures
- **Multi-screenshot interaction** - Analyzing relationships across multiple screens
- **Set-of-mark object referencing** - Precise object identification and tracking

### 3. Video Capabilities
- **Image-to-video generation understanding** - Comprehending temporal transitions
- **Video analysis and comparison** - Deep understanding of video content
- **Multi-camera video interpretation** - Processing footage from multiple viewpoints
- **Detailed video subject description** - Rich, contextual video narration

## Strong Transfer Learning

Importantly, the design of LLaVA-OneVision allows strong transfer learning across different modalities/scenarios. In particular, strong video understanding and cross-scenario capabilities are demonstrated through task transfer from images to videos, showcasing the model's ability to generalize learned representations across visual domains.

## Open-Source Resources

We open-source LLaVA-OneVision to facilitate future development of LMMs in the community:

### 🚀 [Training Code](https://github.com/LLaVA-VL/LLaVA-NeXT)
Cook a SOTA model with our released training code and reproduction scripts

### 🤗 [Model Checkpoints](https://huggingface.co/collections/lmms-lab/llava-onevision-66a259c3526e15166d6bba37)
Access pre-trained model checkpoints in all three sizes (0.5B, 7B, 72B)

### 📊 [Training Datasets](https://huggingface.co/datasets/lmms-lab/LLaVA-OneVision-Data)
Explore comprehensive training datasets for Single-Image and OneVision stages

### 🔥 [Live Demo](https://llava-vl.github.io/blog/2024-08-05-llava-onevision/)
Try LLaVA-OneVision directly in your browser

## Development Roadmap

LLaVA-OneVision represents a significant milestone in our iterative improvements through the LLaVA-NeXT series, focusing on:
- Enhanced reasoning capabilities
- Improved OCR performance
- Expanded world knowledge
- Advanced multimodal understanding

## Citation

If you find LLaVA-OneVision useful for your research, please cite:
```bibtex
@article{li2024llava-onevision,
  title={LLaVA-OneVision: Easy Visual Task Transfer},
  author={Li, Bo and Zhang, Yuanhan and Guo, Dong and Zhang, Renrui and Li, Feng and Zhang, Hao and Zhang, Kaichen and Li, Yanwei and Liu, Ziwei and Li, Chunyuan},
  journal={arXiv preprint arXiv:2408.03326},
  year={2024}
}
```

## Acknowledgments

This work is a collaboration between researchers from ByteDance, NTU, CUHK, and HKUST, building upon the strong foundation of the LLaVA project series.
