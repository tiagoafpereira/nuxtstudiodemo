<template>
  <!-- <PostHeader /> -->
  <div class="post-header">
    <!-- TODO: Add variables from post here -->
    This first part is static for now
    <!-- <h1>ggg{{ post.title}}</h1> -->
    <h1>Introducing the Genesis Program</h1>
    <p>June 11, 2024</p> <!-- {{ formatDate(post.date) }} -->
    <p class="flex flex-wrap justify-content-center align-items-center ju gap-4">
      <!-- Add a map here, post.authors maybe, something like that -->
    <div class="flex align-items-center">
      <Avatar label="L" class="mr-2" size="large" shape="circle" />
      <span class="flex flex-column align-items-start">
        <span class="font-bold">Luis Sarmento</span>
        <span>Author</span>
      </span>
    </div>
    <div class="flex align-items-center">
      <Avatar label="C" class="mr-2" size="large" shape="circle" />
      <span class="flex flex-column align-items-start">
        <span class="font-bold">Clara Gonçalves</span>
        <span>Author</span>
      </span>
    </div>

    </p>
  </div>
  <ContentDoc :document="post" class="nuxt-content">
    <template #empty></template>
  </ContentDoc>
  <!-- <h1>{{ article.title }} </h1> -->
  <!-- <p>{{ article.description }}</p>
    <img :src="article.img" :alt="article.alt" />
    <p>Article last updated: {{ formatDate(article.updatedAt) }}</p> -->
</template>



<script>
export default {
  async asyncData ({ $content, req }) {
    console.log("PARAMS-------------------------  ", params);
    const post = await $content('insights', params.slug).fetch();
    return { post };
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    },
  },
};
</script>


<!-- TODO: change styles, it's just a fastest solution for the demo -->
<style>
.nuxt-content {
  padding: 5% 20%;
  line-height: 1.6;
  text-align: justify;
  color: rgb(217, 217, 217);
}

.nuxt-content h1 {
  font-size: 2.5rem;
}

.nuxt-content h1,
h2,
h3,
a,
strong {
  color: #fff;

}

.nuxt-content a {
  font-weight: bold;
}

.post-header {
  text-align: center;
  margin-top: 5%;
}
</style>