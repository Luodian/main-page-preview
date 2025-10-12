---
title: "LLaVA-OneVision-1.5: Fully Open Framework for Democratized Multimodal Training"
description: "LLaVA-OneVision1.5 introduces a novel family of fully open-source Large Multimodal Models (LMMs) that achieves state-of-the-art performance with substantially lower cost through training on native resolution images."
publishDate: "2025-09-30"
tags: ["research", "vision", "multimodal", "llava", "megatron"]
thumbnail: "/images/blog_thumbnails/llava_ov_1_5.png"
---

<figure>
<p align="center">
  <img src="/images/llava_ov_1_5_images/llava_ov_1_5_performance.png" alt="LLaVA-OneVision-1.5 Performance" loading="lazy" width="90%" loading="lazy" />
</p>
</figure>

**LLaVA-OneVision1.5** introduces a novel family of **fully open-source** Large Multimodal Models (LMMs) that achieves **state-of-the-art performance** with substantially **lower cost** through training on **native resolution** images.

## Key Features

- **Superior Performance**
  A family of fully open-source large multimodal models demonstrating - Superior performance across multiple multimodal benchmarks - outperforming **Qwen2.5-VL** in most evaluation tasks.

- **High-Quality Data at Scale**
  Meticulously curated **pre-training and SFT data** with rigorous filtering and quality control. - Concept-balanced, highly diverse, high-quality caption data - Comprehensive instruction fine-tuning data covering a wide range of tasks

<figure>
<p align="center">
  <img src="/images/llava_ov_1_5_images/llava_ov_1_5_scaling.png" alt="LLaVA-OneVision-1.5 Scaling" loading="lazy" width="95%" loading="lazy" />
</p>
</figure>

- **Ultra-Efficient Training Framework** Complete end-to-end training framework designed for maximum efficiency:
  - USD 16000 total budget for full model training on A100 GPUs (USD 0.6 per GPU/Hour)
  - Built on **MegatronLM** with support for **MoE**, **FP8**, and **long sequence parallelization**
  - Optimized codebase for cost-effective scaling

<figure>
<p align="center">
  <img src="/images/llava_ov_1_5_images/llava_ov_1_5_efficiency.png" alt="LLaVA-OneVision-1.5 Efficiency" loading="lazy" width="90%" loading="lazy" />
</p>
</figure>

- **Fully Open Framework** for community access and reproducibility:
  - High-quality pre-training & SFT data
  - Complete training framework & code
  - Training recipes & configurations
  - Comprehensive training logs & metrics

<figure>
<p align="center">
  <img src="/images/llava_ov_1_5_images/llava_ov_1_5_open_source.png" alt="LLaVA-OneVision-1.5 Open Framework" loading="lazy" width="90%" loading="lazy" />
</p>
</figure>

## Open-Source Resources

We open-source LLaVA-OneVision-1.5 to facilitate future development of LMMs in the community:

### 🚀 [Training Code](https://github.com/EvolvingLMMs-Lab/LLaVA-OneVision-1.5)

