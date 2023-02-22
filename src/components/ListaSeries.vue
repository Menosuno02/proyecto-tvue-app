<template>
  <div class="serie-list">
    <div class="serie-card" v-for="serie in series" :key="serie.id">
      <router-link :to="'/serie/' + serie.id" class="serie-link">
        <div class="serie-poster">
          <img :src="`https://image.tmdb.org/t/p/original/${serie.backdrop_path}`" :alt="serie.title" />
        </div>
        <div class="serie-detail">
          <h3>{{ serie.name }}</h3>
          <div class="serie-ratings">
            <span>{{ serie.vote_average }}</span><uis-star class="star-icon" />
          </div>
          <div class="overview">
            <p v-if="serie.overview != ''">{{ serie.overview }}</p>
            <p v-else>Entra para ver más detalles</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { UisStar } from '@iconscout/vue-unicons-solid';
export default {
  props: ['series'],
  components: {
    UisStar,
  }
}
</script>

<style lang="scss">
.serie-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 80px;
  max-height: 75%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .serie-card {
    flex: 1 1 33.33%;
    position: relative;
    background-color: transparent;
    overflow: hidden;

    .serie-poster {
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        transition: 0.5s;
      }

      &::before {
        content: "";
        position: absolute;
        bottom: -170px;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, grey 5%, transparent);
        transition: 0.5s;
        z-index: 1;
      }
    }

    &:hover {
      .serie-poster::before {
        bottom: 0px;
      }

      .serie-poster {
        img {
          transform: translateY(-50px);
          filter: blur(3px);
        }
      }

      .serie-detail {
        bottom: 8px;
      }
    }

    .serie-detail {
      position: absolute;
      bottom: -78px;
      left: 0;
      padding: 20px;
      width: 100%;
      z-index: 2;
      transition: 0.5s;

      h3 {
        color: white;
        font-weight: 500;
        font-size: 28px;
        text-shadow: 0 0 10px black;
      }

      .serie-ratings {
        margin-bottom: 30px;
      }

      span {
        color: rgb(237, 237, 237, 0.9);
        font-weight: 400;
        font-size: 18px;
        text-shadow: 0 0 10px black;
      }

      p {
        color: white;
        font-weight: 200;
        font-size: 14px;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 50px;
      }

      .star-icon {
        color: #3EAF7C;
        margin-left: 4px;
        margin-bottom: 5px;
        text-shadow: 0 0 10px black;
      }
    }
  }
}
</style>