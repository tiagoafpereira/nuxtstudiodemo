---
layout: post
title: "Hadamard Matrices #3: It's Construction Time"
date: 2022-02-07
authors:
  - name: ines-guimaraes
    role: Author
  - name: david-carvalho
    role: Editor
image: assets/img/articles/hadamard_3_its_construction_time/hadamard_3_snapshot.jpg
video: assets/img/articles/hadamard_3_its_construction_time/hadamard_3_cover.mp4
description: In this 3rd post of the series, and before we dive into out-of-the-box disruptive methods, we close the first part by outlining some good old classical constructions of Hadamard matrices.
category: Research
tags: ["Hadamard matrices", "Combinatorial Optimization", "Linear Algebra", "Group Theory", "Classical Methods"]
published: false
---

Our Hadamard train is moving fast. We know where we are headed to but the journey
seems perilous. *What exactly is needed to keep us going?* \
Now that we know how Hadamard matrices *should* look like
(from our [previous post](2022-01-27-hadamard-matrices-2-an-introduction)), we need to divert
to the Construction Depot and start building them ourselves.

We outline 3 construction methods: *Sylvester's*, *Payley's* and *Williamson's*.
These won't provide our final solution but they will allow us to at least have
a guarantee Hadamard matrices of some specific orders can be generated.\
With this human touch of craftsmanship, will we be able to automate this task
with a machine? That's the hope - and we certainly believe so!

Let's get to work. 😛

# Hadamard Matrices #3: It's Construction Time

## Sylvester's Construction

*Stigler's law of eponymy* states that no discovery in science is ever named
after its original discoverer.
For instance, the famous *Euler's formula* $$e^{i \pi} = 1$$ was
actually discovered by Roger Cotes (1682--1716).
Even Stigler's law falls into this category, since it had already been proposed
by Robert Merton (1910--2003).

With this in mind, you shouldn't be surprised to learn that
Jacques Hadamard (1865--1963) was **not** the first person to think of
Hadamard matrices but most likely James Sylvester (1814--1897), who
studied them under the name *anallagmatic pavements*.
He was clearly inspired by geometric constructions, but this weird terminology
surely isn't to everyone's taste...

Sylvester began his work on Hadamard matrices when dealing with a problem on
tessellations *i.e.* ways to cover a surface with geometric shapes without
any gaps or overlaps.
In this endeavour, he realised something deep -
**we can always construct a Hadamard matrix when its order is a power of 2.**
In other words, given any integer $$k \geq 1$$, we can be sure there is a
Hadamard matrix of order $$n = 2^k$$.

In particular, this shows that there are *infinitely* many Hadamard matrices.
They can get as big as we want, baby! Now, how can we prove such a statement?
The best way to show that something exists is to point our finger at it, and
that's exactly what we're going to do!

Let us start with two orders already introduced
[in the previous post]({% post_url 2022-01-27-hadamard-matrices-2-an-introduction %})
that fit the bill.
We hope your dog can handle the case $$k = 0$$ - simply take
$$H_1 = \begin{pmatrix} 1 \end{pmatrix}$$, a Hadamard matrix of order $$2^0=1$$.
The case $$k=1$$ is also easy:

$$
H_2 = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}
$$

is a Hadamard matrix of order $$n=2^1=2$$.\
Note something: if we abuse notation a little, this matrix has the structure

$$
\begin{pmatrix} \square & \square \\ \square & -\square \end{pmatrix}
$$

where the blank square is basically filled with $$H_1$$.
Can you guess what we'll do to construct a Hadamard matrix of order $$n = 2^2=4$$?
*That's right* - we shall apply the same idea - laziness isn't always a bad thing!
This cheat trick gives:

$$
H_4 = \begin{pmatrix} 1 & 1 & 1 & 1 \\
1 & -1 & 1 & -1 \\
1 & 1 & -1 & -1 \\
1 & -1 & -1 & 1
\end{pmatrix}
$$

which, as you can verify, is indeed a Hadamard matrix.

