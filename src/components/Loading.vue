<!--  -->
<template>
  <div class="loading">
    <img src="@/images/1.gif" alt="" />
  </div>
</template>


<style lang='less'>
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  img {
    position: relative;
    top: 50%;
    left: 50%;
    width: 30rem;
    height: 30rem;
    margin-left: -15rem;
    margin-top: -15rem;
  }
}
</style>