<template>
    <div>
        <b-modal id="login-modal">
            <template v-slot:modal-title>
                User Login
            </template>
            <b-container fluid>
                <b-form @submit="login" @reset="cancel" v-if="show_form"> 
                    <b-form-group
                        id="username-group"
                        label="Username:"
                        label-for="username"
                    >
                        <b-form-input
                            id="username"
                            v-model="form.username"
                            required
                            placeholder="Enter name"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="password-group"
                        label="Password:"
                        label-for="password"
                    >
                        <b-form-input
                            id="password"
                            v-model="form.password"
                            required
                            placeholder="Enter password"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="remember">
                        <b-form-checkbox-group v-model="form.checked" id="remember-me">
                            <b-form-checkbox value="remember">Remember me</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </b-form>
            </b-container>
            <template v-slot:modal-footer>
                <div class="w-100">
                    <p class="float-left"> Don't have an account? Register <b-link to="/register" @click="$bvModal.hide('login-modal')">here.</b-link></p>
                    <b-button 
                        class="float-right"
                        variant="success"
                        style="margin-left: 10px;"
                        @click="login"
                    > Submit </b-button>
                    &nbsp;
                    <b-button 
                        class="float-right"
                        @click="cancel"
                    > Cancel </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                checked: []
            },
            show_form: true
        }
    },
    methods: {
        login(evt) {
            evt.preventDefault();
            this.$bvModal.hide('login-modal')
            this.form.username = ''
            this.form.password = ''
            this.form.checked = []
            this.show_form = true
            this.$nextTick(() => {
                this.show_form = true
            })
        },
        cancel(evt) {
            evt.preventDefault();
            this.$bvModal.hide('login-modal')
            this.form.username = ''
            this.form.password = ''
            this.form.checked = []
            this.show_form = true
            this.$nextTick(() => {
                this.show_form = true
            })
        }
    }
}
</script>