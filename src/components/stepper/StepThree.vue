<template>
  <b-container class="step-node text-left">
    <b-row class="justify-content-center w-100">
      <b-col lg="6" sm="12">
        <b-form novalidate class="w-100">
          <b-form-group>
            <b-form-input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Name"
              v-validate="'required'"
              name="name"
              :class="{ 'input-error': errors.has('name') }"
            />
            <small v-if="errors.has('name')" class="text-danger">
              {{ errors.first("name") }}
            </small>
          </b-form-group>

          <b-form-group>
            <b-form-input
              id="address"
              v-model="form.address"
              type="text"
              placeholder="Address"
              v-validate="'required'"
              name="address"
              :class="{ 'input-error': errors.has('address') }"
            />
            <small v-if="errors.has('address')" class="text-danger">
              {{ errors.first("address") }}
            </small>
          </b-form-group>

          <b-form-group>
            <b-form-input
              id="phone"
              v-model="form.phone"
              type="text"
              placeholder="Phone number"
              name="phone"
            />
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StepThree",

  data() {
    return {
      form: {
        name: "",
        address: "",
        phone: ""
      }
    };
  },

  computed: {
    ...mapGetters(["user"])
  },

  watch: {
    form: {
      immediate: true,
      deep: true,
      async handler() {
        const validation = await this.$validator.validateAll();
        if (validation) {
          this.$store.commit("UPDATE_USER", this.form);
        }
      }
    },
    user: {
      immediate: true,
      deep: true,
      handler() {
        if (this.user.name && this.user.address) {
          this.$emit("can-continue", { value: true });
        }
      }
    }
  }
};
</script>
