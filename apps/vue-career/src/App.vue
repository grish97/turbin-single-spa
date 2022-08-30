<template>
  <MCareer :credentials="credentials" />
</template>

<script>
import MCareer from "@/components/Career";
import { authSubject$ } from "@turbo/services";

export default {
  components: {
    MCareer
  },
  data () {
    return {
      credentials: authSubject$.getValue().user,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
