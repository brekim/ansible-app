<template>
    <div>
        <b-modal id="login-modal" ok-title="Submit" ok-variant="success">
            <template v-slot:modal-title>
                User Login
            </template>
            <b-form @submit="login" @reset="cancel" v-if="show"> 
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
            show: true
        }
    },
    methods: {
        login(evt) {
            evt.preventDefault();
            alert("Logged in!");
        },
        cancel(evt) {
            evt.preventDefault();
            this.form.username = ''
            this.form.password = ''
            this.form.checked = []
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>