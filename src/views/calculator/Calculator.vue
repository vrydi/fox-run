<script setup lang="ts">
import { ref } from "vue";
import {
  AddCommand,
  Calculator,
  DivideCommand,
  MultiplyCommand,
  SubtractCommand,
} from "./classes";

type operator = "/" | "*" | "+" | "-" | "=";

const calculator = new Calculator();

const value = ref<number | string>(0);
const selectedOperator = ref<operator | null>(null);
const primaryNumber = ref(0);
const secondaryNumber = ref(0);
const history = ref([] as string[]);
const addDecimal = ref(false);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const operators = ["/", "*", "+", "-", "="] as operator[];

function addNumber(number: number) {
  value.value = value.value.toString() + number.toString();
  if (selectedOperator.value) {
    secondaryNumber.value = Number(
      secondaryNumber.value.toString() +
        (addDecimal.value ? "." : "") +
        number.toString()
    );
  }
  addDecimal.value = false;
}

function addPeriod() {
  value.value = value.value + ".";
  addDecimal.value = true;
  if (selectedOperator.value) {
    secondaryNumber.value = Number(secondaryNumber.value + ".");
  }
}

function removeNumber() {
  value.value = value.value.toString().slice(0, -1);

  if (selectedOperator.value) {
    secondaryNumber.value = Number(
      secondaryNumber.value.toString().slice(0, -1)
    );
  }
}

function operatorSelected(operator: operator) {
  if (!selectedOperator.value) {
    calculator.value = Number(value.value);
    primaryNumber.value = Number(value.value);
  }
  if (operator === "=") {
    solve();
  } else {
    selectedOperator.value = operator;
    value.value =
      primaryNumber.value +
      " " +
      selectedOperator.value +
      " " +
      (secondaryNumber.value ? secondaryNumber.value : "");
  }
}

function solve() {
  switch (selectedOperator.value) {
    case "+":
      calculator.execute(new AddCommand(secondaryNumber.value));
      break;
    case "-":
      calculator.execute(new SubtractCommand(secondaryNumber.value));
      break;
    case "*":
      calculator.execute(new MultiplyCommand(secondaryNumber.value));
      break;
    case "/":
      calculator.execute(new DivideCommand(secondaryNumber.value));
      break;
  }
  history.value.push(value.value.toString() + " = " + calculator.value);

  value.value = calculator.value;
  secondaryNumber.value = 0;
  selectedOperator.value = null;
}

function undo() {
  calculator.undo();
  history.value.pop();
  value.value = calculator.value;
}

function clearAll() {
  calculator.history = [];
  history.value = [];
  value.value = 0;
  selectedOperator.value = null;
}

function clear() {
  value.value = 0;
  selectedOperator.value = null;
}
</script>

<template>
  <section class="container max-w-md mx-auto">
    <div>
      <label
        for="number"
        class="block text-sm/6 font-medium text-white"
      ></label>
      <div class="mt-2">
        <input
          v-model="value"
          type="text"
          name="price"
          id="number"
          readonly
          class="rounded-md w-full text-right block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
        />
      </div>
    </div>

    <div class="grid">
      <div class="numbers">
        <p
          class="number bg-gray-600 m-1 text-gray-50 text-center py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
          v-for="number in numbers"
          :key="number"
          @click="addNumber(number)"
        >
          {{ number }}
        </p>
      </div>

      <div class="operators">
        <p
          class="operator bg-gray-600 m-1 text-gray-50 text-center py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
          v-for="operator in operators"
          :key="operator"
          @click="operatorSelected(operator)"
        >
          {{ operator }}
        </p>
      </div>

      <p
        class="procent bg-gray-600 m-1 text-gray-50 text-center py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
        @click="undo"
      >
        UNDO
      </p>

      <p
        class="clear-all bg-gray-600 m-1 text-gray-50 text-center py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
        @click="clearAll"
      >
        CE
      </p>

      <p
        class="clear bg-gray-600 m-1 text-gray-50 text-center py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
        @click="clear"
      >
        C
      </p>

      <p
        class="remove bg-gray-600 m-1 text-gray-50 text-center py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
        @click="removeNumber"
      >
        REMOVE
      </p>

      <p
        class="zero bg-gray-600 m-1 text-gray-50 text-center py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
        @click="addNumber(0)"
      >
        0
      </p>

      <p
        class="period bg-gray-600 m-1 text-gray-50 text-center py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
        @click="addPeriod"
      >
        .
      </p>
    </div>
  </section>

  <section class="container max-w-md mx-auto">
    <ol>
      <li v-for="command in history" :key="command">{{ command }}</li>
    </ol>
  </section>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-areas:
    "procent clear-all clear remove"
    "divide-x square root operator"
    "number number number operator"
    "number number number operator"
    "number number number operator"
    "switch zero period operator";
}

.grid p {
  width: 100px;
}

.numbers {
  grid-area: number;
  grid-template-columns: repeat(3, 1fr);
  display: grid;
}

.operators {
  grid-area: operator;
  grid-template-columns: repeat(1, 1fr);
  display: grid;
}

.switch {
  grid-area: switch;
}

.zero {
  grid-area: zero;
}

.period {
  grid-area: period;
}

.procent {
  grid-area: procent;
}

.clear-all {
  grid-area: clear-all;
}

.clear {
  grid-area: clear;
}

.remove {
  grid-area: remove;
}

.divide-x {
  grid-area: divide-x;
}

.square {
  grid-area: square;
}

.root {
  grid-area: root;
}
</style>
