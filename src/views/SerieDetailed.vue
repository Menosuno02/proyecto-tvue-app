<template>
    <div class="serie-banner">
        <a @click="$router.go(-1)">
            <uil-arrow-left class="back-button" />
        </a>
        <img :src="`https://image.tmdb.org/t/p/original/${serie.backdrop_path}`" :alt="serie.title + ' poster'"
            class="serie-backdrop" />
        <div class="serie-poster">
            <img :src="`https://image.tmdb.org/t/p/original/${serie.poster_path}`" :alt="serie.title + ' poster'" />
        </div>
        <div class="serie-detail">
            <div class="serie-text">
                <h2>{{ serie.name }}</h2>
                <h4>{{ serie.tagline }}</h4>
                <div v-for="genero in generos" :key="genero.id" class="serie-generos">
                    <span v-if="generos.indexOf(genero) !== generos.length - 1" class="genero-name"><i>{{ genero.name }},
                        </i></span>
                    <span v-else class="genero-name"><i>{{ genero.name }}</i></span>
                </div>
                <div class="serie-datos">
                    <span>{{ serie.number_of_seasons }} temporada/s, {{ serie.number_of_episodes
                    }} episodio/s</span>
                    <span><uil-schedule class="icon" />{{ anyos }} </span>
                    <span><uil-star class="icon" />{{ rating }}</span>
                </div>
                <p>{{ serie.overview }}</p>
            </div>
        </div>
    </div>

    <div class="serie-detail">

    </div>
</template>
<script>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import env from '@/enviroment.js';
import { UilSchedule, UilStar, UilArrowLeft } from '@iconscout/vue-unicons';

export default {
    components: {
        UilSchedule,
        UilStar,
        UilArrowLeft,
    },

    setup() {
        const serie = ref({});
        const route = useRoute();
        const generos = ref([]);
        const rating = ref("");
        const anyos = ref("");
        onBeforeMount(() => {
            fetch(`https://api.themoviedb.org/3/tv/${route.params.id}?api_key=${env.apikey}&language=es`)
                .then(response => response.json())
                .then(data => {
                    serie.value = data;
                    generos.value = serie.value.genres;
                    rating.value = serie.value.vote_average.toFixed(1);
                    anyos.value = serie.value.first_air_date.slice(0, 4) +
                        " - " + serie.value.last_air_date.slice(0, 4);
                })
        });

        return { serie, route, generos, rating, anyos }
    }
}
</script>
<style lang="scss" scoped>
* {
    text-shadow: 0px 0px 15px black;
}

.back-button {
    color: black;
    font-size: 40px;
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    transition: color 500ms;
}

.back-button:hover {
    color: white;
}

svg.back-button {
    background: rgba(62, 175, 124, 0.8);
    border-radius: 50%;
    cursor: pointer;
}

.serie-banner {
    position: relative;
    width: 100%;
    min-height: 91vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, rgba(120, 120, 120, 0.2), 30%, rgba(0, 0, 0, 0.7));

    .serie-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    .serie-detail {
        display: flex;
        justify-content: flex-start;
        width: 80%;

        .serie-text {
            color: white;
            margin-left: 40px;
            height: 100%;
            position: relative;
            background-color: rgb(237, 237, 237, 0.25);
            border-radius: 20px;
            padding: 20px;
            max-width: 80%;

            h2 {
                font-size: 60px;
                font-weight: 600;
                margin-bottom: 7px;
                max-width: 80%;
                line-height: 100%;
            }

            h4 {
                font-size: 20px;
                font-weight: 500;
                margin-bottom: 15px;
                letter-spacing: 2px;
            }

            .serie-generos {
                display: inline;

                .genero-name {
                    font-size: 17px;
                    font-weight: 300;
                }
            }

            .serie-datos {
                margin-top: 5px;
                margin-bottom: 15px;
                font-size: 14px;
                font-weight: 300;
                display: flex;
                column-gap: 15px;

                svg.icon.ui-svg-inline.icon {
                    margin-bottom: 7px;
                }

                span .icon {
                    margin-right: 4px;
                    font-size: 14px;
                    position: relative;
                    top: 2px;
                }
            }
        }

        p {
            max-width: 60%;
            font-weight: 200;
            font-size: 16px;
            letter-spacing: 1px;
        }
    }
}

.serie-poster {
    position: relative;
    width: 400px;
    height: auto;
    margin-left: 120px;
}

.serie-poster img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 0 10px black;
}
</style>