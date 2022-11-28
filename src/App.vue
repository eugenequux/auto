<template>
  <label class="title">Рассчитайте стоимость автомобиля в лизинг</label>
  <InputFieldVue
    class="worth-input"
    v-model="price"
    label="Стоимость автомобиля"
    min="1000000"
    max="6000000"
    :isDisabled="isDisabled"
    symbol="₽"
    formatToLocale="true"
  />
  <InputFieldModifiedVue
    class="initial-payment-input"
    v-model="initial"
    label="Первоначальный взнос"
    min="10"
    max="60"
    :isDisabled="isDisabled"
    readonly="true"
    :initialPrice="initialPrice"
  />
  <InputFieldVue
    class="period-input"
    v-model="months"
    label="Срок лизинга"
    min="1"
    max="60"
    :isDisabled="isDisabled"
    symbol="мес."
    formatToLocale="true"
  />

  <OutputField class="sum-output" label="Сумма договора лизинга" :price="sum" />
  <OutputField
    class="monthly-payment-output"
    label="Ежемесячный платеж от"
    :price="monthlyPayment"
  />
  <button class="request-button" :disabled="isDisabled" @click="request">
    Оставить заявку
  </button>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { mockRequestTimeout } from "./lib/api";
import InputFieldVue from "./components/base/InputField.vue";
import InputFieldModifiedVue from "./components/InputFieldDouble.vue";
import OutputField from "./components/base/OutputField.vue";

const price = ref(3300000);
const initial = ref(13);
const months = ref(20);

const initialPrice = computed(() =>
  Math.trunc(price.value * (initial.value / 100))
);
const sum = computed(() =>
  Math.trunc(initialPrice.value + months.value * monthlyPayment.value)
);

const monthlyPayment = computed(() => {
  return Math.trunc(
    (price.value / 100) *
      (100 - initial.value) *
      ((0.035 * Math.pow(1 + 0.035, months.value)) /
        (Math.pow(1 + 0.035, months.value) - 1))
  );
});

const isDisabled = ref(false);

function request() {
  isDisabled.value = true;
  mockRequestTimeout(
    price.value,
    initial.value,
    months.value,
    sum.value,
    monthlyPayment.value
  ).then(() => {
    isDisabled.value = false;
  });
}
</script>

<style lang="scss">
@import "@/assets/reset.scss";
@import "@/assets/fonts.scss";
@import "@/assets/mixins.scss";

#app {
  background: white;
  display: flex;
  justify-content: center;
}

.title {
  font-family: Nekst;
  font-style: bold;
  font-weight: 900;
  line-height: 90%;
  position: absolute;

  @include for-size(desktop) {
    left: 47px;
    top: 213px;
    font-size: 54px;
    width: 753px;
    height: 98px;
  }
  @include for-size(laptop) {
    left: 48px;
    top: 100px;
    font-size: 54px;
    width: 753px;
    height: 98px;
  }
  @include for-size(tablet) {
    left: 36px;
    top: 64px;
    font-size: 54px;
    width: 753px;
    height: 98px;
  }
  @include for-size(mobile) {
    width: 87.5%;
    height: 124px;
    top: 44px;
    left: auto;
    font-size: 34px;
  }
}

.worth-input {
  position: absolute;

  @include for-size(desktop) {
    width: 427px;
    height: 119px;
    left: 47px;
    top: 343px;
  }
  @include for-size(laptop) {
    width: 928px;
    height: 119px;
    left: 48px;
    top: 242px;
  }
  @include for-size(tablet) {
    width: 696px;
    height: 119px;
    left: 36px;
    top: 206px;
  }
  @include for-size(mobile) {
    width: 87.5%;
    height: 96px;
    top: 200px;
    left: auto;
  }
}

.initial-payment-input {
  position: absolute;

  @include for-size(desktop) {
    width: 427px;
    height: 119px;
    left: 506px;
    top: 343px;
  }
  @include for-size(laptop) {
    width: 928px;
    height: 119px;
    left: 48px;
    top: 393px;
  }
  @include for-size(tablet) {
    width: 696px;
    height: 119px;
    left: 36px;
    top: 357px;
  }
  @include for-size(mobile) {
    width: 87.5%;
    height: 96px;
    top: 312px;
    left: auto;
  }
}

.period-input {
  position: absolute;

  @include for-size(desktop) {
    width: 427px;
    height: 119px;
    left: 965px;
    top: 343px;
  }
  @include for-size(laptop) {
    width: 928px;
    height: 119px;
    left: 48px;
    top: 544px;
  }
  @include for-size(tablet) {
    width: 696px;
    height: 119px;
    left: 36px;
    top: 508px;
  }
  @include for-size(mobile) {
    width: 87.5%;
    height: 96px;
    top: 424px;
    left: auto;
  }
}

.sum-output {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;
  position: absolute;

  @include for-size(desktop) {
    width: 279px;
    height: 81px;
    left: 47px;
    top: 506px;
  }
  @include for-size(laptop) {
    width: 279px;
    height: 81px;
    left: 48px;
    top: 700px;
  }
  @include for-size(tablet) {
    width: 279px;
    height: 81px;
    left: 36px;
    top: 664px;
  }
  @include for-size(mobile) {
    width: 87.5%;
    height: 41px;
    top: 536px;
    left: auto;
  }
}

.monthly-payment-output {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;
  position: absolute;

  @include for-size(desktop) {
    width: 229px;
    height: 81px;
    left: 506px;
    top: 506px;
  }
  @include for-size(laptop) {
    width: 229px;
    height: 81px;
    left: 528px;
    top: 700px;
  }
  @include for-size(tablet) {
    width: 229px;
    height: 81px;
    left: 400px;
    top: 664px;
  }
  @include for-size(mobile) {
    height: 41px;
    width: 87.5%;
    top: 606px;
    left: auto;
  }
}

.request-button {
  position: absolute;
  background: #ff9514;
  border-radius: 40px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: "Nekst";
  font-style: bold;
  font-weight: 900;
  justify-content: center;
  @include for-size(desktop) {
    width: 426px;
    height: 68px;
    left: 965px;
    top: 516px;
    font-weight: 900;
    font-size: 30px;
    line-height: 36px;
  }
  @include for-size(laptop) {
    width: 345px;
    height: 68px;
    left: 48px;
    top: 825px;
    font-weight: 900;
    font-size: 30px;
    line-height: 36px;
  }
  @include for-size(tablet) {
    top: 789px;
    left: 36px;
    font-weight: 900;
    font-size: 26px;
    line-height: 24px;
  }
  @include for-size(mobile) {
    width: 280px;
    height: 60px;
    top: 679px;
    left: auto;
    font-weight: 900;
    font-size: 22px;
    line-height: 20px;
  }
}

.request-button:hover {
  background-color: #111111;
}
.request-button:active {
  background: #575757;
}
.request-button:disabled {
  background: rgba(255, 149, 20, 0.4);
  font-size: 0;
}
.request-button:disabled::after {
  content: "";
  position: absolute;
  width: 21px;
  height: 21px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 2px solid transparent;
  border-color: #ffffff #ffffff #ffffff transparent;
  border-radius: 40px;
  animation: button-disabled-spinner 1s ease infinite;
}

@keyframes button-disabled-spinner {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
}

.shadow {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

._disabled {
  background-color: transparent;
  border: 2px solid #f3f3f4;
  border-radius: 16px;
  input {
    background-color: transparent;
  }
  label {
    background-color: transparent;
  }
}
</style>
