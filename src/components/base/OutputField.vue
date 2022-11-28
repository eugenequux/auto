<template>
  <div>
    <label class="output__label">{{ label }}</label>
    <label class="output__price">{{ price.toLocaleString("ru-RU") }}</label>
  </div>
</template>

<script setup>
defineProps(["label", "price"]);
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.output__label {
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;

  @include for-size(desktop) {
    font-size: 16px;
    line-height: 150%;
    color: #575757;
  }
  @include for-size(laptop) {
    font-size: 16px;
    line-height: 150%;
    color: #333333;
  }
  @include for-size(tablet) {
    font-size: 16px;
    line-height: 150%;
    color: #333333;
  }
  @include for-size(mobile) {
    font-size: 14px;
    line-height: 136%;
    color: #333333;
  }
}
.output__price {
  font-family: "Nekst";
  font-style: bold;
  font-weight: 900;
  font-size: 22px;
  line-height: 20px;
  color: #333333;

  @include for-size(desktop) {
    font-size: 54px;
    line-height: 90%;
    color: #575757;
  }
  @include for-size(laptop) {
    font-size: 54px;
    line-height: 90%;
    color: #333333;
  }
  @include for-size(tablet) {
    font-weight: 900;
    font-size: 54px;
    line-height: 90%;
    color: #333333;
  }
  @include for-size(mobile) {
    font-size: 22px;
    line-height: 20px;
  }
}
</style>
