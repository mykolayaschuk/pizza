<template>
  <b-container class="step-node">
    <b-row class="justify-content-center w-100">
      <b-col>
        <b-form-group>
          <b-form-checkbox-group
            v-model="selected"
            name="topping-group"
            class="checkbox-group"
            @change="onChange"
          >
            <b-form-checkbox
              v-for="{ label, value } in options"
              :key="value"
              :value="value"
              class="checkbox-group__item"
              >{{ label }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { toppingOptions } from "@/services/constants.js";

export default {
  name: "StepTwo",

  data() {
    return {
      selected: [],
      options: toppingOptions
    };
  },

  computed: {
    ...mapGetters(["toppings"])
  },

  watch: {
    toppings: {
      immediate: true,
      deep: true,
      async handler() {
        if (this.toppings.length) {
          this.$emit("can-continue", { value: true });
        }
      }
    }
  },

  methods: {
    onChange() {
      if (this.selected.length && this.selected.length <= 6) {
        this.$store.commit("UPDATE_TOPPINGS", this.selected);
      } else {
        window.alert("You could select 6 toppings maximum!");
        this.selected.pop();
      }

      const lastTopping = this.selected.at(-1);
      if (lastTopping === "bacon_1") {
        if (this.selected.includes("mozzarella_3")) {
          window.alert("You could not choose Bacon with Mozzarella!");
          this.selected.pop();
        }
      } else if (lastTopping === "mozzarella_3") {
        if (this.selected.includes("bacon_1")) {
          window.alert("You could not choose Mozzarella with Bacon!");
          this.selected.pop();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  &__item {
    margin: 5px;
    margin-left: 30%;
  }
}
</style>
