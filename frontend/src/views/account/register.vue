<template>
  <div class="row">
    <div class="col-lg-6 offset-lg-3">
      <div class="card text-black bg-light">
        <div class="card-body">
          <form @submit.prevent="submit">
            <h2>Register</h2>
            <p>Please provide required information to create an account.</p>

            <div class="form-group">
              <label>Fake Email</label>
              <input
                v-model="form.model.email"
                class="form-control"
                type="text"
                autocomplete="email"
                placeholder="email"
                name="email">
            </div>

            <div class="form-group">
              <label>Name</label>
              <input
                v-model="form.model.name"
                class="form-control"
                type="text"
                placeholder="Name"
                name="name">
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                v-model="form.model.password"
                class="form-control"
                type="password"
                autocomplete="new-password"
                placeholder="Password"
                name="password">
            </div>

            <div class="form-group">
              <label>Confirm Password</label>
              <input
                v-model="form.model.confirmPassword"
                class="form-control"
                type="password"
                autocomplete="new-password"
                placeholder="Confirm Password"
                name="confirmPassword">
            </div>

            <input
              :disabled="errors.any()"
              class="btn btn-primary btn-block"
              type="submit"
              value="Register">

            <br>

            <router-link
              class="btn-link"
              to="/auth/login">
              Already have an account?
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        model: {
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
        },
      },
    }
  },
  methods: {
    ...mapActions(['register']),

    submit() {
      //this.$validator.validateAll().then(res => {
        //if (res) {
          this.register(this.form.model)
        //} else {
         // Swal.fire({
            //title: 'Not so fast!',
            //text: 'Please provide required data in valid format',
            //icon: 'warning',
          //})
        //}
      //})
    },
  },
}
</script>

<style lang='stylus'>
</style>
