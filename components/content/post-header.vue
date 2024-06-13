<template>
    <div class="post-header">
        <!-- TODO: Add variables from post here -->
        This first part is static for now
        <!-- <h1>{{ post.title}}</h1> -->
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
</template>