<template>
  <el-dialog v-model="paylocity.dependentDialogVisible" :title="paylocity.dependentIndexBeingModified === null ? 'Add New Dependent' : 'Edit Dependent'" width="500">
    <el-form :model="dependentForm">
      <el-form-item label="Full name">
        <el-input v-model="dependentForm.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDependentDialog">Cancel</el-button>
        <el-button type="primary" @click="handleOnClickDependentConfirm">
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
  dependentForm.name = paylocity.dependentFormName
})

const dependentForm = reactive({
  name: '',
})

const closeDependentDialog = () => {
  paylocity.dependentDialogVisible = false
  dependentForm.name = ''
  paylocity.dependentFormName = ''
}

const handleOnClickDependentConfirm = () => {
  if (paylocity.dependentIndexBeingModified === null) {
    paylocity.addDependent(dependentForm.name)
  } else {
    paylocity.updateDependent(dependentForm.name)
  }
  closeDependentDialog()

}
</script>
