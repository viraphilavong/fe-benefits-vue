<template>
  <header class="flex-column">
      <h1 class="green">Health Benefits</h1>
      <el-button type="primary" @click="paylocity.employeeDialogVisible = true">Add Employee</el-button>
  </header>
  <div class="app-layout" v-for="(employee, index) in paylocity.employees">
    <employee-card :employee="employee" :employee-index="index"></employee-card>
  </div>
  <employee-form v-if="paylocity.employeeDialogVisible"/>
  <dependent-form v-if="paylocity.dependentDialogVisible"/>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { usePaylocityStore } from './stores/paylocity'
import EmployeeCard from './components/EmployeeCard.vue'
import EmployeeForm from './components/EmployeeForm.vue'
import DependentForm from './components/DependentForm.vue'
import { ElButton } from 'element-plus'

const paylocity = usePaylocityStore()

onBeforeMount(async () => {
  await paylocity.setupDataForApp()
})
</script>

<style scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}

header {
  line-height: 1.5;
  max-height: 100vh;

  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;

  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