Cook a SOTA model with our released training code and reproduction scripts, [click here](https://github.com/EvolvingLMMs-Lab/LLaVA-OneVision-1.5).

### 🤗 [Model Checkpoints](https://huggingface.co/collections/lmms-lab/llava-onevision-15-68d385fe73b50bd22de23713)

## Models

| Model                    | HF Link                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------- |
| LLaVA-OV-1.5-4B-Instruct | [🤗 HF / 4B-Instruct](https://huggingface.co/lmms-lab/LLaVA-OneVision-1.5-4B-Instruct) |
| LLaVA-OV-1.5-8B-Instruct | [🤗 HF / 8B-Instruct](https://huggingface.co/lmms-lab/LLaVA-OneVision-1.5-8B-Instruct) |
| LLaVA-OV-1.5-4B-Base     | [🤗 HF / 4B-Base](https://huggingface.co/lmms-lab/LLaVA-OneVision-1.5-4B-Base)         |
| LLaVA-OV-1.5-8B-Base     | [🤗 HF / 8B-Base](https://huggingface.co/lmms-lab/LLaVA-OneVision-1.5-8B-Base)         |

### 📊 [Training Datasets](https://huggingface.co/collections/lmms-lab/llava-onevision-15-68d385fe73b50bd22de23713)

Explore comprehensive training datasets

| Description                   | Link                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| LLaVA-OV-1.5-Mid-Training-85M | [🤗HF / Mid-Training 85M](https://huggingface.co/datasets/lmms-lab/LLaVA-One-Vision-1.5-Mid-Training-85M) |
| LLaVA-OV-1.5-Instruct         | [🤗HF / Insturct-Data](https://huggingface.co/datasets/lmms-lab/LLaVA-OneVision-1.5-Insturct-Data)        |

### 🔥 [Live Demo](https://huggingface.co/spaces/lmms-lab/LLaVA-OneVision-1.5)

Try LLaVA-OneVision-1.5 directly in your browser, [click here](https://huggingface.co/spaces/lmms-lab/LLaVA-OneVision-1.5)!

## Quick Start with HuggingFace

```python
from transformers import AutoTokenizer, AutoProcessor, AutoModelForCausalLM
from qwen_vl_utils import process_vision_info
model_path = "lmms-lab/LLaVA-One-Vision-1.5-8B-Instruct"

# default: Load the model on the available device(s)
model = AutoModelForCausalLM.from_pretrained(
    model_path, torch_dtype="auto", device_map="auto", trust_remote_code=True
)

# default processor
processor = AutoProcessor.from_pretrained(model_path, trust_remote_code=True)

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "image",
                "image": "https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-VL/assets/demo.jpeg",
            },
            {"type": "text", "text": "Describe this image."},
        ],
    }
]

# Preparation for inference
text = processor.apply_chat_template(
    messages, tokenize=False, add_generation_prompt=True
)
image_inputs, video_inputs = process_vision_info(messages)
inputs = processor(
    text=[text],
    images=image_inputs,
    videos=video_inputs,
    padding=True,
    return_tensors="pt",
)
inputs = inputs.to("cuda")

# Inference: Generation of the output
generated_ids = model.generate(**inputs, max_new_tokens=1024)
generated_ids_trimmed = [
    out_ids[len(in_ids) :] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
]
output_text = processor.batch_decode(
    generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False
)
print(output_text)

```

## Evaluation

```
# pip install git+https://github.com/EvolvingLMMs-Lab/lmms-eval.git

accelerate launch --num_processes=8 --main_process_port 12399 -m lmms_eval \
    --model=llava_onevision1_5 \
    --model_args=pretrained=lmms-lab/LLaVA-OneVision-1.5-8B-Instruct,attn_implementation=flash_attention_2,max_pixels=3240000 \
    --tasks=mmmu_val,mmmu_pro_standard,mmbench_en_test,mmerealworld,mmerealworld_cn,ai2d,ai2d_no_mask,vstar_bench,chartqa,charxiv,docvqa_test,mathvista_testmini,mmstar,scienceqa \
    --batch_size=1
```

## Citation

If you find LLaVA-OneVision useful for your research, please cite:

```bibtex
@inproceedings{LLaVA-OneVision-1.5,
  title={LLaVA-OneVision-1.5: Fully Open Framework for Democratized Multimodal Training},
  author={An, Xiang and Xie, Yin and Yang, Kaicheng and Zhang, Wenkang and Zhao, Xiuwei and Cheng, Zheng and Wang, Yirui and Xu, Songcen and Chen, Changrui and Wu, Chunsheng and Tan, Huajie and Li, Chunyuan and Yang, Jing and Yu, Jie and Wang, Xiyao and Qin, Bin and Wang, Yumeng and Yan, Zizhen and Feng, Ziyong and Liu, Ziwei and Li, Bo and Deng, Jiankang},
  booktitle={arxiv},
  year={2025}
 }

@article{lillava,
  title={LLaVA-OneVision: Easy Visual Task Transfer},
  author={Li, Bo and Zhang, Yuanhan and Guo, Dong and Zhang, Renrui and Li, Feng and Zhang, Hao and Zhang, Kaichen and Zhang, Peiyuan and Li, Yanwei and Liu, Ziwei and Li, Chunyuan},
  journal={Transactions on Machine Learning Research}
  year={2024}
}
```
