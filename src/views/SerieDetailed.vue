<template>
    <div class="serie-banner">
        <img :src="`https://image.tmdb.org/t/p/original/${serie.backdrop_path}`" :alt="serie.title + ' poster'"
            class="serie-backdrop" />
        <div class="grid">
            <router-link to="/">
                <uil-arrow-left class="back-button" />
            </router-link>

            <uil-star @click="clickFavorites" class="fav-button" />

            <div class="serie-poster">
                <img :src="`https://image.tmdb.org/t/p/original/${serie.poster_path}`" :alt="serie.title + ' poster'" />
            </div>
            <div class="serie-detail">
                <div class="serie-text">
                    <h2>{{ serie.name }}</h2>
                    <h4>{{ serie.tagline }}</h4>
                    <div v-for="genero in generos" :key="genero.id" class="serie-generos">
                        <span v-if="generos.indexOf(genero) != generos.length - 1" class="genero-name"><i>{{ genero.name
                        }},
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

        <div class="actores-slides" v-if="actores.length > 0">
            <div class="serie-detail">
                <div class="serie-text">
                    <h3>Actores</h3>
                </div>
            </div>
            <vueper-slides class="no-shadow px-5 pt-5" :visible-slides="5" :arrows="false" :gap="3" :slide-ratio="1 / 4"
                :slideMultiple="true">
                <vueper-slide v-for="(slide, i) in actores" :key="i" :title="`${slide.name} (${slide.character})`">
                    <template #content>
                        <div class="card text-center">
                            <img class="card-img-top" :src="`https://image.tmdb.org/t/p/original/${slide.profile_path}`">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <p>{{ slide.name }}</p>
                                </h5>
                            </div>
                        </div>
                    </template>
                </vueper-slide>
            </vueper-slides>
        </div>
    </div>
</template>
<script>
import { ref, onBeforeMount, inject } from 'vue';
import { useRoute } from 'vue-router';
import env from '@/enviroment.js';
import { UilSchedule, UilStar, UilArrowLeft } from '@iconscout/vue-unicons';
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
    components: { UilSchedule, UilStar, UilArrowLeft, VueperSlides, VueperSlide },

    setup() {
        const serie = ref({});
        const route = useRoute();
        const generos = ref([]);
        const rating = ref("");
        const anyos = ref("");
        const actores = ref([]);
        const { checkFavs } = inject('favorites');
        const clickFavorites = () => {
            checkFavs(serie.value);
        };
        onBeforeMount(() => {
            fetch(`https://api.themoviedb.org/3/tv/${route.params.id}?api_key=${env.apikey}&language=es-ES`)
                .then(response => response.json())
                .then(data => {
                    serie.value = data;
                    generos.value = serie.value.genres;
                    rating.value = serie.value.vote_average.toFixed(1);
                    if (serie.value.first_air_date.slice(0, 4) == serie.value.last_air_date.slice(0, 4))
                        anyos.value = serie.value.first_air_date.slice(0, 4);
                    else
                        anyos.value = serie.value.first_air_date.slice(0, 4) + " - " + serie.value.last_air_date.slice(0, 4);
                });
            fetch(`https://api.themoviedb.org/3/tv/${route.params.id}/credits?api_key=${env.apikey}&language=es-ES`)
                .then(response => response.json())
                .then(data => { actores.value = data.cast; });
        });
        return { serie, route, generos, rating, anyos, actores, clickFavorites, }
    }
}
</script>
<style lang="scss" scoped>
.back-button, .fav-button {
    color: black;
    font-size: 40px;
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    transition: color 500ms;
}

.fav-button {
    position: absolute;
    left: 7vh;
}

.back-button:hover, .fav-button:hover {
    color: white;
}

svg.back-button, svg.fav-button {
    background: rgba(62, 175, 124, 0.8);
    border-radius: 50%;
    cursor: pointer;
}

.serie-banner {
    position: relative;
    width: 100%;
    min-height: 91vh;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, rgba(120, 120, 120, 0.2), 30%, rgba(0, 0, 0, 0.7));

    .grid {
        position: relative;
        width: 100%;
        min-height: 91vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .serie-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    .serie-poster {
        position: relative;
        width: 400px;
        height: auto;
        margin-left: 120px;

        img {
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 0 10px black;
        }
    }

    .serie-detail {
        display: flex;
        justify-content: flex-start;
        width: 80%;

        .serie-text {
            color: white;
            height: 100%;
            position: relative;
            background-color: rgb(237, 237, 237, 0.3);
            border-radius: 20px;
            padding: 20px;
            margin-left: 40px;
            max-width: 80%;
            text-shadow: 0 0 10px black;

            h2 {
                font-size: 60px;
                margin-bottom: 7px;
                max-width: 80%;
                line-height: 100%;
                font-weight: bold;
            }

            h3 {
                font-size: 40px;
                font-weight: bold;
            }

            h4 {
                font-size: 20px;
                margin-bottom: 15px;
                letter-spacing: 2px;
            }

            .serie-generos {
                display: inline;

                .genero-name {
                    font-size: 17px;
                }
            }

            .serie-datos {
                margin-top: 5px;
                margin-bottom: 15px;
                font-size: 14px;
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

            p {
                max-width: 70%;
            }
        }

        p {
            font-size: 16px;
            letter-spacing: 1px;
        }
    }

    vueper-slide {
        height: 150%;
    }

    .actores-slides {
        padding-bottom: 20px;
    }
}

.card {
    width: 100%;
    height: 100%;
    position: relative;

    .card-img-top {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    .card-title {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(62, 175, 124, 0.8);
        color: white;
        width: 100%;
        height: 10%;
        border-radius: 5px 5px 0 0;
        padding-top: 8%;
        font-size: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: center;
    }
}
</style>
<style>
.vueperslides__bullets button {
    color: rgba(62, 175, 124, 0.9) !important;
}
</style>