---
layout: post
title: 'Coastal Protection: </span> <br/> <span> Simulating Scenarios with SWASH </span>'
short-title: 'Perspectives on the Sea'
date: 2022-08-04
authors: 
  - name: david-carvalho
    role: Author
  - name: fabio-cruz
    role: Reviewer and Editor
image: assets/img/articles/perspectives_on_the_sea_2/perspectives_on_the_sea_2_snapshot.jpg
video: assets/img/articles/perspectives_on_the_sea_2/perspectives_on_the_sea_2_cover.mp4
description: With our goal set on understanding how structures can provide coastal protection, we explain how simulators can help estimate which structures are optimal.
category: Outlook
tags: ["Coastal Protection", "Breakwaters", "SWASH", "Navier-Stokes Equations", "Shallow Water Equations", "Classical Simulators"]
published: false
---

<blockquote>
In Perspectives on the Sea, we look into how simulation can help us face societal challenges, particularly those related with the ocean.
</blockquote>

In our [first installment](2022-07-26-perspectives_on_the_sea_1), we introduced **wetlands** as an alternative, nature-inspired solution to protect the coastline. 

*That's not enough*. We must also *benchmark* how **suitable** these (and other) proposals are. 
**Simulation** allows us to do just that by **numerically estimating** the necessary physical outcomes in a *reliable* and *scalable* way.

In this post, we show how a *simulator* can be deployed to assess the degree of coastal protection offered by a realistic scenario at an iconic beach in Portugal.

# <span> Coastal Protection: </span> <br/> <span> Simulating Scenarios with SWASH </span>

## Waves come in, waves go out

Understanding the physical principles behind the dynamics of seawater (and other fluids alike) is remarkably **difficult**. 

Fortunately, the complexity underlying the behavior of fluids - from honey dripping down to smoke swirling around can be expressed in one of the most foundational cornerstones of Physics.

By applying principles of *conservation of momentum* and *mass*, the [Navier-Stokes Equations](https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations) (NSEs) provide a framework to predict how the *velocity* of a huge class of fluids evolves, for custom setups [1].

<div class="aspect-w-16 aspect-h-9">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Iqfab4nKg2U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<p class="mt-8 block sm:text-center text-base"> Video 1: Flow across a 2D channel with obstacles, simulated with the NSEs. The patterns observed are intricate and come from small-scale effects that propagate in time. Credits: José A. Fonseca.</p>

They are powerfully general. 
Unsurprisingly, this comes with a *high* price tag. 

The NSEs are notoriously difficult to solve in a stable way [2]. Computationally, the algorithms employed tend to be **extremely expensive**, both in terms of *memory used* and *runtime*.

There are ways out. 
However complex, fluid dynamics can be simulated in **much simpler** frameworks if we are willing to **lose** some refinement. 

Fortunately for us, *we are in such a position*.

### Shallow Water

In the context of coastal protection, we are interested in how the **wave surface** (e.g. the wave top) evolves in relatively close areas to the shore.

As a consequence, flow details occurring **deep down** or **further offshore** do **not** fundamentally change the **significant** properties of the wave when it later breaks.

When water waves propagate in low-depth media and their horizontal scales are *far greater* than their vertical scale, we can simplify the NSEs by only considering **depth-averaged** speeds.

