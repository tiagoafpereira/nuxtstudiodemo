<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <article>
        <h1>{{ doc.title }}</h1>
        <div class="authors">
          <template v-for="author in doc.authors">
            <Author :name="author.name" />
          </template>
        </div>
        <img class="header-image" :src="doc.image" />
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </main>
</template>

<style lang="css" scoped>
.authors {
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 20px;
}

.header-image {
  display: flex;
  justify-content: center;
  margin: auto;
  max-width: 500px;
}
</style>