::image-content{imgSrc="hadamard_3_its_construction_time/sylvester_matrices.png"}
Fig. 1: A chessboard depiction of Sylvester's construction.
Starting from a smaller Hadamard matrix of order $$n=2^{k-1}$$, this method can
**always** find a Hadamard matrix of order $$n=2^{k}$$ by concatenating blocks
of the smaller matrix. Credits: David Carvalho / Inductiva
::

For $$k=3$$, a matrix of order $$n=2^3 = 8$$ can also be cooked in this fashion, and so on.
In general, a Hadamard matrix of order $$n=2^k$$ can be recursively constructed
with *a priori* knowledge of a smaller Hadamard matrix of order $$n = 2^{k-1}$$:

$$
H_{2^k} = \begin{pmatrix} H_{2^{k-1}} & H_{2^{k-1}} \\ H_{2^{k-1}} & -H_{2^{k-1}} \end{pmatrix}
$$

This method is known as **Sylvester's construction**. In fact, this is nothing
but a particular case of an even more general result.

### Power-of-2 Hadamard matrices: Done ✓

To understand how, we first need to introduce a cool operation between
matrices — the *Kronecker product*.
For a $$m \times n$$  matrix $$A = (a_{ij})$$ and a $$p \times q$$ matrix
$$B$$, the Kronecker product $$A \otimes B$$ is the $$mp \times nq$$ matrix:

$$
A \otimes B =
\begin{pmatrix} a_{11}B & \cdots & a_{1n}B \\ \vdots & \ddots & \vdots \\ a_{m1}B & \cdots &a_{mn}B
\end{pmatrix}
$$

Does it look confusing? Don't worry, we've got your back! \
For instance, if
$$ \textcolor{RedOrange}{A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}}$$
and $$ \textcolor{RoyalBlue}{B = \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}}$$,
then:

<div class="overflow-x-auto">
$$
\textcolor{RedOrange}{A} \otimes \textcolor{RoyalBlue}{B} = \begin{pmatrix}
\textcolor{RedOrange}{1} \cdot \textcolor{RoyalBlue}{\begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}} & \textcolor{RedOrange}{2} \cdot \textcolor{RoyalBlue}{\begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}} \\
\textcolor{RedOrange}{3} \cdot \textcolor{RoyalBlue}{\begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}} & \textcolor{RedOrange}{4} \cdot \textcolor{RoyalBlue}{\begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}}
\end{pmatrix} = \begin{pmatrix} 5 & 6 & 10 & 12 \\ 7 & 8 & 14 & 16 \\ 15 & 18 & 20 & 24 \\ 21 & 24 & 28 & 32\end{pmatrix}.
$$
</div>

Got it? Of course you did - Good!

Now, if $$A$$ and $$B$$ are both Hadamard matrices, can you guess what
$$A \otimes B$$ will be? That's right - *yet another* Hadamard matrix!
This is pretty awesome because it allows us to construct *larger
and larger* Hadamard matrices from smaller ones.

In fact, if their orders are respectively $$n_A$$ and $$n_B$$,
the Kronecker product yields a Hadamard matrix of order $$n_A n_B$$.
Then, Sylvester's construction finds **any** power-of-two Hadamard
matrix. \
For that, we *just* need a Hadamard matrix $$H_{2^{k-1}}$$ and our good
old friend $$H_2$$ to produce a Hadamard matrix $$ H_2 \otimes H_{2^{k-1}}$$
of order $$n = 2 \times 2^{k-1} = 2^{k}$$.

All in all, Sylvester's construction is very easy to understand and to implement,
but this constraint on the order has a serious limitation.
We shall move on and explore other tools...

## Payley's Way

