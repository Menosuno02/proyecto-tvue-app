<template>
  <div>
    <div class="logo">
      <h2>T<span>Vue</span></h2>
    </div>
    <div class="logo">
      <h3>Tu <span>VUE</span>scador de series</h3>
    </div>
    <div class="d-flex justify-content-center">
      <form class="search-bar d-flex justify-content-center" @submit.prevent>
        <input type="text" placeholder="Encuentra tu serie" v-model="queryBúsqueda" />
        <button type="submit">
          <uil-search class="search-icon" />
        </button>
      </form>
    </div>
    <div id="btn-group" class="mt-5">
      <div v-for="genero in generos" :key="genero.id">
        <input type="checkbox" class="btn-check" :id="`${genero.id}`" :value="`${genero.id}`" v-model="generosSelected">
        <label class="btn btn-outline-success" :for="`${genero.id}`">{{ genero.name }}</label><br>
      </div>
    </div>
    <ListaSeries :series="series" />
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import enviroment from '@/enviroment.js';
import ListaSeries from '@/components/ListaSeries.vue';
import { UilSearch } from '@iconscout/vue-unicons';

export default {
  components: {
    ListaSeries,
    UilSearch,
  },
  setup() {
    const queryBúsqueda = ref("");
    const series = ref([]);
    const generos = ref([]);
    const generosSelected = ref([]);
    onMounted(() => {
      queryBúsqueda.value = ""
      fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${enviroment.apikey}&language=es-ES`)
        .then(response => response.json())
        .then(data => {
          generos.value = data.genres;
        });
    });

    watch(() => [queryBúsqueda.value, generosSelected.value],
      async () => {
        if (queryBúsqueda.value == "") {
          if (generosSelected.value.length == 0)
            series.value = [];
          else {
            fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${enviroment.apikey}&language=es-ES&include_adult=false&with_genres=${generosSelected.value.join(",")}`)
              .then(response => response.json())
              .then(data => {
                series.value = data.results.filter(serie => serie.poster_path !== null && serie.backdrop_path !== null)
              });
          }
        } else {
          fetch(`https://api.themoviedb.org/3/search/tv?api_key=${enviroment.apikey}&language=es-ES&include_adult=false&query=${queryBúsqueda.value}`)
            .then(response => response.json())
            .then(data => {
              series.value = data.results.filter(serie => serie.poster_path !== null && serie.backdrop_path !== null &&
                generosSelected.value.every(g => serie.genre_ids.includes(Number(g))))
            });
        }
      });
    return { queryBúsqueda, series, generos, generosSelected }
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
  font-weight: bold;
}

h3 {
  color: white;
  font-size: 30px;
  text-align: center;
}

span {
  color: #3EAF7C;
}

.search-bar {
  position: relative;
  width: 100%;
  margin-top: -20px;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  border-radius: 60px;
  padding: 10px 20px;
}

input {
  background: transparent;
  flex: 1;
  border: none;
  appearance: none;
  outline: none;
  padding: 24px 20px;
  font-size: 23px;
  color: #3EAF7C;
}

.search-bar::placeholder {
  color: rgba(62, 175, 124, 0.8);
}

button {
  border: none;
  outline: none;
  text-align: center;
  background: rgba(62, 175, 124, 0.8);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.search-icon {
  font-size: 25px;
  color: rgb(217, 217, 218, 0.8);
  transition: color 500ms;
}

button:hover>.search-icon {
  color: white;
}

#btn-group {
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 50%;
  margin-left: 25%;
}

.btn-outline-success {
  --bs-btn-color: #3EAF7C;
  --bs-btn-border-color: #3EAF7C;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #3EAF7C;
  --bs-btn-hover-border-color: #3EAF7C;
  --bs-btn-focus-shadow-rgb: 25, 135, 84;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #3EAF7C;
  --bs-btn-active-border-color: #3EAF7C;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #3EAF7C;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #3EAF7C;
  --bs-gradient: none;
}

.btn-outline-success:hover {
  color: var(--bs-btn-hover-color);
  background-color: var(--bs-btn-hover-bg);
  border-color: var(--bs-btn-hover-border-color);
}
</style>