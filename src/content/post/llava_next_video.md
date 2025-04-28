---
title: "LLaVA Video"
description: "Video Instruction Tuning With Synthetic Data"
publishDate: "2024-09-30"
tags: ["vision", "models", "research"]
---

The development of video large multimodal models (LMMs) has been hindered by the difficulty of curating large amounts of high-quality raw data from the web. To address this, we consider an alternative approach, creating a high-quality synthetic dataset specifically for video instruction-following, namely LLaVA-Video-178K. This dataset includes key tasks such as detailed captioning, open-ended question-answering (QA), and multiple-choice QA. By training on this proposed dataset, in combination with existing visual instruction tuning data, we introduce LLaVA-Video, a new video LMM. Our experiments demonstrate that LLaVA-Video achieves strong performance across various video benchmarks, highlighting the effectiveness of our dataset. We plan to release the dataset, its generation pipeline, and the model checkpoints.

## Video Instruction-Following Data Synthesis
A high-quality dataset for video instruction-tuning is crucial for developing effective video-language models. We identify a key factor in building such datasets: ensuring richness and diversity in both video content and its language annotations. We perform comprehensive survey on the existing video benchmarks, covering across various public video captioning and question-answering datasets, then identify ten unique video sources that contribute to over 40 video-language benchmarks. From each source, we select videos that exhibit significant temporal dynamics. To maintain diversity in the annotations, we establish a pipeline capable of generating detailed captions for videos of any length. Additionally, we define 16 types of questions that guide GPT-4o in creating question-answer pairs to assess the perceptual and reasoning skills of the video-language models.

## Video Sources
We noticed that although different video-language datasets focus on various video understanding tasks , most are sourced from ten main video sources, which offer a wide range of video data from different websites, viewpoints, and domains. The relationship between these ten selected video datasets and others is shown in figure below. We select the dynamic video from these source, we detail the video selection logic in the paper.

## Automated Generation for Video Detail Description
For selected videos, we use GPT-4o to systematically describe their content. We start by sampling video frames at one frame per second (fps). However, due to the input size constraints of GPT-4o, we cannot use all sampled frames. Instead, we describe the videos sequentially, as shown in figure below. We create descriptions at three distinct levels, detailed below.

## Automated Generation for Video Question Answering
In addition to detailed video descriptions, our dataset includes a variety of question-answer pairs designed for complex interactions. This setup improves the video understanding model's ability to handle real-life queries. We refer to public video question-answering benchmarks to organize these questions into 16 specific categories, as shown in Figure 3. Given a detailed video description, we use GPT-4o to generate at most one question-answer pair for each type of question. Please refer to the paper for more details of the question types and the generation process.

## Dataset Statistics
We carefully select from our collected data sources to form a balanced and comprehensive collection, resulting in a total of 178K videos and 1.3M instruction-following samples. This includes 178K captions, 960K open-ended QAs, and 196K multiple-choice QAs.

## Dataset Comparison
We provide a comparison of high-quality instruction-following video-language datasets, with a focus on synthetic data created with strong AI models, as shown in Table 1.

A broad collection of dynamic videos. In terms of video sources, although LLaVA-Hound contains the largest number of videos, 44% of its video data are sourced from WebVid, where most videos are static. ShareGPT4Video includes 30% of its videos from Pexels, ,Pixabay, and Mixkit, which are aesthetically good but also mostly static. Additionally, the majority of its videos come from Panda-70M, which are short clips from longer videos, suggesting simpler plots. In contrast, we carefully select video sources that offer dynamic, untrimmed videos with complex plots, which are crucial for developing a powerful video understanding model.
High frames per second. Regarding frame sampling in language annotations, the proposed dataset considers 1 FPS, while other datasets consider much lower FPS. LLaVA-Hound uniformly samples 10 frames from videos of any length. The average FPS is 0.008, which may miss some fine details. ShareGPT4Video picks key frames using CLIP based on frame uniqueness. This method might also miss subtle changes in the video because CLIP embeddings do not capture fine-grained dynamics well. Our method samples FPS=1 without using key frame selection algorithms, ensuring that detailed temporal information can be expressed in annotations with high coverage.
Diverse tasks. The proposed dataset considers three common task types, including caption, free-form, and closed-form QA, while existing datasets only consider a subset. Meanwhile, the quality and number of samples in our dataset is higher.