If James Sylvester had a thing for powers of $$2$$, then Raymond Payley
(1907--1933) had a thing for powers of primes... plus one (*you'll see what we mean*).\
Basically, this mathematician devised a method to construct Hadamard matrices
whose order is of type $$n=p^k + 1$$, where $$p$$ is a prime number and
$$k>0$$ an integer.

But remember - from our [previous post]({% post_url 2022-01-27-hadamard-matrices-2-an-introduction %})
we know that any Hadamard matrix of order $$n>2$$ must be divisible by $$4$$!
This condition can be written mathematically as:

$$
p^k+1 \equiv 0 \, (\mathrm{mod} \,4)
$$

*This is powerful* - pick your favourite prime number $$p$$ and positive
integer $$k$$, and be sure you can **always** cook up a nice Hadamard matrix of
order $$n = p^k+1$$.

### Going round and round...

This construction recipe involves a very powerful ingredient:
$$\mathrm{GF}(p^k)$$, the *finite field* of order $$p^k$$.
*"What is that?!"* - you ask.

Informally, a field is just a space where you can **always** add, subtract,
multiply and divide elements and **never** obtain results outside of it.
For example, the rational numbers $$\mathbb{Q}$$ and the real numbers
$$\mathbb{R}$$ are fields but $$\mathbb{Z}$$ is not, since the quotient of
two integers isn't always an integer.

The spirit of Mathematics is, of course, in abstracting away.
This brings us to what that funny $$\rm{mod}$$ notation means.
You guessed it right: it indicates usual arithmetic is not being used - but
rather **modular arithmetic** is.

Adding or multiplying integers [1] in this framework requires us to perform the
usual operation and then compute the remainder upon division by a fixed integer,
the *modulo* $$m$$.

Let's take simple examples for $$m=7$$, shall we? Since $$4+6 = 10$$ in
$$\mathbb{Z}$$ and $$10 = 1 \times 7 + 3$$, their modular sum is $$3$$,
expressed as $$6 + 4 = 3 \ \rm{mod} \ 7$$.
Multiplication works in the same way e.g. $$3 \times 5 = 1$$ because
$$3 \times 5 = 15$$ and, since $$15 = 2 \times 7 + 1$$,
$$15 \equiv 1 \, (\mathrm{mod} \,7)$$.
We say that $$10$$ is *congruent* to $$3$$ (and $$15$$ to $$1$$) *modulo* $$7$$.
In this algebraic structure, they are *essentially* equivalent [2].

Only $$7$$ outcomes are possible for any integer addition or multiplication:
$$\{0,1,2,3,4,5,6\}$$. We can identify congruence by "going round the 7h clock". \
Take a close look at Fig 2.

::image-content{imgSrc="hadamard_3_its_construction_time/mod_7.png"}
Fig. 2:
In arithmetic modulo $$7$$, adding a multiple of a cycle (represented by a particular
shade of grey) of $$7$$ to an integer brings it to one of the $$7$$ possible
hour ticks. We can visualize the relation $$10 = 3 \ \rm{mod} \ 7$$ by noticing
both numbers land on the same clock tick.  Credits: David Carvalho / Inductiva
::

Needless to say, we conveniently showed you an example of yet another field,
$$\mathrm{GF}(7)$$.
Unlike the fields $$\mathbb{Z}$$ and $$\mathbb{Q}$$ - which have infinite order -
this one is finite.
In general, the order of a finite field must be **a power of a prime** *i.e.*
$$n=p^k$$.

Before going Hadamard-crazy, we just need one more concept.
Given a finite field $$\mathrm{GF}(p^k)$$, one of its elements $$b$$
is called a *square* if there is some element $$a$$ such that
$$a \times a = b$$.
Nothing fancy here, we're just yet again generalising what squaring a number
can be. For example: in $$\mathrm{GF}(7)$$, $$2$$ is a square since
$$2 \equiv 4^2 \, (\mathrm{mod} \,7)$$.

### Now, to construction!

Let us see how a tasty Hadamard matrix of order $$n=p^k + 1$$ can be cooked up
if we know the finite field $$GF(p^k)$$.
Now: since it is finite, we can list all $$p^k$$ field elements $$a_i$$.
Up to congruence, these are always in the set $$\{0, 1, \dots, p-1 \}$$.

*The trick comes here*: let us keep track which elements are squares (or not)
by using the following function $$\chi$$:

$$
\chi(y) = \begin{cases}0&{\text{ if }}y=0\\1&{\text{ if }} y \neq 0{\text{ is a square }}\\-1&{\text{ if }} y \neq 0{\text{ is not a square }} \end{cases}
$$

Now, we can summarise this information by constructing a matrix $$Q$$ of order
$$p^k$$ such that
$$Q_{\textcolor{RedOrange}{i},\textcolor{RoyalBlue}{j}} = \chi(\textcolor{RedOrange}{a_i}-\textcolor{RoyalBlue}{a_j})$$.
We're obviously not done yet. In order to obtain $$H_{p^k + 1}$$, we need a
further row and column and to somehow get rid of the $$0$$-valued entries. \
This can be done in two steps.
- With the aid of a column $$\mathbf{1}$$, padded with $$1$$s along its $$p^k$$
entries, we construct $$S$$, a square matrix of order $$n=p^k+1$$ given by:

    $$
    S = \begin{pmatrix} 0 & \mathbf{1}^T \\ -\mathbf{1} & Q \end{pmatrix}.
    $$

- From $$S$$, we finally *(FINALLY!)* obtain a Hadamard matrix as
$$H_{p^k + 1} = S + I$$, where $$I$$ is the identity matrix of order $$p^k+1$$.

Payley did not stop here. He also devised constructions for orders
$$n = 2(p^k+1)$$, as long as $$p^k+1 \equiv 2 \, (\mathrm{mod} \,4) $$.
In fact, $$\mathrm{GF}(p^k)$$ can still be used as before (alongside its associated
matrices $$Q$$ and $$S$$).
The final touch comes with a slightly different flavour:

<div class="overflow-x-auto">
$$
H_{2(p^k+1)} = S \otimes \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} + I \otimes \begin{pmatrix} 1 & -1 \\ -1 & -1 \end{pmatrix}
$$
</div>

