---
layout: post
title: 'Molecules Binding #1: An introduction to Drug Discovery'
date: 2023-09-01
authors: 
  - name: sofia-guerreiro
    role: Co-author
  - name: cristiana-carpinteiro
    role: Co-author

image: assets/img/articles/molecules_binding_1/protein_3fwv_screenshot.png
video: assets/img/articles/molecules_binding_1/protein_3fwv_animation.mp4
description: In this series of blog posts we will explore a specific case of the use of AI in the pharmaceutical industry - using Graph Neural Networks for predicting binding affinity. But for now, let’s start by understanding the problem of drug discovery and some fundamental concepts like binding affinity.
category: Research
tags: ["Binding Affinity", "Drug Discovery", "Protein-Ligand Interactions", "Geometric Deep Learning", "Graph Neural Networks"]
---

In this series of blog posts, we are going to explore how AI, in particular, geometric deep learning, can speed up **drug discovery**. We'll dive deep on one specific case: how Graph Neural Networks can predict binding affinity, a key measure in the drug development process. But before delving into the technical details, let's understand why this topic is so relevant.

# Molecules Binding #1: An Introduction to Drug Discovery

## Developing new drugs is hard...

The process of developing new drugs is very slow and costly, **with each new drug development cycle taking  10~17 years and costing approximately 2.600 million US dollars**. [1]

The first 3-5 years are spent researching and testing up to 10.000 potential drug candidates to find effective and safe drugs that can treat specific diseases. Then, the chosen drugs undergo extensive preclinical testing in laboratories and animals to assess safety and efficacy. If successful, the drugs move on to clinical trials, where they are tested in human volunteers through multiple phases. These trials can take several years to complete. Afterward, all the data is reviewed by regulatory authorities to make sure the drug is safe and effective (Fig. 1). [2]

