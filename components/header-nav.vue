<template>
    <div class="card">
        <Menubar :model="items">
            <template #start>
                <Image src="/img/inductiva-logo-white.svg" alt="Image" width="120" />
            </template>
            <template #item="{ item, props }">
                <a v-ripple class="flex align-items-center" v-bind="props.action">
                    <span class="ml-2" :to="item.to">
                        <NuxtLink activeClass="active-option" class="custom-link" :to="item.to">
                            {{ item.label }}
                        </NuxtLink>
                    </span>
                </a>
            </template>
            <template #end>
                <Button label="Request access" severity="secondary" />
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
    {
        label: 'Resources',
        to: "/"
    },
    {
        label: 'Insights',
        to: "/insights"
    },
    {
        label: 'Careers',
        to: "/careers"
    },
    {
        label: 'About',
        to: "about"
    },
    {
        label: 'Contact',
        to: "contact"
    }
]);
</script>
