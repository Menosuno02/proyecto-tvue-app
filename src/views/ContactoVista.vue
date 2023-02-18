<template>
    <div class="container">
        <form class="bg-light row d-flex justify-content-center" @submit.prevent="enviar" v-if="!enviado">
            <h1 class="text-center d-2">Formulario de contacto</h1>
            <h2 class="text-center d-4">¿Alguna duda? Nosotros te ayudamos</h2>
            <div class="row form-group">
                <label for="nombre" class="col-2 col-form-label">Nombre</label>
                <div class="col-10">
                    <input v-model="nombre" type="text" class="form-control" id="nombre" placeholder="Introduce tu nombre">
                </div>
            </div>

            <div class="row form-group">
                <label for="email" class="col-2 col-form-label">Email</label>
                <div class="col-10">
                    <input v-model="email" type="email" class="form-control" id="email" placeholder="Introduce tu email">
                </div>
            </div>

            <div class="row form-group">
                <label for="tipo" class="col-2 col-form-label">Selecciona la tipo de pregunta</label>
                <div class="col-10">
                    <select v-model="tipo" class="form-select" id="tipo">
                        <option>Duda</option>
                        <option>Pregunta</option>
                        <option>Sugerencia</option>
                        <option>Otro</option>
                    </select>
                </div>
            </div>

            <div class="row form-group">
                <label for="asunto" class="col-2 col-form-label">Asunto</label>
                <div class="col-10">
                    <textarea id="asunto" v-model="asunto" for="asunto" class="form-control" rows="3"
                        placeholder="..."></textarea>
                </div>
            </div>

            <div class="row form-group">
                <label for="fichero" class="col-2 col-form-label">Fichero</label>
                <div class="col-10">
                    <input type="file" class="form-control-file" id="fichero">
                </div>
            </div>
            <input class="submit" type="submit" value="Enviar">
        </form>

        <div v-if="enviado" class="submitted bg-light row d-flex justify-content-center">
            <div class="row form-group">
                <h2>Gracias por tu tiempo</h2>
            </div>
            <div class="row form-group">
                <p>Nombre: {{ nombre }}</p>
            </div>
            <div class="row form-group">
                <p>Email: {{ email }}</p>
            </div>
            <div class="row form-group">
                <p>Tipo de pregunta: {{ tipo }}</p>
            </div>
            <div class="row form-group">
                <p>Asunto: {{ asunto }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            select: "",
            asunto: "",
            fichero: "",
            enviado: false
        };
    },
    methods: {
        enviar: function () {
            this.enviado = true
        }
    },
};
</script>
<style scoped>
form,
.submitted {
    padding: 10px;
    border-radius: 5px;
}

input,
select,
textarea {
    padding: 4px 8px;
    margin: 4px;
}

span {
    font-size: 18px;
    margin: 4px;
    font-weight: 500;
}

.submit {
    font-size: 15px;
    color: #fff;
    background-color: #222;
    padding: 6px 12px;
    border: none;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 500ms;
}

.submit:hover {
    background-color: #3EAF7C;
}
</style>