<template>

    <Card class="card mt-8" style="width: 25rem; overflow: hidden" @click="redirectToLink(props.link)">
        <template #header>
            <img class="w-full" v-if="props.imgSrc" :src="`/img/articles/${props.imgSrc}`">
        </template>
        <template #title>{{ props.title }}</template>
        <template #subtitle>{{ props.description }}</template>
        <template #content>
            <p class="m-0 flex align-items-center">
                <Avatar label="L" class="mr-2" size="large" shape="circle" />
                <span>Luis Sarmento</span>
            </p>
        </template>
        <template #footer>
            <div class="flex justify-content-start gap-2 flex-wrap mt-2">
                <Tag severity="secondary" value="Keyword"></Tag>
                <Tag severity="secondary" value="Keyword"></Tag>
                <Tag severity="secondary" value="Keyword"></Tag>
                <Tag severity="secondary" value="Keyword"></Tag>
                <Tag severity="secondary" value="Keyword"></Tag>
            </div>
        </template>
    </Card>

</template>
<script setup>
// defineProps({
//   to: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
// });
const props = defineProps({
    imgSrc: String,
    title: String,
    description: String,
    link: String
})

function redirectToLink(link) {
    window.location = link
}
</script>

<style scoped>
.card {
    width: 20%;
    margin: 10px;
}
</style>