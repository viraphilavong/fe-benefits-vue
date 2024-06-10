<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <span>{{ employee.name }}</span>
        <div>
          <el-button @click="editEmployee">
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
          <el-button @click="removeEmployee">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </div>
      </div>
    </template>
    <div class="payInfo">
      <div>
        <p>Gross Pay: </p>
        <p>Deductions: </p>
        <p>Net Pay: </p>
      </div>
      <div>
        <p class="dollar">
          $<span class="alignRight">{{ employee.grossPay }}</span>
        </p>
        <p class="dollar">
          $<span class="alignRight">{{ employee.benefitsCostPerPayPeriod }}</span>
        </p>
        <p class="dollar">
          $<span class="alignRight">{{ employee.netPay }}</span>
        </p>
      </div>
    </div>
    <template #footer >
      <div class="dependentRow">
        <span>Dependents</span>
        <el-button>
          <el-icon>
            <Plus @click="addDependent"/>
          </el-icon>
        </el-button>
      </div>
      <template v-if="employee.dependents.length > 0" v-for="(dependent, index) in employee.dependents">
        <div class="dependentRow">
          <span>
            - {{ dependent.name }}
          </span>
          <div>
            <el-button @click="editDependent(dependent, index)">
              <el-icon>
                <Edit />
              </el-icon>
            </el-button>
            <el-button @click="removeDependent(index)" >
              <el-icon>
                <Delete/>
              </el-icon>
            </el-button>
          </div>
        </div>
      </template>
      <div v-else class="dependentRow">
        <span>
          - No Dependents
        </span>
      </div>
    </template>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue'
import { usePaylocityStore } from '../stores/paylocity'
import { ElButton, ElCard, ElIcon } from 'element-plus'
import { Edit, Delete, Plus } from '@element-plus/icons'

const paylocity = usePaylocityStore()

const editEmployee = () => {
  paylocity.employeeIndexBeingModified = props.employeeIndex
  paylocity.employeeDialogVisible = true
}

const removeEmployee = () => {
  paylocity.employeeIndexBeingModified = props.employeeIndex
  paylocity.removeEmployee()
}

const addDependent = () => {
  paylocity.employeeIndexBeingModified = props.employeeIndex
  paylocity.dependentDialogVisible = true
}

const editDependent = (dependent, dependentIndex) => {
  paylocity.employeeIndexBeingModified = props.employeeIndex
  paylocity.dependentIndexBeingModified = dependentIndex
  paylocity.dependentFormName = dependent.name
  paylocity.dependentDialogVisible = true
}

const removeDependent = (dependentIndex) => {
  paylocity.employeeIndexBeingModified = props.employeeIndex
  paylocity.dependentIndexBeingModified = dependentIndex
  paylocity.removeDependent()
}

const props = defineProps({
  employee: {
    type: Object,
  },
  employeeIndex: {
    type: Number,
  }
})
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid #ebebeb; */
}
.card {
  margin: 10px;
  /* padding: 10px; */
  border: 1px solid #ebebeb;
  max-width: 450px;
}
.dependentRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.payInfo {
  display: flex;
  justify-content: space-between;
  /* padding: 10px; */
}
.alignRight {
  float: right;
}
</style>
