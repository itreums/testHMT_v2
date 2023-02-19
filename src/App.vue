<script setup>
import RegisterForm from './components/RegisterForm.vue'
</script>

<template>
    <v-app 
        id="app"     
    >
        <v-main
            class="d-flex align-center"        
        >
            <v-container 
                fluid
            >
                    <v-row 
                        justify="center"
                    >
                        <v-col
                            cols="12"
                            xs="12"
                            sm="6"
                            md="4"
                            lg="4"
                            xl="3"
                        >
                            <RegisterForm />
                        </v-col>
                    </v-row>
            </v-container>
        
        </v-main>
        
    </v-app>
</template>

<style scoped>
#app{
    background-color:#ebebeb
}


</style>
