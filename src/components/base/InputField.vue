<template>
  <div>
    <label class="input__title">{{ label }}</label>
    <div class="input__content" :class="[inputClasses]">
      <input
        class="input__value"
        type="text"
        :min="min"
        :max="max"
        :value="formatedValue"
        @input="update"
        @focus="onFocus"
        @focusout="onFocusOut"
        :disabled="isDisabled"
      />
      <input
        class="input__range"
        :style="{ background: rangeShadow }"
        type="range"
        :min="min"
        :max="max"
        :value="modelValue"
        @input="update"
        :disabled="isDisabled"
      />
      <label class="input__symbol">{{ symbol }}</label>
    </div>
  </div>
</template>

<script setup>
import { toRefs, computed, ref } from "vue";
import { calculateShadow } from "@/lib/calculateShadow";

const props = defineProps({
  modelValue: [Number],
  label: {
    type: String,
    default: "default",
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: String,
    default: "1",
  },
  max: {
    type: String,
    default: "10",
  },
  symbol: {
    type: String,
    default: "",
  },
  formatToLocale: {
    type: [Boolean, String],
    default: false,
  },
});

const { label, isDisabled, min, max, modelValue, formatToLocale } =
  toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const CLASSES = {
  disabled: "_disabled",
  shadow: "shadow",
};

const inputClasses = computed(() => {
  return isDisabled.value ? CLASSES.disabled : CLASSES.shadow;
});

const rangeShadow = ref(
  calculateShadow(modelValue.value, min.value, max.value)
);

function update(event) {
  const num = Number(event.target.value);
  if (Number.isInteger(num)) {
    emit("update:modelValue", num);
  } else {
    event.target.value = min.value;
    emit("update:modelValue", min.value);
  }
  rangeShadow.value = calculateShadow(event.target.value, min.value, max.value);
}

const focused = ref(false);

function onFocus() {
  focused.value = true;
}

function onFocusOut(event) {
  const num = Number(event.target.value);
  if (!Number.isInteger(num)) {
    emit("update:modelValue", Number(min.value));
    return;
  }
  if (num < min.value) {
    emit("update:modelValue", Number(min.value));
  } else if (num > max.value) {
    emit("update:modelValue", Number(max.value));
  }
  focused.value = false;
}

const formatedValue = computed(() => {
  if (formatToLocale.value) {
    return focused.value
      ? modelValue.value
      : modelValue.value.toLocaleString("ru-RU");
  }
  return modelValue.value;
});
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.input__title {
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 80.21%;
  font-weight: 400;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @include for-size(desktop) {
    font-size: 16px;
    line-height: 20px;
    color: #575757;
  }
  @include for-size(laptop) {
    font-size: 16px;
    line-height: 20px;
    color: #575757;
  }
  @include for-size(tablet) {
    color: #575757;
    font-size: 16px;
    line-height: 20px;
  }
  @include for-size(mobile) {
    color: #333e48;
    font-size: 14px;
    line-height: 136%;
  }
}

.input__content {
  position: absolute;
  left: 0%;
  right: 0%;
  top: 28.12%;
  bottom: 9.38%;
  background: #f4f3f4;
  border-radius: 16px;
  border: 2px solid #f3f3f4;
  height: 60px;
  width: 100%;
}

.input__value {
  border: none;
  background-color: #f4f3f4;
  position: absolute;
  top: 17%;
  left: 24px;
  height: 36px;
  width: 250px;
  font-family: "Nekst";
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 36px;
  color: #333e48;
  outline: none;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}

.input__symbol {
  font-family: "Nekst";
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
  line-height: 20px;
  color: #333e48;
  background-color: #f4f3f4;
  position: absolute;
  top: 30%;
  @include for-size(desktop) {
    right: 24px;
  }
  @include for-size(laptop) {
    right: 24px;
  }
  @include for-size(tablet) {
    right: 24px;
  }
  @include for-size(mobile) {
    right: 10%;
  }
}

.input__range {
  z-index: 1;
  background: linear-gradient(
    to right,
    #ff9514 0%,
    #ff9514 50%,
    #e1e1e1 50%,
    #e1e1e1 100%
  );
  height: 1px;
  width: 90%;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: absolute;
  left: 26px;
  top: 59px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    margin-top: -1px;
    background: #ff9514;
  }
  &::-moz-range-thumb {
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    margin-top: -1px;
    background: #ff9514;
  }
}
</style>
