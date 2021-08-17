<template>
  <b-container class="step-node">
    <b-form-group v-slot="{ ariaDescribedby }">
      <b-row class="justify-content-center">
        <b-form-radio
          v-for="{ label, value, name } in options"
          :key="value"
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          :name="name"
          :value="value"
          class="mx-2"
          @change="onChange"
          >{{ label }}</b-form-radio
        >
      </b-row>
    </b-form-group>
  </b-container>
</template>

<script>
import { sizeOptions } from "@/services/constants.js";

export default {
  name: "StepOne",

  data() {
    return {
      selected: 5,
      options: sizeOptions
    };
  },

  methods: {
    onChange() {
      this.$store.commit("UPDATE_SIZE", this.selected);
    }
  }
};
</script>
