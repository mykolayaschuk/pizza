import Vue from "vue";
import Vuex from "vuex";
import { sizeOptions } from "@/services/constants.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    size: 5,
    toppings: [],
    user: {
      name: "",
      address: "",
      phone: ""
    },
    orders: []
  },
  getters: {
    size(state) {
      return state.size;
    },
    toppings(state) {
      return state.toppings;
    },
    user(state) {
      return state.user;
    },
    orders(state) {
      return state.orders;
    }
  },
  mutations: {
    UPDATE_SIZE(state, payload) {
      Vue.set(state, "size", payload);
    },
    UPDATE_TOPPINGS(state, payload) {
      Vue.set(state, "toppings", payload);
    },
    UPDATE_USER(state, payload) {
      Vue.set(state, "user", payload);
    },
    INIT_FORM(state) {
      Vue.set(state, "size", 5);
      Vue.set(state, "toppings", []);
      Vue.set(state, "user", {
        name: "",
        address: "",
        phone: ""
      });
    },
    ADD_ORDER(state) {
      const size = sizeOptions.find(option => option.value === state.size);

      let toppingsLabelAry = [],
        toppingsPriceAry = [];

      state.toppings.map(topping => {
        const toppingAry = topping.split("_");
        toppingsLabelAry = [...toppingsLabelAry, toppingAry[0]];
        toppingsPriceAry = [...toppingsPriceAry, toppingAry[1]];
      });
      const toppingsLabel = toppingsLabelAry.join(",");
      toppingsPriceAry = toppingsPriceAry.sort((a, b) => Number(a) - Number(b));
      let totalPrice = toppingsPriceAry.reduce(
        (a, b) => Number(a) + Number(b),
        0
      );
      if (toppingsPriceAry.length > 2 && toppingsPriceAry.length <= 4) {
        totalPrice -= toppingsPriceAry[0];
      } else if (toppingsPriceAry.length > 4) {
        totalPrice -= Number(toppingsPriceAry[0]) + Number(toppingsPriceAry[1]);
      }

      const newOrder = {
        size: size.label,
        toppings: toppingsLabel,
        user: state.user.name,
        price: Math.round(
          totalPrice + state.size + (totalPrice + state.size) * 0.15,
          2
        )
      };
      const result = [...state.orders, newOrder];

      Vue.set(state, "orders", result);
    }
  }
});
