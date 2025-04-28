---
title: "Aero-1-Audio"
description: "Aero-1-Audio is a compact audio model capable of handling a range of audio tasks, including speech recognition, audio understanding, and audio instructions following."
publishDate: "2025-05-01"
tags: ["audio", "models"]
---

## What is Aero Audio?

`Aero` is a compact audio model capable of handling a range of audio tasks, including speech recognition, audio understanding, and audio instructions following. Built on the Qwen2.5-1.5B base language model, Aero achieves strong performance across multiple audio benchmarks while maintaining an efficient parameter size.
Although models like Qwen2-Audio and Kimi-Audio represent early explorations into audio modeling, the development of tiny audio models for practical applications remains in its early stages. In this work, we take a small step toward advancing the field by proposing an efficient training recipe for audio tasks, which can be completed within one day using 16 H100 GPUs. As audio modalities become increasingly important in AI systems, the demand for both efficient and high-performing models continues to grow. While models such as Whisper have achieved impressive results on several tasks, there remains a need for models that can perform deeper audio understanding and reasoning across a broader range of tasks.

Therefore, we are excited to release the first version of Aero-audio!

## ASR & Audio Understanding Performance

[![ASR-Understanding-Compare.png](https://i.postimg.cc/vHtJmSq9/ASR-Understanding-Compare.png)](https://postimg.cc/ZC077jhK)
[![ASR-Detail.png](https://i.postimg.cc/cL55gqQK/ASR-Detail.png)](https://postimg.cc/TKgcF4NG)

Our model achieves a balance between performance and parameter efficiency. We evaluate it across multiple ASR and audio understanding benchmarks. On ASR tasks, our model attains the lowest WER scores on datasets such as AMI, LibriSpeech, and SPGISpeech. It also demonstrates strong audio understanding capabilities on various comprehension benchmarks. As illustrated in the plotted graph, our model falls within the highlighted triangular region that represents an optimal trade-off between parameter efficiency and performance.

## Data Distribution

[![Data-distribution.png](https://i.postimg.cc/MZbP0f7J/Data-distribution.png)](https://postimg.cc/c6CB0HkF)
[![training-time.png](https://i.postimg.cc/Hn26TFYk/training-time.png)](https://postimg.cc/XBrf8HBR)

*The hours of some training datasets are estimated and may not be fully accurate
One of the key strengths of our training recipe lies in the quality and quantity of our data. Our training dataset consists of approximately 5 billion tokens, corresponding to around 50,000 hours of audio. Compared to models such as Qwen-Omni and Phi-4, our dataset is over 100 times smaller, yet our model achieves competitive performance. All data is sourced from publicly available open-source datasets, highlighting the sample efficiency of our training approach. A detailed breakdown of our data distribution is provided below, along with comparisons to other models.


## What's insightful
In this release, our primary focus is on developing an audio model capable of handling multiple audio tasks. The following examples showcase its core abilities across tasks such as audio understanding and speech recognition. Most notably, we highlight the model's capability to perform long-form ASR, as demonstrated in the example below.

### Long ASR

<div style="text-align: center;">
 <iframe width="780" height="415"
 src="https://www.youtube.com/embed/uYyoEB6Xu58">
 </iframe>
</div>

A common approach for current long-form ASR tasks is to split the audio into smaller, processable chunks and perform ASR on each segment individually. However, with the advancement of large language models (LLMs), long-context understanding has become increasingly important. We argue that a model's ability to process long audio sequences continuously is essential for effective audio understanding and should be considered a critical capability. To demonstrate this, we set up a simple use case using examples from an NVIDIA conference and calculate the WER with respect to the auto-generated YouTube subtitles.

[![Long-ASR-eval.png](https://i.postimg.cc/w3Y9dyBp/Long-ASR-eval.png)](https://postimg.cc/301sXwpS)


#### Model's Output

<ins>**Qwen Omni (12 minutes chunk)**</ins>

When processing the audio in 12-minute chunks, Qwen-Omni failed to recognize the full speech content and was only able to capture portions of the audio.

```
that's like what's going on why does itfocused on um ai and parallel parallelizable workloads but it's still general to an extent it's not as use case specific as something like grock with a queue that's really designed to you know spit out tokens as fast as possible and that like is a goldilocks zone where it's flexible enough to handle different workloads but not um but still much faster than um a traditional cpu and that google is one of the only companies that has a scaled internal custom silicon effort
```

<ins>**Phi-4-Multimodal (full chunk)**</ins>

When processing the full audio without splitting, the Phi-4-Multimodal model began to ignore the instructions and instead generated an overall summary of the audio.

```
The conversation covered Nvidia's focus on inference over training, the partnership with GM, the release of GUT-N1 for humanoid robotics, and the impact of China's AI initiatives on global chip demand.
```

<ins>**Aero (full chunk)**</ins>

Aero Audio is able to generate the complete ASR output and accurately identify the full transcript.

```
Welcome to the brainstorm episode eighty two frank downing joining us recap of nvidia's gtc conference that is the gpu technology conference frank what happened what were the big takeaways i on my side i saw a gm and in video partnering but we can circle back to that what was 

...

right nice timing good timing all right we'll see everyone next week see everyone thank you
```

#### Results on LibriSpeech Unchunked

In the previous release, LibriSpeech split their audio files into smaller chunks and calculated the overall Word Error Rate (WER) based on these segmented samples. However, as we observed, it is straightforward to concatenate the chunks back into their original form, thereby creating a simple long-form Audio Speech Recognition benchmark. We evaluated various models on these benchmarks and found that their performance generally declined compared to their results on shorter samples. Among the models tested, our model achieved the best performance, showing the smallest drop in accuracy relative to the chunked version.

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg"><thead>
  <tr>
    <th class="tg-0pky"></th>
    <th class="tg-c3ow">LS.Clean</th>
    <th class="tg-c3ow">LS.Other</th>
    <th class="tg-c3ow">LS.Clean(Long)</th>
    <th class="tg-c3ow">LS.Other(Long)</th>
    <th class="tg-c3ow">Avg Diff</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-0pky">Phi-4</td>
    <td class="tg-c3ow">1.68</td>
    <td class="tg-c3ow">3.83</td>
    <td class="tg-c3ow">11.51</td>
    <td class="tg-c3ow">24.72</td>
    <td class="tg-c3ow">30.72</td>
  </tr>
  <tr>
    <td class="tg-0pky">Qwen2-Audio-Instruct</td>
    <td class="tg-c3ow">3.59</td>
    <td class="tg-c3ow">7.46</td>
    <td class="tg-c3ow">93.01</td>
    <td class="tg-c3ow">93.63</td>
    <td class="tg-c3ow">175.59</td>
  </tr>
  <tr>
    <td class="tg-0pky">Qwen2.5-Omni</td>
    <td class="tg-c3ow">1.80</td>
    <td class="tg-c3ow">3.40</td>
    <td class="tg-c3ow">13.03</td>
    <td class="tg-c3ow">13.29</td>
    <td class="tg-c3ow">21.12</td>
  </tr>
  <tr>
    <td class="tg-0pky">Aero-1-Audio</td>
    <td class="tg-c3ow">1.49</td>
    <td class="tg-c3ow">3.17</td>
    <td class="tg-c3ow">5.31</td>
    <td class="tg-c3ow">11.71</td>
    <td class="tg-c3ow">12.36</td>
  </tr>
</tbody></table>


## Evaluation Result

### ASR Benchmarks
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
</style>
<table class="tg"><thead>
  <tr>
    <th class="tg-c3ow">Model</th>
    <th class="tg-c3ow" style="width: 20px;">Parameters</th>
    <th class="tg-c3ow" colspan="6">Automatic Speech Recognition</th>
    <th class="tg-c3ow">Average</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow"></td>
    <td class="tg-c3ow">AMI</td>
    <td class="tg-c3ow">Earnings22</td>
    <td class="tg-c3ow">LibriSpeech<br>Clean</td>
    <td class="tg-c3ow">LibriSpeech<br>Other</td>
    <td class="tg-c3ow">SPGispeech</td>
    <td class="tg-c3ow">Tedlium</td>
    <td class="tg-c3ow"></td>
  </tr>
  <tr>
    <td class="tg-c3ow">ElevenLabs/Scribe</td>
    <td class="tg-c3ow">N/A</td>
    <td class="tg-c3ow">14.43</td>
    <td class="tg-c3ow">12.14</td>
    <td class="tg-c3ow">1.79</td>
    <td class="tg-c3ow">3.31</td>
    <td class="tg-c3ow">3.30</td>
    <td class="tg-c3ow">3.17</td>
    <td class="tg-c3ow">6.36</td>
  </tr>
  <tr>
    <td class="tg-c3ow">REV.AI/Fusion</td>
    <td class="tg-c3ow">N/A</td>
    <td class="tg-c3ow">10.93</td>
    <td class="tg-c3ow">12.09</td>
    <td class="tg-c3ow">2.88</td>
    <td class="tg-c3ow">6.23</td>
    <td class="tg-c3ow">4.05</td>
    <td class="tg-c3ow">2.80</td>
    <td class="tg-c3ow">6.50</td>
  </tr>
  <tr>
    <td class="tg-c3ow">OpenAI/Whisper-large-v3</td>
    <td class="tg-c3ow">1.5B</td>
    <td class="tg-c3ow">15.95</td>
    <td class="tg-c3ow">11.29</td>
    <td class="tg-c3ow">2.01</td>
    <td class="tg-c3ow">3.91</td>
    <td class="tg-c3ow">2.94</td>
    <td class="tg-c3ow">3.86</td>
    <td class="tg-c3ow">6.66</td>
  </tr>
  <tr>
    <td class="tg-c3ow">Assembly.AI/AssemblyBest</td>
    <td class="tg-c3ow">N/A</td>
    <td class="tg-c3ow">15.64</td>
    <td class="tg-c3ow">13.54</td>
    <td class="tg-c3ow">1.74</td>
    <td class="tg-c3ow">3.11</td>
    <td class="tg-c3ow">1.81</td>
    <td class="tg-c3ow">3.43</td>
    <td class="tg-c3ow">6.55</td>
  </tr>
  <tr>
    <td class="tg-c3ow">Alibaba/Qwen2.5-Omni</td>
    <td class="tg-c3ow">7B</td>
    <td class="tg-c3ow">12.41</td>
    <td class="tg-c3ow">12.74</td>
    <td class="tg-c3ow">1.80</td>
    <td class="tg-c3ow">3.40</td>
    <td class="tg-c3ow">2.35</td>
    <td class="tg-c3ow">3.11</td>
    <td class="tg-c3ow">5.97</td>
  </tr>
  <tr>
    <td class="tg-c3ow">Microsoft/Phi-4-Multimodal</td>
    <td class="tg-c3ow">4B+1.6B</td>
    <td class="tg-c3ow">11.45</td>
    <td class="tg-c3ow">10.50</td>
    <td class="tg-c3ow">1.67</td>
    <td class="tg-c3ow">3.82</td>
    <td class="tg-c3ow">3.11</td>
    <td class="tg-c3ow">2.89</td>
    <td class="tg-c3ow">5.57</td>
  </tr>
  <tr>
    <td class="tg-c3ow"><a href="https://huggingface.co/LMMs-Lab/Aero-1-Audio">LMMs-Lab/Aero-1-Audio</a></td>
    <td class="tg-c3ow">1.5B</td>
    <td class="tg-c3ow">10.53</td>
    <td class="tg-c3ow">13.79</td>
    <td class="tg-c3ow">1.49</td>
    <td class="tg-c3ow">3.17</td>
    <td class="tg-c3ow">1.97</td>
    <td class="tg-c3ow">2.87</td>
    <td class="tg-c3ow">5.64</td>
  </tr>
</tbody></table>

### Audio Understanding Result

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0pky{border-color:inherit;text-align:center;vertical-align:top}
</style>
<table class="tg"><thead>
  <tr>
    <th class="tg-0pky">Model</th>
    <th class="tg-0pky" style="width: 20px;">Parameters</th>
    <th class="tg-0pky" colspan="6">Speech Analysis and Understanding</th>
    <th class="tg-0pky" colspan="2">Speech Instruction</th>
    <th class="tg-0pky" colspan="3">Audio Scene Understanding</th>
    <th class="tg-0pky">Average</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-0pky"></td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky" colspan="5">AIR-Chat</td>
    <td class="tg-0pky">MMAU</td>
    <td class="tg-0pky">OpenHermes</td>
    <td class="tg-0pky">Alpaca Audio</td>
    <td class="tg-0pky" colspan="3">AIR-Foundation</td>
    <td class="tg-0pky"></td>
  </tr>
  <tr>
    <td class="tg-0pky"></td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">Speech</td>
    <td class="tg-0pky">Sound</td>
    <td class="tg-0pky">Music</td>
    <td class="tg-0pky">Mix</td>
    <td class="tg-0pky">Avg</td>
    <td class="tg-0pky">testmini</td>
    <td class="tg-0pky">test</td>
    <td class="tg-0pky">test</td>
    <td class="tg-0pky">Speech</td>
    <td class="tg-0pky">Sound</td>
    <td class="tg-0pky">Music</td>
    <td class="tg-0pky"></td>
  </tr>
  <tr>
    <td class="tg-0pky">Alibaba/Qwen2-Audio-Instruct</td>
    <td class="tg-0pky">7B</td>
    <td class="tg-0pky">7.2</td>
    <td class="tg-0pky">7.0</td>
    <td class="tg-0pky">6.8</td>
    <td class="tg-0pky">6.8</td>
    <td class="tg-0pky">6.9</td>
    <td class="tg-0pky">49.2</td>
    <td class="tg-0pky">46.8</td>
    <td class="tg-0pky">49.2</td>
    <td class="tg-0pky">62.9</td>
    <td class="tg-0pky">55.4</td>
    <td class="tg-0pky">56.8</td>
    <td class="tg-0pky">56.7</td>
  </tr>
  <tr>
    <td class="tg-0pky">Alibaba/Qwen2.5-Omni</td>
    <td class="tg-0pky">7B</td>
    <td class="tg-0pky">6.8</td>
    <td class="tg-0pky">5.7</td>
    <td class="tg-0pky">4.8</td>
    <td class="tg-0pky">5.4</td>
    <td class="tg-0pky">5.7</td>
    <td class="tg-0pky">65.6</td>
    <td class="tg-0pky">57.2</td>
    <td class="tg-0pky">57.4</td>
    <td class="tg-0pky">67.2</td>
    <td class="tg-0pky">76.3</td>
    <td class="tg-0pky">63.0</td>
    <td class="tg-0pky">64.4</td>
  </tr>
  <tr>
    <td class="tg-0pky">Microsoft/Phi-4-Multimodal</td>
    <td class="tg-0pky">4B+1.6B</td>
    <td class="tg-0pky">7.5</td>
    <td class="tg-0pky">7.0</td>
    <td class="tg-0pky">6.7</td>
    <td class="tg-0pky">6.8</td>
    <td class="tg-0pky">7.0</td>
    <td class="tg-0pky">65.0</td>
    <td class="tg-0pky">57.8</td>
    <td class="tg-0pky">62.6</td>
    <td class="tg-0pky">48.3</td>
    <td class="tg-0pky">40.6</td>
    <td class="tg-0pky">35.5</td>
    <td class="tg-0pky">52.8</td>
  </tr>
  <tr>
    <td class="tg-0pky">Tencent/Ola</td>
    <td class="tg-0pky">7B</td>
    <td class="tg-0pky">7.3</td>
    <td class="tg-0pky">6.4</td>
    <td class="tg-0pky">5.9</td>
    <td class="tg-0pky">6.0</td>
    <td class="tg-0pky">6.4</td>
    <td class="tg-0pky">70.3</td>
    <td class="tg-0pky">62.6</td>
    <td class="tg-0pky">62.8</td>
    <td class="tg-0pky">58.8</td>
    <td class="tg-0pky">70.4</td>
    <td class="tg-0pky">53.1</td>
    <td class="tg-0pky">63.2</td>
  </tr>
  <tr>
    <td class="tg-0pky">Tencent/Vita 1.5</td>
    <td class="tg-0pky">7B</td>
    <td class="tg-0pky">4.8</td>
    <td class="tg-0pky">5.5</td>
    <td class="tg-0pky">4.9</td>
    <td class="tg-0pky">2.9</td>
    <td class="tg-0pky">4.5</td>
    <td class="tg-0pky">35.5</td>
    <td class="tg-0pky">9.6</td>
    <td class="tg-0pky">7.0</td>
    <td class="tg-0pky">31.5</td>
    <td class="tg-0pky">24.1</td>
    <td class="tg-0pky">25.5</td>
    <td class="tg-0pky">28.6</td>
  </tr>
  <tr>
    <td class="tg-0pky">InspirAI/Mini-Omni2</td>
    <td class="tg-0pky">0.5B</td>
    <td class="tg-0pky">3.6</td>
    <td class="tg-0pky">3.5</td>
    <td class="tg-0pky">2.6</td>
    <td class="tg-0pky">3.1</td>
    <td class="tg-0pky">3.2</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">-</td>
  </tr>
  <tr>
    <td class="tg-0pky"><a href="https://huggingface.co/lmms-lab/Aero-1-Audio-1.5B">LMMs-Lab/Aero-1-Audio</a></td>
    <td class="tg-0pky">1.5B</td>
    <td class="tg-0pky">5.7</td>
    <td class="tg-0pky">5.3</td>
    <td class="tg-0pky">4.7</td>
    <td class="tg-0pky">5.8</td>
    <td class="tg-0pky">5.4</td>
    <td class="tg-0pky">59.4</td>
    <td class="tg-0pky">40.0</td>
    <td class="tg-0pky">45.4</td>
    <td class="tg-0pky">48.0</td>
    <td class="tg-0pky">57.6</td>
    <td class="tg-0pky">44.2</td>
    <td class="tg-0pky">50.5</td>
  </tr>
</tbody></table>


## Training Techniques

### Dynamic Batch Size
We implemented a dynamic batching strategy based on the estimated token length to control the batch size per device. In many cases, using a fixed batch size requires setting it conservatively small to avoid out-of-memory (OOM) errors on longer samples, which leads to underutilization of computing resources. To address this, we group samples into batches such that the total token length stays within a predefined threshold, thereby minimizing computational waste and improving efficiency.

### Sequence Packing
To further optimize dynamic batching, we implemented sequence packing for both the audio encoder and the language model, enabling larger batch sizes and faster training. This operation was then fused with the Liger kernel to achieve even higher throughput and lower memory usage. With a fixed packing length of 4096 to regulate the dynamic batch size, the average Model FLOP Utilization (MFU) was limited to 0.03. However, with sequence packing enabled, the average MFU increased to approximately 0.34, demonstrating a significant improvement in training efficiency.

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
</style>
<table class="tg"><thead>
  <tr>
    <th class="tg-c3ow">Packing Length</th>
    <th class="tg-c3ow">Sequence Packing</th>
    <th class="tg-c3ow">Num GPUs</th>
    <th class="tg-c3ow">Avg MFU</th>
    <th class="tg-c3ow">Zero</th>
    <th class="tg-c3ow">OOM</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-c3ow">4096</td>
    <td class="tg-c3ow">FALSE</td>
    <td class="tg-c3ow">64</td>
    <td class="tg-c3ow">0.03</td>
    <td class="tg-c3ow">2</td>
    <td class="tg-c3ow">No</td>
  </tr>
  <tr>
    <td class="tg-c3ow">32768</td>
    <td class="tg-c3ow">FALSE</td>
    <td class="tg-c3ow">64</td>
    <td class="tg-c3ow">NA</td>
    <td class="tg-c3ow">2</td>
    <td class="tg-c3ow">Yes</td>
  </tr>
  <tr>
    <td class="tg-c3ow">32768</td>
    <td class="tg-c3ow">TRUE</td>
    <td class="tg-c3ow">32</td>
    <td class="tg-c3ow">0.34</td>
    <td class="tg-c3ow">2</td>
    <td class="tg-c3ow">No</td>
  </tr>
</tbody>
</table>

