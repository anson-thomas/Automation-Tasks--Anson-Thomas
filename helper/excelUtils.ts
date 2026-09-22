const XLSX = require('xlsx');
const path = require('path');
const inputFile = path.join(__dirname,'../testAssets/test-data/Employee_Input.xlsx');
const outputFile = path.join(__dirname,'../test-results/Employee_Output.xlsx');


function readEmployees() {
    const workbook = XLSX.readFile(inputFile);
    const sheet = workbook.Sheets['Sheet1'];
    const employees = XLSX.utils.sheet_to_json(sheet);
    return employees;
}


function processEmployees(employees: any[]) {
    return employees.map((employee) => {
        const isValid =
            employee['Employee ID'] &&
            employee['Employee Name'] &&
            employee['Department'] &&
            employee['Salary'] > 0 &&
            employee['Status'] === 'Active';
        return {...employee,
            Status: employee['Status'] === 'Active'?'Verified':employee['Status'],
            'Processed Date': new Date().toLocaleDateString(),
            'Validation Result': isValid?'Valid':'Invalid'
        };
    });
}


function writeEmployees(employees: any[]) {
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(employees);
    XLSX.utils.book_append_sheet(workbook,sheet,'Employees');
    XLSX.writeFile(workbook, outputFile);
}


function readOutputEmployees() {
    const workbook = XLSX.readFile(outputFile);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const employees = XLSX.utils.sheet_to_json(sheet);
    return employees;
}

module.exports = {
    readEmployees,
    processEmployees,
    writeEmployees,
    readOutputEmployees
};