---
title: "Multimodal-SAE"
description: "Large Multi-modal Models Can Interpret Features in Large Multi-modal Models"
publishDate: "2024-11-15"
tags: ["vision", "models", "mech-interp"]
---

![Banner](https://github.com/EvolvingLMMs-Lab/multimodal-sae/blob/main/assets/banner.png?raw=true)

For the first time in the multimodal domain, we demonstrate that features learned by Sparse Autoencoders (SAEs) in a smaller Large Multimodal Model (LMM) can be effectively interpreted by a larger LMM. Our work introduces the use of SAEs to analyze the open-semantic features of LMMs, providing the solution for feature interpretation across various model scales.

This research is inspired by Anthropic's remarkable work on applying SAEs to interpret features in large-scale language models. In multimdoal models, we discovered intriguing features that correlate with diverse semantics and can be leveraged to steer model behavior, enabling more precise control and understanding of LMM functionality.

The Sparse Autoencoder (SAE) is trained on LLaVA-NeXT data by integrating it into a specific layer of the model, with all other components frozen. The features learned by the SAE are subsequently interpreted through the proposed auto-explanation pipeline, which analyzes the visual features based on their activation regions.

![Steer](https://github.com/EvolvingLMMs-Lab/multimodal-sae/blob/main/assets/steer.png?raw=true)

These features can then be used to steer model's behavior to output desire output. You can check our papers for more details.
