<template>
        <div style="text-align:center" class="flex sm:justify-center max-w-lg sm:mx-auto">
            <img style="width: 100%;" :src="`/img/articles/${imgSrc}`" class="mb-1">
        </div>
        <span class="sm:text-center text-base mt-0">
            <slot />
        </span>
</template>

<script>
export default {
    props: {
        imgSrc: String,
    },
};
</script>