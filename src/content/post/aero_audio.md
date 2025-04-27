---
title: "Aero Audio"
description: "Aero is a compact audio model capable of handling a range of audio tasks, including speech recognition, audio understanding, and audio instructions following."
publishDate: "2025-05-01"
tags: ["audio"]
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
    <td class="tg-c3ow">3.3</td>
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
    <td class="tg-c3ow">2.8</td>
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
    <td class="tg-c3ow">Assembly.AI/Assembly_Best</td>
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
    <td class="tg-c3ow">1.8</td>
    <td class="tg-c3ow">3.4</td>
    <td class="tg-c3ow">2.35</td>
    <td class="tg-c3ow">3.11</td>
    <td class="tg-c3ow">5.97</td>
  </tr>
  <tr>
    <td class="tg-c3ow">Microsoft/Phi-4-Multimodal</td>
    <td class="tg-c3ow">4B+1.6B</td>
    <td class="tg-c3ow">11.45</td>
    <td class="tg-c3ow">10.5</td>
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


## Why Use Font Subsetting?

Font files often contain thousands of glyphs, including symbols and characters for multiple languages. Subsetting removes unnecessary glyphs, reducing file size and improving website performance. This is particularly useful when only a specific language set or symbols are needed.

For example, I encountered an issue when using the SF Pro Rounded font with the Satori library for generating OG images, as described in this post: [Example OG Social Image](posts/social-image/). When using multiple font variants, the project failed to build due to memory overflow errors. Increasing the memory limit did not help. Moreover, using even a single font file larger than ~3.5MB is considered bad practice, let alone multiple variants at the same time.

After subsetting the font, I ended up with two subsets, both containing **only Latin characters**: one slightly over 100KB and another around 355KB. This significantly reduced the overall font size while keeping the necessary glyphs.

## Creating a Font Subset with Transfonter

Let's take **SF Pro Rounded**, a multilingual font, and divide it into two subsets:

- **Basic subset**: Includes Latin characters and essential symbols.
- **Extended subset**: Includes additional glyphs beyond the basic set.

### Upload the Font
1. Go to [Transfonter](https://transfonter.org/).
2. Click **Add Fonts** and select the **SF Pro Rounded Regular** font file (TTF or OTF format).

### Define Unicode Ranges
For subsetting, use the following ranges:

#### Basic Subset

transfonter.org latin + essential symbols unicode-range:
```
0000-007F, 00A0-024F, 2190-22FF, 2934-2937, F6D5-F6D8
```

#### Extended Subset

transfonter.org additional glyphs unicode-range:
```
0080-00A0, 0250-218F, 2300-FFFF
```

:::tip
You can find out the character codes and view the glyph tables of a font using built-in system tools:
- Windows: Use Character Map (charmap). Open the Start menu, search for "Character Map," and select a font to see its glyphs and Unicode codes.
- macOS: Open Font Book, select a font, and switch to "Repertoire" mode to see all available characters along with their codes.
- Linux: Use gucharmap (GNOME Character Map) or kcharselect (for KDE) to browse Unicode symbols in installed fonts.
:::

### Generate the Font Files
1. Check the **Subset** box in Transfonter.
2. Enter the Unicode ranges above for each subset.
3. Click **Convert** to generate the optimized font files.
4. Download the converted fonts.

:::tip
Additionally, when using Transfonter, you can upload and convert multiple fonts at the same time. The tool allows batch processing, and after conversion, all optimized fonts can be downloaded as a ZIP archive, making it easier to manage multiple font files efficiently.
:::

### Implement in CSS
Once the fonts are ready, use `@font-face` to load them efficiently:

```css
@font-face {
  font-family: "SFProRounded";
  src: url("/fonts/SF-Pro-Rounded-Regular-Basic.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "SFProRounded";
  src: url("/fonts/SF-Pro-Rounded-Regular-Extended.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
```

### Test the Fonts
Ensure the fonts load correctly by inspecting network requests in the browser's developer tools. Verify that only necessary subsets are downloaded.

## Conclusion
Using Transfonter for font subsetting helps optimize web performance by reducing font file sizes while keeping necessary glyphs. Try it out with your fonts to enhance your website's loading speed!