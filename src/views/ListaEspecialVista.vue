<template>
    <div>
        <div class="logo">
            <h2>{{ titulo }}</h2>
        </div>
        <ListaSeries :series="series" />
    </div>
</template>

<script>
import { ref, onUpdated, onMounted } from 'vue';
import enviroment from '@/enviroment.js';
import ListaSeries from '@/components/ListaSeries.vue';

export default {
    props: ['tipo'],
    components: {
        ListaSeries
    },
    setup(props) {
        const titulo = ref("");
        const series = ref([]);
        function showLista() {
            let link = ``;
            if (props.tipo == "mejorvotadas") {
                titulo.value = "Series mejor votadas";
                link = `https://api.themoviedb.org/3/tv/top_rated?api_key=${enviroment.apikey}&language=es-ES&page=1&include_adult=false&page=1`;
            } else {
                titulo.value = "Series más populares";
                link = `https://api.themoviedb.org/3/tv/popular?api_key=${enviroment.apikey}&language=es-ES&page=1&include_adult=false&page=1`;
            }
            fetch(link)
                .then(response => response.json())
                .then(data => {
                    series.value = data.results.filter(serie => serie.poster_path !== null && serie.backdrop_path !== null)
                });
        }
        onMounted(() => {
            showLista();
        });
        onUpdated(() => {
            showLista();
        });
        return { series, titulo }
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