### Back to our new favourite field

Phew, that was intense! As an example, let's catch a $$8 \times 8$$ Hadamard
 matrix $$H_8$$ using Payley's method.\
This requires working with $$\mathrm{GF}(7)$$ (i.e $$p=7$$ and $$k=1$$).
Start with enumerating its elements as, say, $$a_1=0$$, $$a_2=1$$, $$\dots$$
and $$a_7 = 6$$. Note that the result won't be affected by your choice!

First, we must identify its squares by applying $$\chi$$. Now, by definition
$$\chi(0) = 0$$; as for the rest, simple inspection suffices:
- since $$1 \equiv 1^2 \, (\mathrm{mod} \,7)$$,
$$2 \equiv 4^2 \, (\mathrm{mod} \,7)$$ and
$$4 \equiv 2^2 \, (\mathrm{mod} \,7)$$, $$1$$, $$2$$ and $$4$$ are squares
and so $$\chi(1) = \chi(2) = \chi(4) = 1$$.
- the remaining elements are **not** squares, and so
$$\chi(3) = \chi(5) = \chi(6) = -1$$.

Note that the same square may be obtained in many ways. For instance,
$$1 = 1^2 = 6^2$$. We can now start to fill our ($$7 \times 7$$) matrix $$Q$$:

$$
Q = \begin{pmatrix}
\chi(0-0) & \dots  & \chi(0-6) \\
\vdots &  \ddots & \vdots \\
\chi(6-0) & \dots & \chi(6-6)
\end{pmatrix} \\
$$

Note that, since the arguments depend on the *difference*, all entries along
the diagonals share the same value and $$Q$$ has the diagonal structure:

::image-content{imgSrc="hadamard_3_its_construction_time/matrix_q.png"}
Fig. 3: The matrix $$Q$$ keeps information of which elements in the field are
squares or not and has a diagonal structure. Credits: David Carvalho / Inductiva
::

We just calculated $$\chi$$ for positive arguments so we have built the lower
part of $$Q$$. For negative arguments (and respective upper part), we simply
compute their congruents modulo 7: $$-1 = 6$$, $$-2 = 5$$, $$-3 = 4$$,
$$-4 = 3$$, $$-5 = 2$$ and $$-6=1$$. Then,

