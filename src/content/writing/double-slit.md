---
title: 双缝干涉：从相位差到明暗条纹
description: 一个理想化模型，看看波长和缝距如何改变条纹间距。
date: 2026-11-04
kind: notes
tags: [光学, 干涉, 公式示例]
sample: true
---

## 先说明模型

考虑两条间距为 $d$ 的理想窄缝。两缝处入射光同相、振幅相同，观察屏距离为 $L$。在远场、小角度近似下，以屏幕中央为原点，位置 $x$ 处的光程差约为

$$
\Delta r \simeq d\sin\theta \simeq \frac{dx}{L}.
$$

这里忽略了单缝宽度产生的衍射包络。

## 相位差与光强

设波长为 $\lambda$，相位差为

$$
\Delta\varphi=\frac{2\pi}{\lambda}\Delta r.
$$

两束等强相干光叠加后，以中央最大光强 $I_{\max}$ 归一化：

$$
\frac{I(x)}{I_{\max}}=\cos^2\left(\frac{\pi d x}{\lambda L}\right).
$$

### 条纹间距

相邻明纹的间距为

$$
\Delta x=\frac{\lambda L}{d}.
$$

因此，在其他参数不变时：波长越长，条纹越疏；缝距越大，条纹越密。

## 动手试一下

[打开双缝干涉演示 →](/playground/)

演示中的光强和颜色用于可视化这个理想模型，不是实验测量。有限缝宽、光源相干性和探测器响应都不包含在模型中。
