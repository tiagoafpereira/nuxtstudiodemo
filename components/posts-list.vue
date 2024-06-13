<template>
    <main>
        <div class="flex justify-content-around align-items-evenly flex-wrap" style="min-height: 200px">
            <PostsCards v-for="card in cards" :key="card.id" :title="card.title" :imgSrc="card.imgSrc"
                :link="card.link" :description="card.description"/>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            cards: [
                {
                    id: 1,
                    title: "Benchmarkings Parse",
                    description: "Discover the 3D model mesh resolution threshold that still yields stable and dependable estimations of physical properties in engineering simulations.",
                    imgSrc: "74b9611a5f8152a3cf1d994bbf3f0283.png",
                    link: "/insights/benchmarkingsparse"
                },
                {
                    id: 2,
                    title: "Coastal Protection",
                    description: "Discover the 3D model mesh resolution threshold that still yields stable and dependable estimations of physical properties in engineering simulations.",
                    imgSrc: "717225c7727d794e993dc29f33034aa4.png",
                    link: "/insights/coastalprotection"
                },
                {
                    id: 3,
                    title: "Hadamard Matrices",
                    description: "Discover the 3D model mesh resolution threshold that still yields stable and dependable estimations of physical properties in engineering simulations.",
                    imgSrc: "03475283220e1db5e7af16bc528a24e4.png",
                    link: "/insights/hadamardmatrices"
                },
                {
                    id: 4,
                    title: "Inductiva API v0.4",
                    description: "Discover the 3D model mesh resolution threshold that still yields stable and dependable estimations of physical properties in engineering simulations.",
                    imgSrc: "74b9611a5f8152a3cf1d994bbf3f0283.png",
                    link: "/insights/inductivaapiv04"
                },
                // {
                //     id: 5,
                //     title: "Molecules Binding",
                //     description: "Discover the 3D model mesh resolution threshold that still yields stable and dependable estimations of physical properties in engineering simulations.",
                //     imgSrc: "molecules_binding_1/drugdiscovery_timeline.jpg",
                //     link: "/moleculesbinding"
                // }
            ]
        }
    }
}
</script>

<style scoped></style>