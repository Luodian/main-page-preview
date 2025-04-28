---
title: "Aero-Audio"
publishDate: "20 April 2025"
description: "LMMs-Lab Documentation for model usage"
seriesId: lmms-lab-docs
orderInSeries: 1
featured: false
tags: ["lmms-lab-models"]
ogImage: ""
---

This guide helps you quickly start using models from lmms-lab. We provide examples of Hugging Face Transformers and vLLM for deployment.

You can find all the models at Hugging Face Hub

## Aero

### Huggingface

To get a quick start with Aero, we advise you to try with the inference with transformers first. We advise you to use Python 3.10 or higher, and PyTorch 2.3 or higher.

The following is a quick start using transformers

```python
from transformers import AutoProcessor, AutoModelForCausalLM

import torch
import librosa

def load_audio():
    return librosa.load(librosa.ex("libri1"), sr=16000)[0]


processor = AutoProcessor.from_pretrained("lmms-lab/Aero-1-Audio-1.5B", trust_remote_code=True)
# We encourage to use flash attention 2 for better performance
# Please install it with `pip install --no-build-isolation flash-attn`
# If you do not want flash attn, please use sdpa or eager`
model = AutoModelForCausalLM.from_pretrained("lmms-lab/Aero-1-Audio-1.5B", device_map="cuda", torch_dtype="auto", attn_implementation="flash_attention_2", trust_remote_code=True)
model.eval()

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "audio_url",
                "audio": "placeholder",
            },
            {
                "type": "text",
                "text": "Please transcribe the audio",
            }
        ]
    }
]

audios = [load_audio()]

prompt = processor.apply_chat_template(messages, add_generation_prompt=True)
inputs = processor(text=prompt, audios=audios, sampling_rate=16000, return_tensors="pt")
inputs = {k: v.to("cuda") for k, v in inputs.items()}
outputs = model.generate(**inputs, eos_token_id=151645, max_new_tokens=4096)

cont = outputs[:, inputs["input_ids"].shape[-1] :]

print(processor.batch_decode(cont, skip_special_tokens=True)[0])
```

It is also supported batch inference with transformers, here is a simple example:

```python
from transformers import AutoProcessor, AutoModelForCausalLM

import torch
import librosa

def load_audio():
    return librosa.load(librosa.ex("libri1"), sr=16000)[0]

def load_audio_2():
    return librosa.load(librosa.ex("libri2"), sr=16000)[0]


processor = AutoProcessor.from_pretrained("lmms-lab/Aero-1-Audio-1.5B", trust_remote_code=True)
# We encourage to use flash attention 2 for better performance
# Please install it with `pip install --no-build-isolation flash-attn`
# If you do not want flash attn, please use sdpa or eager`
model = AutoModelForCausalLM.from_pretrained("lmms-lab/Aero-1-Audio-1.5B", device_map="cuda", torch_dtype="auto", attn_implementation="flash_attention_2", trust_remote_code=True)
model.eval()

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "audio_url",
                "audio": "placeholder",
            },
            {
                "type": "text",
                "text": "Please transcribe the audio",
            }
        ]
    }
]
messages = [messages, messages]

audios = [load_audio(), load_audio_2()]

processor.tokenizer.padding_side="left"
prompt = processor.apply_chat_template(messages, add_generation_prompt=True)
inputs = processor(text=prompt, audios=audios, sampling_rate=16000, return_tensors="pt", padding=True)
inputs = {k: v.to("cuda") for k, v in inputs.items()}
outputs = model.generate(**inputs, eos_token_id=151645, pad_token_id=151643, max_new_tokens=4096)

cont = outputs[:, inputs["input_ids"].shape[-1] :]

print(processor.batch_decode(cont, skip_special_tokens=True))
```

### vLLM

To deploy using vllm, you can install vllm with this script

```bash
VLLM_USE_PRECOMPILED=1 python3 -m pip install vllm@git+https://github.com/kcz358/vllm@dev/aero

python3 -m pip install hf_transfer
python3 -m pip install decord librosa
```

#### [Optional]

If you encountered some error related to the transformers `LazyConfigMapping`, you can install transformers from here

```bash
python3 -m pip install transformers@git+https://github.com/kcz358/transformers@vllm/stable
```

Then you can run

```bash
vllm serve lmms-lab/Aero-1-Audio-1.5B --trust-remote-code
```

to serve the model