<div class="overflow-x-auto">
$$
Q = \begin{pmatrix}0&-1&-1&1&-1&1&1\\1&0&-1&-1&1&-1&1\\1&1&0&-1&-1&1&-1\\-1&1&1&0&-1&-1&1\\1&-1&1&1&0&-1&-1\\-1&1&-1&1&1&0&-1\\-1&-1&1&-1&1&1&0\end{pmatrix}
$$
</div>

$$Q$$: done ✓. Now, we obtain $$S$$ by adding $$-1$$ along the first column
and $$1$$ to the first row:

<div class="overflow-x-auto">
$$
\begin{align*}
S=
\begin{pmatrix}
0&1&1&1&1&1&1&1 \\ -1&0&-1&-1&1&-1&1&1\\-1&1&0&-1&-1&1&-1&1\\-1&1&1&0&-1&-1&1&-1\\-1&-1&1&1&0&-1&-1&1\\-1&1&-1&1&1&0&-1&-1\\-1&-1&1&-1&1&1&0&-1\\-1&-1&-1&1&-1&1&1&0
\end{pmatrix}
\end{align*}
$$
</div>

Finally, we add $$1$$s along the diagonal. Our $$H_8$$ is *al dente* and ready
to serve!

<div class="overflow-x-auto">
$$
\begin{align*}
H_8 =
\begin{pmatrix}
1&1&1&1&1&1&1&1 \\ -1&1&-1&-1&1&-1&1&1\\-1&1&1&-1&-1&1&-1&1\\-1&1&1&1&-1&-1&1&-1\\-1&-1&1&1&1&-1&-1&1\\-1&1&-1&1&1&1&-1&-1\\-1&-1&1&-1&1&1&1&-1\\-1&-1&-1&1&-1&1&1&1
\end{pmatrix}
\end{align*}
$$
</div>

We just produced a Hadamard matrix of order $$n = 8 = 7^1+1$$.
This may seem more trouble that what it is worth: note that $$8 = 2^3$$, and
a Sylvester's construction would have also worked.
However, Payley's construction would have saved us if we had tried for, say,
an order $$n = 12 = 11^1 + 1$$ or $$6860 = 19^3 + 1$$.

## Williamson's Way

The last construction we'll discuss is due to John Williamson (1901--1949),
a Scottish mathematician - so make sure to read this section with
a Scottish accent (it will help make it all settle in, *aye*!)

As you will see, Williamson's construction has a somewhat different flavour.
If Payley's methods are akin to technical dishes, Williamson's
are your usual Friday night stir-fry with a combination of killer ingredients
that *always* works.

The idea is to use four matrices of order $$n = k$$
with some rather special properties in order to cook up a Hadamard matrix of
order $$n = 4k$$.
More concretely: suppose that, with some divine inspiration, we manage to find
$$\{\pm 1\}$$-matrices $$A$$, $$B$$, $$C$$ and $$D$$, all of order $$k$$,
satisfying condition 1 and 2, respectively:

$$
AA^T + BB^T + CC^T + DD^T = 4k I_{k}
$$

where $$I_k$$ is the identity matrix of order $$k$$ and, for any matrices
$$X,Y \in \{A,B,C,D\}$$:

$$
XY^T = YX^T
$$


Then, our *pal* Williamson assures us that the matrix constructed with the
following block structure:

$$
H =
\begin{pmatrix}
A & B & C & D \\
-B & A & -D & C \\
-C & D & A & -B \\
-D & -C & B & A
\end{pmatrix}
$$

is a Hadamard matrix!

As an example (smaller this time!), we consider the $$3 \times 3$$ matrices
$$\textcolor{RedOrange}{A}$$, $$\textcolor{RoyalBlue}{B}$$,
$$\textcolor{WildStrawberry}{C}$$ and $$\textcolor{Green}{D}$$, given by:

<div class="overflow-x-auto">
$$
\textcolor{RedOrange}{A} = \begin{pmatrix}
1 & 1 & 1 \\
1 & 1 & 1 \\
1 & 1 & 1
\end{pmatrix}, \; \textcolor{RoyalBlue}{B} = \textcolor{WildStrawberry}{C} = \textcolor{Green}{D} = \begin{pmatrix}
1 & -1 & -1 \\
-1 & 1 & -1 \\
-1 & -1 & 1
\end{pmatrix}.
$$
</div>

