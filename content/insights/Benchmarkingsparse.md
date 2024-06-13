---
layout: post
title: Benchmarking sparse eigensolvers on CPU and GPU
short-title: Benchmarking sparse eigensolvers
date: 2023-01-02
authors: 
  - name: fabio-cruz
    role: Author
  - name: maria-castro
    role: Author
  - name: luis-sarmento
    role: Author
  - name: david-carvalho
    role: Reviewer and Editor
image: assets/img/articles/cpu_vs_gpu_eigensolver_benchmark/cpu_vs_gpu_eigensolver_benchmark_snapshot.jpg
description: Do GPUs solve sparse eigenproblems faster than CPUs? In this post, we answer this question by comparing the SciPy and CuPy eigensolvers.
category: Benchmarks
tags: ["Eigensolver", "CPU vs GPU", "SciPy", "CuPy"]
---

As part of our mission of solving high-impact real world problems using 
scientific computing and AI, at Inductiva we spend a lot of time benchmarking 
numerical methods and simulators on different hardware platforms. 

In fact, that's why we maintain the
[official Inductiva benchmarking website](https://benchmarks.inductiva.ai/),
where we compare the performance of a variety of local and cloud computing
options, by running different test cases over the the several
[physical simulation packages available via the Inductiva API](https://docs.inductiva.ai/en/latest/simulators/overview.html).

But, on this post, we will be focusing on a very important, and very
fundamental, low-level scientific computation routine...

### Houston, we have an eigenproblem!

Finding *eigenvalues* and *eigenvectors* is a very common operation in many 
fields of science, because the numerical solution to many practical problems
can be formulated as an *eigenproblem*.

Lately, we have been investigating the performance of several *eigensolvers*, 
*i.e.* routines for finding the eigenvalues and eigenvectors of a matrix (or
some variation of this formulation).

Formally an eigenproblem consists in finding the pairs of solutions
$$(\lambda, v_\lambda)$$ for the equation:

$$A v_\lambda = \lambda v_\lambda \ ,$$

where $$A$$ is a square matrix and $$(\lambda, v_\lambda)$$ are eigenvalues and
eigenvectors of $$A$$.

It is quite fast to solve an eigenproblem for small matrices (e.g. a few 
undred rows), but it becomes extremely challenging for very large matrices
$$A$$, with millions or billions of rows. Naturally, such very large matrices
are exactly the ones that scientists and engineers have to deal with when
addressing problems of realistic scales.

Even though increasing the size of the matrix increases the number of entries 
(quadratically), handling larger matrices is possible if such entries are
correlated in some way. For instance, even though the identity matrix with 
10<sup>6</sup> rows has 10<sup>12</sup> entries, its diagonal structure (*i.e.*,
the fact that its elements $$A_{ij}$$ are 1 for $$i = j$$ and 0 otherwise)
renders it as easy to solve as the 2 × 2 identity matrix.

Not surprisingly, the structure of $$A$$ has a key role in the complexity of an
eigenproblem. In practice, such structure is defined by how scientists and
engineers model the specific problem they have at hand.

In some cases, the matrix $$A$$ has a regular internal structure, with a number
of "tiled patterns" repeating internally. In many cases, the matrix $$A$$ is
also an extremely *sparse* matrix, with only a few non-zero entries. This is
such a common case that having good solvers for sparse matrices has been the
subject of years of intense research in the scientific computing community.

### Solvers, please?

There are many good numerical solvers for large sparse matrices out there
(e.g. [Eigen](https://eigen.tuxfamily.org/), [SLEPc](https://slepc.upv.es/)).
Most of these solvers deal with scale by distributing the load over several CPU
machines, but they are massive software systems that are not easy to set up and
maintain. However, in this benchmark, we focus on solvers that run on a single
CPU or GPU.

One very common option for solving sparse eigenproblems, at least in Python, is
the eigensolver provided by [SciPy](https://scipy.org/). SciPy's sparse
eigensolver is based on the
[ARPACK library](https://en.wikipedia.org/wiki/ARPACK), which implements the
[Implicitly Restarted Arnoldi Method (IRAM)](https://en.wikipedia.org/wiki/Arnoldi_iteration#Implicitly_restarted_Arnoldi_method_.28IRAM.29)
for solving eigenproblems of large sparse or unstructured matrices. For
Hermitian matrices (*i.e.* symmetric matrices, if the matrix entries are
real-valued), it uses a variant of the
[Lanczos algorithm](https://en.wikipedia.org/wiki/Lanczos_algorithm#Variations).

Computationally, this solver uses all the CPU threads it has available on the
machine, and with good processors (e.g. the latest
[Intel Core i9](https://ark.intel.com/content/www/us/en/ark/products/230496/intel-core-i913900k-processor-36m-cache-up-to-5-80-ghz.html)
or [AMD ThreadRipper](https://www.amd.com/en/products/cpu/amd-ryzen-threadripper-3990x)), this is actually a lot of firepower.

Here is a short code snippet that computes the eigenpairs of a real-valued 
Hermitian matrix using SciPy.

```python
# Import the SciPy package.
import scipy

# Initialize a 10 x 10 random matrix with 10% of non-zero entries.
matrix = scipy.sparse.random(10, 10, density=0.1)

# Make sure it is Hermitian.
matrix = matrix + matrix.transpose()

# Compute eigenpairs.
eigenvalues, eigenvectors = scipy.sparse.linalg.eigsh(matrix)
```

Despite being so convenient to use, the SciPy solver runs only on CPU. 
Fortunately, there are also GPU-based solvers for sparse eigenproblems.
A very interesting solver is the one provided by the
[CuPy Python package](https://cupy.dev/), that mimics the API of SciPy. 
Below we show how the previous code translates to CuPy.

```python
# Import the SciPy-compatible module of CuPy.
import cupyx.scipy as _scipy

# Initialize a 10 x 10 random matrix with 10% of non-zero entries.
matrix = _scipy.sparse.random(10, 10, density=0.1)

# Make sure it is Hermitian.
matrix = matrix + matrix.transpose()

# Compute eigenpairs.
eigenvalues, eigenvectors = _scipy.sparse.linalg.eigsh(matrix)
```

CuPy's eigensolver is built on top of NVIDIA's
[CUDA Toolkit](https://developer.nvidia.com/cuda-toolkit) and implements the
[Jacobi eigenvalue algorithm](https://en.wikipedia.org/wiki/Jacobi_eigenvalue_algorithm)
to find the eigenvalues and eigenvectors of Hermitian matrices.

Since any "cheap" GPU has thousands of CUDA cores, the hope is that as the size
of the matrix increases, the extremely high level of parallelism of the GPU will
compensate for the overheads of pushing in and getting out the data between CPU
and GPU.

Both SciPy and CuPy are very convenient to install and use (as opposed to the
other very large scale solvers we mentioned before), so we decided to do a
little benchmarking between the eigensolvers provided by the CuPy and SciPy
packages.

We set ourselves to answer the question:

<blockquote>
Do GPUs solve sparse eigenproblems faster than CPUs?
</blockquote>

This is not a trivial question because GPUs are not necessarily good with
dealing with sparse structures. It is well known that they excel over dense
data, but dealing with sparse structure has always been challenging for GPUs.
To get to the bottom of this question, below we put SciPy and CuPy face to face
to see how they fare in solving increasingly large sparse eigenproblems.

So, who wins? Let the contest begin!

### Clash of Pythans

We benchmark the performance of eigensolvers using sparse matrices of increasing
size and a realistic structure that mimics the ones found in some common
problems.

We use as problem inputs tridiagonal matrices $$A$$, whose diagonals are
normally distributed random numbers. The matrices are Hermitian, which in this
case, since the entries are real-valued, simply means that $$A$$ is symmetric.
To avoid any abnormally difficult or easy cases that could arise from generating
these random matrices, we repeat each test (both for CuPy and SciPy) 100 times
and report the time required by the CPU or GPU to solve the eigenproblem.

The comparison involves challenging both solvers, on different hardware
configurations, with increasingly large matrices. We start with small square
matrices of size 10 (*i.e.* 10 columns × 10 rows) and increase the size of the
matri× 10 times in each step, ultimately trying to solve the largest
eigenproblem that each specific hardware configuration allows for.
The hard limit is the memory (RAM or GPU memory) available in each hardware
configuration.

The CPU-based systems in which the SciPy solver is tested are:
- **CPU1:** [Intel Core i7-8750H](https://www.intel.com/content/www/us/en/products/sku/134906/intel-core-i78750h-processor-9m-cache-up-to-4-10-ghz) (released in Q2 2018, 8<sup>th</sup> gen., 2.2 GHz, 6 cores, 12 threads, 16 GB RAM)
- **CPU2:** [Intel Core i5-12400F](https://ark.intel.com/content/www/us/en/ark/products/134587/intel-core-i512400f-processor-18m-cache-up-to-4-40-ghz.html) (released in Q1 2022, 12<sup>th</sup> gen., 4.4 GHz, 6 cores, 12 threads, 64 GB RAM)  
- **CPU3:** [Intel Core i7-12700](https://ark.intel.com/content/www/us/en/ark/products/134591/intel-core-i712700-processor-25m-cache-up-to-4-90-ghz.html) (released in Q1 2022, 12<sup>th</sup> gen., 4.9 GHz, 10 cores, 20 threads, 32 GB RAM)
- **CPU4:** [Intel Core i9-12900K](https://ark.intel.com/content/www/us/en/ark/products/134599/intel-core-i912900k-processor-30m-cache-up-to-5-20-ghz.html) (released in Q4 2021, 12<sup>th</sup> gen., 5.2 GHz, 16 cores, 24 threads, 64 GB)

These are systems with an increasing number of cores / threads of newer and
newer generations. We know SciPy makes use of all CPU cores available so more
cores and higher frequency clock should mean faster solving times. The available
RAM also varies, so we have a good mix of common CPU configurations.

The GPUs in which the CuPy solver is tested are:

- **GPU1:** [NVIDIA GeForce GTX 1060](https://www.nvidia.com/en-gb/geforce/graphics-cards/geforce-gtx-1060/specifications/) (released in Q3 2016, 1280 CUDA cores, 6 GB memory)
- **GPU2:** [NVIDIA GeForce RTX 3070](https://www.nvidia.com/en-eu/geforce/graphics-cards/30-series/rtx-3070-3070ti/) (released in Q4 2020, 6144 CUDA cores, 8 GB memory)
- **GPU3:** [NVIDIA GeForce RTX 3090](https://www.nvidia.com/en-eu/geforce/graphics-cards/30-series/rtx-3090-3090ti/) (released in Q3 2020, 10496 CUDA cores, 24 GB memory)
- **GPU4:** [NVIDIA GeForce RTX 4090](https://www.nvidia.com/en-au/geforce/graphics-cards/40-series/rtx-4090/) (released in Q4 2022, 16384 CUDA cores, 24 GB memory)

Again, these represent increasingly more powerful options, both in terms of
number of cores and available memory. The NVIDIA GTX 1060 is a laptop-level GPU
from 2016, and is a quite modest GPU, while the NVIDIA RTX 4090 is the latest
generation of gaming GPUs by NVIDIA.

Table 1 shows the mean execution time over 100 runs for the SciPy solver on each
CPU for increasing matrix sizes. Note that all values are given in seconds, and
that the changes in the powers of 10 are significant across lines and columns.

| Matrix size | CPU1: i7-8750H | CPU2: i5-12400F | CPU3: i7-12700 | CPU4: i9-12900K |
| --------------------------------------- |
| 10<sup>1</sup> | 4.64 × 10<sup>-4</sup> | 1.97 × 10<sup>-4</sup> | 1.88 × 10<sup>-4</sup> | 1.61 × 10<sup>-4</sup> |
| 10<sup>2</sup> | 4.31 × 10<sup>-3</sup> | 2.00 × 10<sup>-3</sup> | 1.51 × 10<sup>-3</sup> | 1.49 × 10<sup>-3</sup> |
| 10<sup>3</sup> | 3.74 × 10<sup>-2</sup> | 6.42 × 10<sup>-3</sup> | 6.49 × 10<sup>-3</sup> | 5.78 × 10<sup>-3</sup> |
| 10<sup>4</sup> | 1.26 × 10<sup>-1</sup> | 2.97 × 10<sup>-2</sup> | 3.13 × 10<sup>-2</sup> | 2.60 × 10<sup>-2</sup> |
| 10<sup>5</sup> | 1.58 × 10<sup>0</sup> | 3.16 × 10<sup>-1</sup> | 4.02 × 10<sup>-1</sup> | 4.12 × 10<sup>-1</sup> |
| 10<sup>6</sup> | 1.96 × 10<sup>1</sup>  | 6.84 × 10<sup>0</sup>  | 8.34 × 10<sup>0</sup>  | 6.72 × 10<sup>0</sup>  |
| 10<sup>7</sup> | 1.91 × 10<sup>2</sup>  | 9.04 × 10<sup>1</sup>  | 9.46 × 10<sup>1</sup>  | 9.05 × 10<sup>1</sup>  |

Likewise, Table 2 shows the mean execution time over 100 runs for the CuPy
solver on each GPU. All values are given in seconds.

| Matrix size | GPU1: GTX 1060 | GPU2: RTX 3070 | GPU3: RTX 3090 | GPU4: RTX 4090 |
| --------------------------------------- |
| 10<sup>1</sup> | 1.30 × 10<sup>-2</sup> | 2.29 × 10<sup>-2</sup> | 1.19 × 10<sup>-2</sup> | 1.91 × 10<sup>-2</sup> |
| 10<sup>2</sup> | 9.58 × 10<sup>-2</sup> | 3.03 × 10<sup>-2</sup> | 2.65 × 10<sup>-2</sup> | 2.29 × 10<sup>-2</sup> |
| 10<sup>3</sup> | 1.21 × 10<sup>-1</sup> | 3.23 × 10<sup>-2</sup> | 3.03 × 10<sup>-2</sup> | 2.42 × 10<sup>-2</sup> |
| 10<sup>4</sup> | 1.64 × 10<sup>-1</sup> | 4.11 × 10<sup>-2</sup> | 3.88 × 10<sup>-2</sup> | 3.15 × 10<sup>-2</sup> |
| 10<sup>5</sup> | 2.84 × 10<sup>-1</sup> | 1.26 × 10<sup>-1</sup> | 9.78 × 10<sup>-2</sup> | 5.65 × 10<sup>-2</sup> |
| 10<sup>6</sup> | 2.67 × 10<sup>0</sup>  | 7.13 × 10<sup>-1</sup> | 6.78 × 10<sup>-1</sup> | 3.56 × 10<sup>-1</sup> |
| 10<sup>7</sup> | 2.95 × 10<sup>1</sup>  | 8.21 × 10<sup>0</sup>  | 4.96 × 10<sup>0</sup>  | 3.18 × 10<sup>0</sup>  |

For a better comparison, the mean values of both CPU and GPU execution times are
represented graphically as a function of matrix size in Figure 1. Observe the
logarithmic scales used in the plot.

<div class="max-w-xl sm:justify-center sm:mx-auto">
<img src="assets/img/articles/cpu_vs_gpu_eigensolver_benchmark/devices_exec_time.png" class="mx-auto">
</div>
<span class="mt-0 block sm:text-center text-base">
Figure 1: Mean time required by CPUs and GPUs to solve a sparse eigenproblem
of varying matrix size. CPUs use SciPy and GPUs use CuPy.
</span>

Our results strikingly show that GPUs perform poorly for small matrices
(size < 10<sup>4</sup>), but clearly outperform CPUs for matrix sizes > 10<sup>4</sup>.

Note that our timings do not include the transfer time between RAM and GPU
memory. However, there is still significant overhead in the GPU process, which
is observable for small matrices. Naturally, the devices with higher computing
capacity – CPU4 and GPU4 – outperform their counterparts, although the
difference is clearly more noticeable in GPUs. In fact, CPUs 2-4 show a very
similar performance for all matrix sizes. GPUs 2-4, in turn, show significant
differences, especially for sizes > 10<sup>4</sup>.

Another clear outcome of our experiment is that choosing the computational stack
to solve a sparse eigenproblem can result in dramatically different execution
times. In our results, there are matrix sizes for which no GPU outperforms the
worst CPU (e.g. matrix size 10<sup>2</sup>) and vice-versa
(e.g. matrix size 10<sup>6</sup>).

<div class="max-w-xl sm:justify-center sm:mx-auto">
<img src="/img/articles/cpu_vs_gpu_eigensolver_benchmark/devices_speedup_rel_CPU2.png" class="mx-auto">
</div>
<span class="mt-0 block sm:text-center text-base"> 
Figure 2: Speedup factors relative to CPU2 for varying matrix size.
</span>

To quantify the said impact on the workflow of scientists and engineers, we
represent in Figure 2 the speedup factors obtained by solving the eigenproblem
on all GPUs relative to CPU2, a mid-range CPU commonly available in personal
laptops and desktops. This representation shows that
**with GPUs 2-4, thespeedup factor is > 10x for matrix sizes > 10<sup>6</sup>, reaching a whopping 30x for GPU4**.

That's all for now, folks!

## What to read next?
If you are interested in seeing how several open-source simulators (OpenFAST,
Reef3D, SCHISM, SplishSplash, SWAN, SWASH, etc) perform on different cloud-based
computational options (from 2 to dozens of vCPUs), you should have a look at
[Inductiva's official Benchmarks website](https://benchmarks.inductiva.ai/). You
will find surprising facts about how different simulation software scales up as
we add more vCPUs, as well as, information about the optimal cost x performance
point to achieve the best "bang for your buck".
