<template>
  <el-dialog v-model="paylocity.employeeDialogVisible" :title="paylocity.employeeIndexBeingModified === null ? 'Add New Employee' : 'Edit Employee'" width="500">
    <el-form :model="form">
      <el-form-item label="Full name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="paylocity.employeeDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleOnClickEmployeeConfirm">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { usePaylocityStore } from '../stores/paylocity'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus'

const paylocity = usePaylocityStore()

onMounted(() => {
  if (paylocity.employeeIndexBeingModified) {
    const employee = paylocity.employees[paylocity.employeeIndexBeingModified];
    form.name = employee.name
  }
})

const form = reactive({
  name: '',
  dependents: [],
})

const closeEmployeeDialog = () => {
  form.name = ''
  paylocity.employeeDialogVisible = false
}

const handleOnClickEmployeeConfirm = () => {
  if (paylocity.employeeIndexBeingModified === null) {
    paylocity.addEmployee(form)
  } else {
    paylocity.updateEmployee(form.name)
  }
  closeEmployeeDialog()
}
</script>
