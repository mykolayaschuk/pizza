<template>
  <b-container class="text-right">
    <router-link to="/">
      <b-button variant="primary" class="mb-3">New order</b-button>
    </router-link>
    <b-table striped hover :items="orders" bordered outlined></b-table>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Orders",

  computed: {
    ...mapGetters(["orders"])
  }
};
</script>
