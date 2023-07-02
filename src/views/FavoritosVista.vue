<template>
    <div>
        <div class="logo">
            <h2>{{ titulo }}</h2>
        </div>
        <ListaSeries :series="series" />
    </div>
</template>

<script>
import { ref, onMounted, inject, computed } from 'vue';
import ListaSeries from '@/components/ListaSeries.vue';

export default {
    components: {
        ListaSeries,
    },
    setup() {
        const titulo = ref('');
        const { getFavorites } = inject('favorites');

        const series = computed(() => getFavorites.value);

        onMounted(() => {
        titulo.value = 'Series favoritas';
        });

        return {
        series,
        titulo,
        };
    },
};
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