---
title: "Problem with Current ASR Benchmark"
publishDate: "15 April 2025"
description: "An example post for Astro Citrus, detailing how to add a custom social image card in the frontmatter"
tags: ["audio models", "benchmark", "wer"]
ogImage: "/social-card.png"
---

<!-- ## Adding your own social image to a post

This post is an example of how to add a custom [open graph](https://ogp.me/) social image, also known as an OG image, to a blog post.
By adding the optional ogImage property to the frontmatter of a post, you opt out of [satori](https://github.com/vercel/satori) automatically generating an image for this page.

If you open this markdown file `src/content/post/social-image.md` you'll see the ogImage property set to an image which lives in the public folder[^1].

```yaml
ogImage: "/social-card.png"
```

You can view the one set for this template page [here](http://astrocitrus.artemkutsan.pp.ua/social-card.png).

[^1]: The image itself can be located anywhere you like. -->

# Problem with Current ASR Benchmark

## Metric may not be fair enough
The calculation of Wer(Word Error Rate) focuses strictly on the format of the words. This makes the calculation of the result highly dependent on the Ground Truth.

## Examples
This content is only supported in a Lark Docs

### Sample Model Predict
2009.This represents the biggest such contraction since the Second World War brought on by the collapse in global demand. Keeping international trade flowing is vital for the EU and other exports oriented countries. Despite commitments made by the G20, trade restrictive and destructive measures in response to the crisis have increased within the G20 as well as globally.

#### Ground Truth
two thousand and nine this represents the biggest such contraction since the second world war brought on by the collapse in global demand. keeping international trade flowing is vital for the eu and other exports oriented countries. despite commitments made by the g twenty trade restrictive and distortive measures in response to the crisis have increased within the g twenty as well as globally.

In the above example, the model output 2009 and G20, which is a more readable way. In the ground truth, the transcript displays these two terms as two thousand and nine and g twenty.

#### Wrong Case
This content is only supported in a Lark Docs

#### Ground Truth
trade. already we have in place strict rules on ivory trade in the european union imports of ivory into the eu and exports from the eu have been banned since one thousand nine hundred and seventy five in respect of asian elephants and since one thousand nine hundred and ninety in respect of african elephants. for ivory items that have been in europe for a long time domestic trade is strictly regulated with a system of certificates and demonstration of legal origin by traders. the rules were tightened further in may two thousand and seventeen with the adoption of a specific commission guidance document. since then the export of old raw ivory from the eu has no longer been possible. eu member states have unanimously supported this additional tightening of the rules and are following the guidance very closely thereby ensuring uniform application of the rules. with this measure the risk that ivory exported from europe could fuel the demand in destination markets and indirectly also the poaching in africa has been significantly reduced. but we did not stop there. towards the


#### Too short Case
In many benchmarks, they contain data samples that are very short and lack context to interpret meanings. Overfit on these short samples would be very meaningless and does not seem to be a useful case in real-life and would be unnecessary to include in real-life scenarios. 
