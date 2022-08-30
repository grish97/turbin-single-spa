<template>
  <div class="career">
   <div class="career-content">
     <h1>Career VueJS application Running on the PORT 9002</h1>

     <div>
       Username: <strong>{{ credentials?.username }}</strong> <br />
       Access_Token: <strong>{{ credentials?.accessToken?.substring(0, 10) }}...</strong>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'MCareer',
  props: {
    credentials: Object,
  },
  created() {}
}
</script>

<style scoped>
.career {
  height: calc(100vh - 64px);
  background-color: #f0f2f5;
}

.career-content {
  width: calc(100% - 100px);
  margin: 0 50px;
  padding: 45px 20px;
  min-height: 500px;
  max-height: inherit;
  background-color: white;
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
}

.career-content h1 {
  color: #2491fc;
}
</style>
