<template>
    <div>
        <div class="logo">
            <h2>Series más populares</h2>
        </div>
        <ListaSeries :series="series" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import enviroment from '@/enviroment.js';
import ListaSeries from '@/components/ListaSeries.vue';

export default {
    components: {
        ListaSeries
    },
    setup() {
        const series = ref([]);
        onMounted(() => {
            fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${enviroment.apikey}&language=es&page=1&include_adult=false&page=1`)
                .then(response => response.json())
                .then(data => {
                    series.value = data.results.filter(serie => serie.poster_path !== null && serie.backdrop_path !== null)
                })
        });

        return {
            series
        }
    }
}
</script>

<style scoped>
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100px;
}

h2 {
    color: white;
    font-size: 60px;
    position: relative;
    top: 25px;
}
</style>