This leads to a *lighter* treatment of the problem, whose theoretical model is prescribed by the [Shallow Water Equations](https://en.wikipedia.org/wiki/Shallow_water_equations) (SWEs) [3].

<div class="aspect-w-16 aspect-h-9">
<video class="mb-0" loop muted autoplay preload="auto">
    <source src="{{ 'assets/img/articles/perspectives_on_the_sea_2/shallow_water.mp4' | relative_url }}" type="video/mp4">
</video>
</div>
<p class="mt-8 block sm:text-center text-base"> Video 2: Evolution of surface waves on a 2D region caused by a round of 5 incoming falling drops, simulated using the Shallow Water Equations. Credits: Dan Copsey</p>

The assumptions employed in the SWEs are well suited to model the relevant hydrodynamic effects close to the shore.

But we are not done yet.

## Simulating Scenarios for Coastal Protection

For now, suppose that we would like to assess how **effective** a certain intervention is in protecting a particular section of coastline from strong waves. 

For that, two scenarios need to be simulated: for the **same** sea conditions (e.g. wave frequency, amplitude or orientation), one **with** and another one **without** that intervention.

A *simulator* must then be able to solve the SWEs when considering the presence of the proposed structure.
Many simulators exist with specific implementations and interfaces  [4].

We will focus on **SWASH** (*Simulating WAves till SHore*) [5], an open-source tool for simulating a wide variety of hydrodynamic phenomena.

### <span> A Case Study </span>  <br/> <span> Erecting a seabreak at *Praia do Carneiro* Beach </span>

Let's exemplify this idea by benchmarking the effect of a rectangular breakwater structure, to be hypothetically erected at [*Praia do Carneiro*](https://goo.gl/maps/KDp9RTLkpCgw8H8y6) beach in Porto, Portugal.

For a simulation considering such a simple structure to run, **only** a handful of parameters need to be specified: the *breakwater dimensions* (length, width and height) and its *location*. \
Within SWASH's API, this structure can be specified by overlaying a hard box on to the seabed. 

Evidently, the water flow around this obstacle will be affected. \
*But how exactly?*

We can visualize this contrast by plotting, say, a colormap of the speed across the region as the offshore waves come in. If a spot measures speeds above a critical threshold for too long, we mark it red.

<div class="videoWrapper">
<video class="mb-0" loop muted autoplay preload="auto">
    <source src="{{ 'assets/img/articles/perspectives_on_the_sea_2/swash_obstacle.mp4' | relative_url }}" type="video/mp4">
</video>
</div>
<span class="mt-0 block sm:text-center text-base"> Video 3: Evolution of the wave velocity for some sea conditions simulated for two scenarios: one *without a breakwater* (top) and another one *with it* (below). If this structure were to be built, it seems that the beach would be shielded from dangerous, fast waves. Credits: Fábio Cruz / Inductiva </span>

As the waves get reflected once they bounce right off the structure, it is clear the area directly shielded by it is protected. \
The breakwater can also be seen to deflect some waves laterally. These, in turn, interfere with the incoming unrestricted waves. 

*The combined effect?* For this profile of incoming waves and time frame, the entire extent of the beach is now **protected** from potentially dangerous waves *due to the presence of the breakwater*.

### Reaching complex solutions with simplicity

In principle, we should apply the same ideas to a wetland. 
However, this type of intervention is **nowhere as simple** as a breakwater:

::image-content{imgSrc="perspectives_on_the_sea_2/wetland.jpg"}
Fig. 1: Swamp in Osceola National Forest, USA. Noticeably, wetland environments show a complexity of vegetation elements (such as logs, roots and foliage) as well as topography. Credits: Geoff Gallice.
::

We are back to a stage where the complexity of an element may become a **bottleneck** for simulation.

Fortunately, the same solution principles hold again: with sensible modeling, structures too can be stripped away of over-refinement and specified to an adequate level.

This is exactly what we will show in the next installment of *Perspectives on the Sea*, where we detail **how simulations of scenarios where wetlands may protect the coast can be set up and run.**

🌊 *Stay tuned!* 🌊

## References & Remarks

[[1] - The Navier-Stokes Equations - MIT Mathematics](https://math.mit.edu/~dunkel/Teach/18.354_2014S/lecture_notes/L08_navier_stokes.pdf) Here is a more detailed explanation of the Mathematics behind the NSEs. \
[[2] - Numerical Issues - Numerical Instability](https://www.flow3d.com/resources/cfd-101/numerical-issues/numerical-instability) A down-to-earth explanation of how to set convergence criteria in the NSEs. \
[[3] - Lecture 8: The Shallow-Water Equations](https://gfd.whoi.edu/wp-content/uploads/sites/18/2018/03/lecture8-harvey_136564.pdf) An excellent reference where the SWEs are introduced and explained in a mathematical way. \
[[4] - github repositories names 'shallow-water-equations'](https://github.com/topics/shallow-water-equations)
Given the popularity of the topic, there are tens of github repositories dedicated to solving the SWEs. \
[[5] - SWASH official page](https://swash.sourceforge.io/) Documentation and feature explanation of the simulator we use.
