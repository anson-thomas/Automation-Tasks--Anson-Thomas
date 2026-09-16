import { test, expect } from '@playwright/test';
import data from '../test-data/data.json'

const excelUtils = require('../../helper/excelUtils');
const fs = require('fs');

test.describe('Employee Excel Processing', () => {
    const employees = excelUtils.readEmployees();

    test('TS01 - Verify that employees are read from Excel', () => {
        const employees = excelUtils.readEmployees();
        expect(employees.length).toBeGreaterThan(0);
    });

    test('TS02 - Verify that employee information is validated',  () => {
        const employees = excelUtils.readEmployees();
        for (const employee of employees) {
            expect(employee[data.employeeId]).toBeTruthy();
            expect(employee[data.employeeName]).toBeTruthy();
            expect(employee[data.department]).toBeTruthy();
            expect(employee[data.salary]).toBeGreaterThan(0);
            expect(employee[data.status]).toBeTruthy();
        }
    });

    test('TS03 - Verify that Active status is changed to Verified',  () => {
        const processedEmployees = excelUtils.processEmployees(employees)
        for (const employee of processedEmployees) {
            expect(employee[data.status]).toBe(data.newStatus);
        }
    });

    test('TS04 - Verify that Processed Date is added',  () => {
        const processedEmployees = excelUtils.processEmployees(employees)
        for (const employee of processedEmployees) {
            expect(employee[data.processedDate]).toBeTruthy();
        }
    });

    test('TS05 - Verify that Validation Result is added',  () => {
        const processedEmployees = excelUtils.processEmployees(employees)
        for (const employee of processedEmployees) {
            expect(employee[data.validationResult.column]).toBeTruthy();
            expect(employee[data.validationResult.column]).toBe(data.validationResult.valid);
        }
    });

    test('TS06 - Verify that processed data is saved into a new output Excel file', () => {
        const processedEmployees = excelUtils.processEmployees(employees);
        excelUtils.writeEmployees(processedEmployees);
        const outputFile = 'test-results/Employee_Output.xlsx';
        expect(fs.existsSync(outputFile)).toBeTruthy();
        const outputEmployees = excelUtils.readOutputEmployees();
        for (const employee of outputEmployees) {
            expect(employee[data.status]).toBe(data.newStatus);
            expect(employee[data.processedDate]).toBeTruthy();
            expect(employee[data.validationResult.column]).toBe(data.validationResult.valid);
        }
    });

    test('TS07 - Verify that the input Excel file remains unchanged',  () => {
        const inputEmployees = excelUtils.readEmployees();
        for (const employee of inputEmployees) {
            expect(employee[data.employeeId]).toBeTruthy();
            expect(employee[data.employeeName]).toBeTruthy();
            expect(employee[data.department]).toBeTruthy();
            expect(employee[data.salary]).toBeGreaterThan(0);
            expect(employee[data.status]).toBeTruthy();
            expect(employee[data.processedDate]).toBeFalsy();
            expect(employee[data.validationResult.column]).toBeFalsy();
        }
    });

});