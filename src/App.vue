<template>
  <header>
    <div class="header-container">
      <router-link to="/">
        <h1>T<span>Vue</span></h1>
      </router-link>
      <div style="flex-grow: 2;"></div>
      <router-link to="/mejorvotadas" class="el-lista">
        <span class="source">Mejor votadas</span>
      </router-link>
      <router-link to="/populares" class="el-lista">
        <span class="source">Populares</span>
      </router-link>
      <router-link to="/contacto" class="el-lista">
        <span class="source">Contacto</span>
      </router-link>
    </div>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

body {
  background-color: #0e1015;
}

h1 {
  font-weight: bold;
}

h1 span {
  color: #3EAF7C !important;
}

header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 30px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100vw;
}

a {
  text-decoration: none;
  color: white;
}

.el-lista {
  flex-grow: 0.1;
  text-align:right;
  transition: color 500ms;
}

.el-lista:hover {
  color: #3EAF7C;
}

.source {
  margin-right: 5px;
  position: relative;
  top: -4px;
}
</style>
