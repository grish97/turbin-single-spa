<template>
  <div class="career">
    <h1>Career VueJS application Running on the PORT 9002</h1>

    <h3>Current logged user credentials in this Vue project</h3>
    <div>
      ID: <strong>{{ credentials?.id }}</strong> <br />
      Username: <strong>{{ credentials?.username }}</strong> <br />
      Access_Token: <strong>{{ credentials?.accessToken?.substring(0, 10) }}...</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Career',
  props: {
    credentials: Object,
  },
  created() {}
}
</script>

<style scoped>
  .career {
    padding: 55px;
  }
</style>
