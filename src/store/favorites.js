import { ref, computed } from 'vue';

const favorites = ref([]);
const ids = ref([]);

const checkFavs = (serie) => {
    if (!ids.value.includes(serie.id)) {
        favorites.value.push(serie);
        ids.value.push(serie.id);
    } else {
        const index = ids.value.findIndex((id) => id === serie.id);
        favorites.value.splice(index, 1);
        ids.value.splice(index, 1);
    }
};

const getFavorites = computed(() => favorites.value);

export { checkFavs, getFavorites };