If you have some time to kill, you can verify that they satisfy conditions 1
 and 2 above and so, after a quick sizzle in our wok, they result in a tasty Hadamard
 matrix of order $$n= 4 \times 3 = 12$$:

<div class="overflow-x-auto">
$$
H_{12} = \begin{pmatrix}
\textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{-1} & \textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{-1} & \textcolor{Green}{1} & \textcolor{Green}{-1} & \textcolor{Green}{-1} \\
\textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{-1} & \textcolor{Green}{-1} & \textcolor{Green}{1} & \textcolor{Green}{-1} \\
\textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{1} & \textcolor{Green}{-1} & \textcolor{Green}{-1} & \textcolor{Green}{1} \\
\textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{Green}{-1} & \textcolor{Green}{1} & \textcolor{Green}{1} & \textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{-1} \\
\textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{Green}{1} & \textcolor{Green}{-1} & \textcolor{Green}{1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{-1} \\
\textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{Green}{1} & \textcolor{Green}{1} & \textcolor{Green}{-1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{1} \\
\textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{1} & \textcolor{Green}{1} & \textcolor{Green}{-1} & \textcolor{Green}{-1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{1} \\
\textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{1} & \textcolor{Green}{-1} & \textcolor{Green}{1} & \textcolor{Green}{-1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{1} \\
\textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{-1} & \textcolor{Green}{-1} & \textcolor{Green}{-1} & \textcolor{Green}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{-1} \\
\textcolor{Green}{-1} & \textcolor{Green}{1} & \textcolor{Green}{1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{1} & \textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{-1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} \\
\textcolor{Green}{1} & \textcolor{Green}{-1} & \textcolor{Green}{1} & \textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{-1} & \textcolor{WildStrawberry}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{1} & \textcolor{RoyalBlue}{-1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} \\
\textcolor{Green}{1} & \textcolor{Green}{1} & \textcolor{Green}{-1} & \textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{1} & \textcolor{WildStrawberry}{-1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{-1} & \textcolor{RoyalBlue}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1} & \textcolor{RedOrange}{1}
\end{pmatrix}.
$$
</div>

## Classical vs disruptive methods:  <br/> A David vs Goliath modern tale

*This post concludes the first part of the Hadamard Matrices series*.

In parts #1, #2 and #3, we
have delved into the mathematical formulation of the problem and classical attempts
at a solution.

Classical methods are old but gold! Yet more importantly, they allow specific orders of Hadamard
matrices to be **explicitly** found. Evidently, each construction method has its pros and cons...
As humans, our mathematical intuition to work on unfathomable orders can only
get us so far. These (and other) methods give us hope we can operate in larger
spaces, though.

But perhaps we need to think about *disruptive* algorithms since
the **classical ones won't do the job**. It's time to move forward and look
into fresher out-of-the-box technology-driven
routines.

In the second part of the series, and inspired by seemingly disparate domains, it's time to code! We will be using genetic and linguistic
algorithms (yes, you heard that right!), as well as more "conventional" Machine-Learning
algorithms, like Equivariant Graph Neural Networks, to tackle this astonishingly
simple-yet-complex combinatorial problem.

Stay tuned!

## References & Notes

[1] Regarding division, let's not bother with that for now, ok?
We encourage you to Google it for rings if you can't wait ㋡. \
[2] In our
[second post]({% post_url 2022-01-27-hadamard-matrices-2-an-introduction %}),
we talked about equivalence classes of Hadamard matrices. Congruence of integers
modulo $$m$$ serves the exact same purpose - both numbers are, for modular
arithmetical purposes, *equivalent*. \
[[3]](https://projecteuclid.org/journals/annals-of-statistics/volume-6/issue-6/Hadamard-Matrices-and-Their-Applications/10.1214/aos/1176344370.full)
For those keen to learn more about Hadamard matrices, this article gives a simple yet deep overview.
