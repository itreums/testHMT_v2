<template>
    <v-card
        elevation="3"
        class="pa-5"
        
    >
        <v-card-title
            class="pa-0 pb-5"
        >Регистрация</v-card-title>
        <v-alert
            v-if="error"
            dismissible
            dense
            outlined
            v-model="error"
            type="error"
        >{{errorMsg}}</v-alert>

        <v-form
            v-if="isReg"
            lazy-validation
            ref="form"
            v-model="valid"
            @submit.prevent="register"
        >
            <v-text-field
                outlined
                dense
                v-model="user.secondName"
                label="Фамилия"     
                single-line
                class="rounded-lg"
                :rules="[rules.required, rules.counter]"   
            >
            </v-text-field>

            <v-text-field
                outlined
                dense
                v-model="user.firstName"
                label="Имя"   
                single-line
                class="rounded-lg"
                :rules="[rules.required, rules.counter]"
            >
            </v-text-field>

            <v-text-field
                outlined
                dense
                v-model="user.lastName"
                label="Отчество"
                class="rounded-lg"
                single-line
                :rules="[rules.counter]"
            >
            </v-text-field>

            <v-text-field
                prepend-inner-icon="email"
                outlined
                dense
                v-model="user.email"
                label="Email"
                class="rounded-lg"
                required
                single-line
                :rules="[rules.required,rules.email]"
            >
            </v-text-field> 

            
            <v-dialog
                ref="menu"
                v-model="menu"   
                width="300px"
                min-width="auto"
                persistent
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        single-line
                        dense
                        outlined
                        v-model="user.birthday"
                        label="Дата рождения"
                        prepend-inner-icon="mdi-calendar"
                        class="rounded-lg"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="[rules.required]"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="user.birthday"
                    :active-picker.sync="activePicker"
                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                    :rules="[rules.required]"
                    required
                ></v-date-picker>
            </v-dialog>
           

            <v-radio-group
                v-model="user.gender"
                dense
                row       
            >
                <template v-slot:label>
                    <div>Пол</div>
                </template>

                <v-radio 
                    label="М" 
                    value="male"
                ></v-radio>
                <v-radio 
                    label="Ж" 
                    value="female"
                ></v-radio>
            </v-radio-group>

            <v-select
                single-line
                outlined
                dense
                class="rounded-lg"
                label="Группа клиентов"
                v-model="user.group"
                
                :items="['VIP','Проблемные', 'OMC']"
            ></v-select>

            <v-checkbox
                class="mt-0"
                dense
                label="Не отправлять СМС"
                v-model="user.sendSMS"
            ></v-checkbox>

            <v-btn
                type="submit"
                block
                class="mt-2 white--text"
                color="indigo accent-2"  
                :loading="loading"
                :disabled="loading"
            >Зарегистрировать</v-btn>
            
        </v-form>

        <div 
           v-else
        >
            <v-alert
                type="success"
                class="mb-5"
            >Регистрация прошла успешно</v-alert>
            <v-btn
                block
                @click="reset"
            >Назад</v-btn>
        </div>
    </v-card>
</template>

<script>

  export default {
    data: () => ({
        user:{
            firstName:'',
            secondName:'',
            lastName:'',
            email:'',
            birthday:null,
            gender:'',
            group:'',
            sendSMS:false
        },
        error:false,
        errorMsg:'',
        isReg:true,

        rules:{
            required:value=>!!value || "Поле обязательно к заполнению",
            counter: value => value?.length <= 100 || `Максимальное количество символов 100`,
            email: value => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(value) || 'E-mail неверного формата',
        },

        valid: true,
        loading:false,

        activePicker: null,     
        menu: false,
    }),
    watch: {
        menu (val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    computed:{
        disabled(){
            if(this.user.firstName && this.user.secondName && this.user.birthday && this.user.email) return false
            return true
        }
    },
    methods: {
        save (date) {
            this.$refs.menu.save(date)
        },   
        
        register(){
            if(this.validate()){
                this.loading = true
                fetch('https://4255fe75-02f5-448a-81d2-882c03bf522e.mock.pstmn.io/',{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(this.user)
                })
                .then(response => response.json())
                .then(e=>{
                    if(e.register){
                        this.loading = false
                        this.isReg = false
                    }else{
                        throw ("something went wrong")
                    }
                    
                    
                })
                .catch(e=>{
                    this.loading = false
                    this.error=true
                    this.errorMsg=e
                })
            }else{
                // this.error=true
                // this.errorMsg="Not all field filled"          
            }
        },
        validate () {
            return this.$refs.form.validate()
        },
        async reset(){

            this.isReg = true
            await this.$nextTick()
            this.$refs.form.reset()

            
        }

    },
  }
</script>