::image-content{imgSrc="molecules_binding_1/drugdiscovery_timeline.jpg"}
Fig. 1: Schematic representation of the drug development timeline. Figure from [Matthews, Holly, James Hanison, and Niroshini Nirmalan. " “Omics”-informed drug and biomarker discovery: opportunities, challenges and future perspectives." Proteomes 4.3 (2016): 28.](https://pubmed.ncbi.nlm.nih.gov/28248238/)
::

This whole process is extremely rigorous, and the time it takes from fundamental research to releasing life-changing medicine can be truly discouraging. A lot of effort has been put into accelerating different steps of this cycle, from refining laboratory drug testing to eliminating the need for animal trials. How can we accelerate this process?

In the last few years, diverse **computational approaches** have taken the lead in speeding up the drug discovery stage, by helping to **narrow down the pool of potential drug candidates**. Expediting this stage makes the whole process faster and cheaper!

In this series, we shall explore the promising opportunities in this field. Let us start by first introducing some concepts and nomenclature.

## First... A Biology Lesson

A **drug** is a chemical compound frequently created as a pharmaceutical product for the purpose of treating, diagnosing, preventing, or lessening the symptoms of a condition or disease. [3]

Drugs are usually composed of **small molecules** targeted to **interact** mainly with **proteins**.

Proteins are essential in almost every aspect of an organism's life, from basic cellular functions to complex physiological processes. Some of their functions include gene regulation, catalyzing biochemical reactions as enzymes, transporting substances within cells and throughout the body, and acting as structural components in tissues like muscle and skin. So it's easy to understand how a deregulation in their functioning can have many consequences. In fact, **proteins** play a pivotal role in **regulating health and disease states**. Disease often arises from disruptions in normal protein functioning. For this reason, understanding how they interact with other structures and molecules is essential for drug development.

One important type of interaction is **enzyme-substrate reactions** (Fig. 2). Enzymes are special proteins with a specific part typically referred to as the *“lock”* (active site) and substrates are the *“keys”* (molecules) that fit into the *lock*. When a substrate finds its matching enzyme, it attaches to the active site and undergoes a chemical reaction, turning into a product. Following the reaction, the enzyme releases the product and returns to its original structure, primed for subsequent interactions. Only one type of substrate fits the *lock*, ensuring that the right reactions happen at the right time, making enzymes essential for digestion, energy production, and other fundamental processes.

::image-content{imgSrc="molecules_binding_1/enzyme_key_lock.png"}
Fig. 2: Schematic representation of an **enzyme-substrate interaction**. Figure from [Selvaraj, Chandrabose, et al. Advances in Protein Chemistry and Structural Biology (2022)](https://www.sciencedirect.com/science/article/abs/pii/S1876162322000165) 
::

This lock-key mechanism (or lack thereof) is behind several conditions, for instance, lactose intolerance. In this case, the enzyme [lactase](https://en.wikipedia.org/wiki/Lactase), which acts as the *"lock"*, is responsible for breaking down lactose, the sugar found in milk. For individuals with lactose intolerance there is not enough lactase enzyme activity and, therefore, the lactose substrate cannot be properly broken down. The lack of enzymatic interaction leads to the undigested lactose causing discomfort and digestive symptoms like bloating and diarrhea.

Drugs can target these types of mechanisms and alter the functioning of the enzyme. For example, the drug [**Aspirin**](https://en.wikipedia.org/wiki/Aspirin) (acetylsalicylic acid) was developed to inhibit the activity of the [cyclooxygenase (COX) enzyme](https://en.wikipedia.org/wiki/Cyclooxygenase). The COX enzymes are crucial for the synthesis of [prostaglandins](https://en.wikipedia.org/wiki/Prostaglandin), which are chemical messengers involved in processes like inflammation, pain, and blood flow regulation. By specifically inhibiting COX enzymes, it reduces the production of prostaglandins which makes Aspirin effective in reducing pain, inflammation and fever.

Another category of interactions are protein-nucleic acid interactions: Proteins can connect to nucleic acids (DNA and RNA) to regulate gene expression, DNA replication, and RNA processing. For example, some proteins can bind to specific spots in the DNA and prevent those spots from being “read”, ensuring that genes are activated or suppressed when needed. A particular case is the [**p53 protein**](https://en.wikipedia.org/wiki/P53), which helps prevent cancer by regulating cell division in response to DNA damage (Fig. 3).

::image-content{imgSrc="molecules_binding_1/protein_p53.gif"}
Fig. 3: Representation of [p53 protein](https://en.wikipedia.org/wiki/P53). Visualization generated using the [alphafold2](https://alphafold.ebi.ac.uk/) prediction and Protein Solvation scenario from Inductiva API.
::

By understanding and targeting these mechanisms, scientists can create treatments to restore proper function and counteract disease-related issues, driving advancements in medical research and healthcare.

In the next blog post, we will dive deeper (literally, on a molecular level) into what are those interactions, in particular in the case of drugs and proteins. For now, we will focus on how to quantify the interactions and why it is important to do it.

## Binding Affinity: a measurement of strength for molecules interactions

A measure of how tightly a molecule (we can call it ligand) binds to another molecule (the target) is given by the **binding affinity**.
In particular, we will explore the case when the target is a **protein** and the ligand is a **small molecule** that composes a drug. When a protein and a ligand are bound, we refer to the complex as $$LP$$, when they are unbound, we refer to them separately $$L$$ and $$P$$. The formation of a ligand-protein complex can be described by a two-state process

$$
L + P \rightleftharpoons LP
$$

The binding affinity can be measured by the dissociation constant, $$k_D$$, which is defined as

$$
k_D = \frac{[L][P]}{[LP]}
$$

where, $$[P]$$, $$[L]$$ and $$[LP]$$ represent [molar concentrations](https://en.wikipedia.org/wiki/Molar_concentration) of the protein, ligand and complex, respectively. Meaning, it corresponds to the concentration of ligand at which the concentration of unbounded proteins equals the concentration of bounded proteins ($$[P] = [LP]$$)

The dissociation constant has **molar units (M)** and, in other words, is the concentration of unbound ligands such that, at equilibrium, half of the targets are occupied (bound to a ligand). 

This means that a **lower dissociation constant** indicates a **stronger binding affinity** between the protein and the ligand, while a **higher dissociation constant** indicates a **weaker binding**.

This value ranges from approximately $$10^{−12} M$$ to $$10^{−2} M$$. To avoid this large magnitude variation, researchers typically use $$−\log(k_D)$$.

When developing drugs, the ideal scenario is that the selected molecules interact with the **desired targets**. In other words, they should have a **higher binding affinity** (typical $$k_D$$ is aimed at $$~10^{-10} M$$ to $$10^{-8} M$$). 

But it is also very important to **guarantee that those molecules don’t interact with proteins for which they were not originally designed to interact**, otherwise, they can produce harmful side effects. In other words, they should have low binding affinity to other targets. Therefore, a lot of effort is put in designing drugs that **only bind to the desired targets**.

Historically, scientists used experimental laboratory methods to measure the protein-ligand binding affinity. Examples of such methods are [Surface Plasmon Resonance](https://en.wikipedia.org/wiki/Surface_plasmon_resonance) and [Isothermal Titration Calorimetry](https://en.wikipedia.org/wiki/Isothermal_titration_calorimetry) which are both time and resource consuming. Therefore computational approaches such as molecular dynamics simulation and docking studies have been used to accelerate this stage.

Particularly, in the last few years advances in machine learning and deep learning techniques, along with an increasing availability of experimental data has led to an increasing body of research on using artificial intelligence to approach this task, but more on that in another blog post! By using these techniques to predict binding affinity, thousands of different compounds can be tested in a much shorter time, therefore having a major impact in accelerating the drug discovery process!

In the next blog post, we will dive deeper on some important concepts to this problem, such as the structure of proteins and the factors that influence binding. We will hint one way that deep learning can be used for drug discovery. **Spoilers:** It will be graph neural networks!

Stay tuned!


## References

[1] T. T. Ashburn and K. B. Thor, “Drug repositioning: identifying and developing new uses for existing drugs.,” Nature Reviews Drug Discovery, vol. 3, no. 8, pp. 673–683, Aug. 2004.

[2] Yang, Z.; Zhong, W.; Zhao, L.; Chen, C. Y.-C. MGraphDTA: deep multiscale graph neural network for explainable drug−target binding affinity prediction. Chem. Sci. 2022, 13, 816−833.

[3] Drews, Jurgen. "Drug discovery: a historical perspective." science 287.5460 (2000): 1960-1964.