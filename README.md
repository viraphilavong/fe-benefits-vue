# fe-benefits-vue

## Problem Statement

One of the critical functions that we provide for our clients is the ability to pay for their employees’ healthcare benefits package. A portion of these costs are deducted from their paycheck, and we handle that deduction. Create a front-end application that displays the total cost of their healthcare benefits package per paycheck

## Opening Details

Calculation breakdown

- The cost of benefits is $1000/year for each employee
- Each dependent (children and possibly spouses) incurs a cost of $500/year
- Anyone whose name starts with ‘A’ gets a 10% discount, employee or dependent

## Assumptions

- All employees are paid $2000 per paycheck before deductions
- There are 26 paychecks in a year

## Requirements:

- Mock out an API for the retrieval of employee/dependent data
  - Tip: All data can be stored client-side in memory
- List out the employee and their dependents
- Allow the user to change their elections and display a preview of the calculated benefits
- CRUD functionality
  - I.E Add/edit employee + dependents
- Allow the user to save their changes and reflect them on subsequent page loads

## Don't waste your time on:

- Implementing a backend, data-access layer, etc.
- Perfect UI/UX design, though a general knowledge should be shown

## Delivery of solution:

- Please include instructions on how to run the application in your submission.
- You are not expected to spend more than a few hours on this project, and you are free to use whatever technologies you prefer but please be prepared to discuss the choices you’ve made. The most important part of this challenge is to use your work as a jumping-off point for a deeper conversation with our developers.
- If you would prefer, there are some simple skeleton projects to help get you started (Temporarily hosted on (Nova Maday's personal GH account, will be moved to a proper resting place eventually)

## Getting Started

1. Install (git)[https://git-scm.com/downloads]
2. Clone down this repo by running this command in your terminal `git clone https://github.com/viraphilavong/fe-benefits-vue.git`
3. Install (node & npm)[https://nodejs.org/en] Node v16.15.1 Npm v8.11.0
4. Run the following command in your terminal `npm i` which will install the dependencies for this repo
5. Once the dependencies are installed, run the following command in the terminal `npm run dev` from the root directory of the project to startup a local instance of the application!
