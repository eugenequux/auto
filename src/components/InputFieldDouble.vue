<template>
  <div>
    <label class="input__title">{{ label }}</label>
    <div class="input__content" :class="[inputClasses]">
      <input
        class="input__value"
        type="text"
        readonly="readonly"
        :value="initialPriceCurrency"
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
      <input
        class="input__precent"
        type="text"
        :min="min"
        :max="max"
        :value="focused ? modelValue : formatedValue"
        @input="update"
        @focus="onFocus"
        @focusout="onFocusOut"
        :disabled="isDisabled"
      />
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
  additionalText: {
    type: String,
    default: "",
  },
  shouldFormat: {
    type: [Boolean, String],
    default: false,
  },
  currencySymbol: {
    type: [Boolean, String],
    default: false,
  },
  initialPrice: Number,
});

const { label, isDisabled, min, max, modelValue, initialPrice } = toRefs(props);

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
  return modelValue.value + "%";
});

const initialPriceCurrency = computed(() => {
  return initialPrice.value.toLocaleString("ru-RU") + "₽";
});
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.input__precent {
  border: none;
  background-color: #f4f3f4;
  position: absolute;
  width: 67px;
  height: 54px;
  top: 2px;
  font-family: "Nekst";
  font-style: normal;
  font-weight: 900;
  font-size: 25px;
  line-height: 120%;
  color: #333e48;
  outline: none;
  background: #ebebec;
  border-radius: 16px;
  text-align: center;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  @include for-size(desktop) {
    right: 7px;
  }
  @include for-size(laptop) {
    right: 7px;
  }
  @include for-size(tablet) {
    right: 7px;
  }
  @include for-size(mobile) {
    right: 2%;
  }
}
</style>
