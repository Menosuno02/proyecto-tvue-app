<template>
  <div>
    <div class="logo">
      <h2>T<span>Vue</span></h2>
    </div>
    <div class="logo">
      <h3>Tu <span>VUE</span>scador de series</h3>
    </div>
    <div class="d-flex justify-content-center">
      <form class="search-bar d-flex justify-content-center">
        <input type="text" placeholder="Encuentra tu serie" v-model="queryBúsqueda" />
        <button type="submit">
          <uil-search class="search-icon" />
        </button>
      </form>
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
    onMounted(() => {
      fetch(`https://api.themoviedb.org/3/search/tv?api_key=${enviroment.apikey}&language=es-ES&page=1&include_adult=false&query=${queryBúsqueda.value}`)
        .then(response => response.json())
        .then(data => {
          series.value = data.results.filter(serie => serie.poster_path !== null && serie.backdrop_path !== null)
          queryBúsqueda.value = ""
        });
    });
    watch(() => queryBúsqueda.value,
      async () => {
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${enviroment.apikey}&language=es-ES&page=1&include_adult=false&query=${queryBúsqueda.value}`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            series.value = data.results.filter(serie => serie.poster_path !== null && serie.backdrop_path !== null)
          });
      })
    return {
      queryBúsqueda,
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
</style>