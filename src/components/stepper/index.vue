<template>
  <b-container>
    <b-row>
      <b-col>
        <horizontal-stepper
          :steps="steps"
          @completed-step="completeStep"
          @active-step="isStepActive"
          @stepper-finished="completeForm"
          :keep-alive="true"
          ref="stepper"
        >
        </horizontal-stepper>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HorizontalStepper from "vue-stepper";
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    HorizontalStepper
  },
  data() {
    return {
      steps: [
        {
          icon: "map",
          name: "first",
          title: "Choose pizza size",
          subtitle: "You can choose only one.",
          component: StepOne,
          completed: false
        },
        {
          icon: "category",
          name: "second",
          title: "Choose topping",
          subtitle: "You can choose 6 toppings maximum",
          component: StepTwo,
          completed: false
        },
        {
          icon: "person_outline",
          name: "third",
          title: "Customer details",
          subtitle: "Input your information correctly",
          component: StepThree,
          completed: false
        }
      ]
    };
  },

  computed: {
    ...mapGetters(["toppings", "user"])
  },

  methods: {
    // Executed when @completed-step event is triggered
    completeStep(payload) {
      this.steps.forEach(step => {
        if (step.name === payload.name) {
          step.completed = true;
        }
      });
    },
    // Executed when @active-step event is triggered
    isStepActive(payload) {
      if (payload.index === 0) {
        this.$nextTick(() => {
          this.$refs.stepper.proceed({ value: true });
        });
      } else if (payload.index === 1) {
        this.$nextTick(() => {
          if (this.toppings.length) this.$refs.stepper.proceed({ value: true });
          else this.$refs.stepper.proceed({ value: false });
        });
      } else {
        this.$nextTick(() => {
          if (this.user.name && this.user.address)
            this.$refs.stepper.proceed({ value: true });
          else this.$refs.stepper.proceed({ value: false });
        });
      }
    },
    // Executed when @stepper-finished event is triggered
    completeForm() {
      this.$store.commit("ADD_ORDER");
      this.$store.commit("INIT_FORM");

      this.$router.push({ name: "orders" });
    }
  }
};
</script>
