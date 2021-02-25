<template>
  <div class="dashboard-container">
    <!-- <iframe src="http://localhost:3000/" width="100%" height="600px" frameborder="0" /> -->
    <iframe src="http://shawyoi.cn" width="100%" height="600px" frameborder="0" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
