import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaylocityStore = defineStore('paylocity', {
  state: () => {
    return {
      employees: [],
      numberOfEmployees: 0,
      employeeDialogVisible: false,
      dependentDialogVisible: false,
      employeeIndexBeingModified: null,
      dependentIndexBeingModified: null,
      dependentFormName: ''
    }
  },

  actions: {
    async fetchEmployeeData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      return await response.json();
    },

    // Helper functions for setting up data
    randomPersonIsEmployeeOrDependent(person) {
      const isEmployee = Math.ceil(Math.random() * 2) === 1;
      if (isEmployee) {
        person.dependents = [];
        this.employees.push(person);
      }
      if (this.employees.length > 0 && !isEmployee) {
        const employeeIndex = Math.floor(Math.random() * this.employees.length);

        this.employees[employeeIndex].dependents.push(person);
      }
    },

    randomPersonNameStartsWithA(person) {
      const nameStartsWithA = Math.ceil(Math.random() * 2) === 1;
        if (nameStartsWithA) {
          person.name = 'Alex ' + person.name;
        }
        return person.name;
    },

    setupBenefitsCost() {
      this.employees.forEach(employee => { const employeeRef = ref(employee); this.calculateBenefitCostForEmployee(employeeRef) });
    },

    async setupDataForApp() {
      const people = await this.fetchEmployeeData();

      people.forEach(person => {
        person.name = this.randomPersonNameStartsWithA(person);
        this.randomPersonIsEmployeeOrDependent(person);
      });

      this.setupBenefitsCost();

      this.numberOfEmployees = this.employees.length;
    },

    calculateBenefitCostForEmployee(employee) {
      const actuallyEmployee = employee.value ?? employee;
      // cost of benefit for employee
      let totalCost = 1000;

      // 10% discount for employees whose name starts with 'A'
      if (actuallyEmployee.name.startsWith('A')) {
        totalCost = totalCost * 0.9;
      }

      if (actuallyEmployee.dependents.length > 0) {
        actuallyEmployee.dependents.forEach(dependent => {
          const actuallyDependent = dependent.value ?? dependent;
          // cost of benefit for dependent
          // 10% discount for dependents whose name starts with 'A'
          if (actuallyDependent.name.startsWith('A')) {
            totalCost += (500 * 0.9);
          } else {
            totalCost += 500;
          }
        });
      }

      // Total cost is annual total
      actuallyEmployee.grossPay = (2000).toFixed(2); //per pay period
      actuallyEmployee.benefitsCostPerYear = totalCost; //annual
      actuallyEmployee.benefitsCostPerPayPeriod = parseFloat((totalCost / 26)).toFixed(2);
      actuallyEmployee.netPay = parseFloat((actuallyEmployee.grossPay - actuallyEmployee.benefitsCostPerPayPeriod)).toFixed(2);

      return actuallyEmployee;
    },

    addEmployee(employee) {
      const employeeWithBenefits = this.calculateBenefitCostForEmployee({...employee});
      this.employees.push(employeeWithBenefits);
      this.numberOfEmployees = this.employees.length;
    },

    removeEmployee() {
      this.employees.splice(this.employeeIndexBeingModified, 1);
      this.numberOfEmployees = this.employees.length;
    },

    updateEmployee(employeeName) {
      this.employees[this.employeeIndexBeingModified].name = employeeName;
      this.calculateBenefitCostForEmployee(this.employees[this.employeeIndexBeingModified]);
    },

    addDependent(dependentName) {
      const employee = this.employees[this.employeeIndexBeingModified];
      employee.dependents.push({name: dependentName});
      this.calculateBenefitCostForEmployee(employee);
    },

    removeDependent() {
      const employee = this.employees[this.employeeIndexBeingModified];
      employee.dependents.splice(this.dependentIndexBeingModified, 1);
      this.calculateBenefitCostForEmployee(employee);
    },

    updateDependent(dependentName) {
      const employee = this.employees[this.employeeIndexBeingModified];
      employee.dependents[this.dependentIndexBeingModified].name = dependentName;
      this.calculateBenefitCostForEmployee(employee);
    }
  },
})
