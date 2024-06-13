---
layout: post
title: Inductiva API v0.4 release
date: 2024-02-09
authors: 
  - name: hugo-penedones
    role: Author
  - name: luis-sarmento
    role: Author
image: assets/img/articles/inductiva-api-release-v04/v04-live.png
description: The Inductiva API v0.4 release brings MPI clusters, the latest Google Cloud CPUs, two new simulators, a lighter Python package, a CLI interface, a template engine and totally revamped documentation. Get started in minutes!
category: Engineering
tags: ["Inductiva API", "Programming", "HPC", "Simulation", "MPI"]
---


# Announcing the Inductiva API v0.4 Release!

We are thrilled to announce the latest release of the Inductiva API!

Our goal is to make it easy for scientists and engineers to run large scale simulations of physical systems, without the complexity of managing HPC clusters or being stuck to a proprietary software stack. We believe in the power of open-source, and that’s why we architected our platform to be able to integrate high-quality simulators developed by the scientific community over decades -- and expose them via an easy-to-use Python interface. From their laptops, users can launch hundreds or thousands of simulations running in remote servers with the best hardware. 

Here are the main highlights of the v0.4 release:

**MPI clusters** - with a single line of Python code, you can now launch dedicated MPI clusters on-demand. This allows you to run your simulations faster - potentially on hundreds of cpu cores simultaneously - without waiting in queues with jobs from other users. The current version is powered by Google Cloud, but stay tuned for multi-cloud and on-premises support in the future!

**More simulators available** - we added two great open-source simulators:

- [FDS](https://pages.nist.gov/fds-smv/) (Fire Dynamics Simulator) - a “large-eddy simulation (LES) code for low-speed flows, with an emphasis on smoke and heat transport from fires.” 🔥
- [Reef3D](https://reef3d.wordpress.com/) - a hydrodynamics framework, which can be efficiently parallelized, designed to run on a large number of processors. 🌊

This expands the list of previously supported simulators, that included: GROMACs, OpenFOAM, DualSPhysics, SplishSplash, SWASH and XBeach.

**Lighter API client package** - we made our Python client package much simpler and faster to install. It works smoothly on Linux, MacOs and Windows, as well as containerized Python environments such as Google colab. Two main decisions were taken:

- The Inductiva python client package now contains only the “core” functionalities of the API: direct access to the simulators and a set of primitives to manage simulation tasks, computational resources and storage.
- The “high-level” scenarios, such as WindTunnel, or ProteinSolvation, etc are being moved to independent git repositories and python packages. They can now be seen as simulation “apps” that solve a particular problem on top of the core Inductiva API. This opens the door for simulation experts in the broad scientific community to create and share their own scenarios. We are super excited about the possibilities there. If you have ideas about simulation scenarios that you want to expose to the world, drop us a line: we can help!

**Improved Logging and CLI** - we now expose in real-time on the client side all the logging information produced by simulators running remotely. This allows you to easily detect potential problems as you submit simulations loads via the API. Logging information is shown via our [Command Line Interface](https://inductiva-research-labs-inductiva.readthedocs-hosted.com/en/latest/cli/overview.html) (CLI) tool, which has also been improved with new commands.

**A Powerful Templating Engine** - you can now add variable placeholders to your simulation configuration files and set those variables programmatically from Python. This allows you to easily explore large configuration spaces or generate synthetic training data at scale, by automatically creating thousands of variations of a base case and run the corresponding simulations in parallel via the API.

**Access to latest generation CPUs** - we now provide access to latest generation CPUs available on Google Cloud. So, besides the machines from the c2 and c2d families that we were already exposing in previous versions, we now provide access to several machines of type c3 and c3d, featuring the Intel Xeon processors with the latest generation architecture (Sapphire Rapids). 

**Much improved documentation** - last but not least, we have totally revamped the [API documentation](https://inductiva-research-labs-inductiva.readthedocs-hosted.com/en/latest/))-- making it simpler, more fluent and beautiful. We are using readthedocs to host it. Let’s get started!

We are very excited about all these features, so over the next few weeks, we will dedicate a few blog posts to dive deeper and provide examples of some of them. Stay tuned! 
