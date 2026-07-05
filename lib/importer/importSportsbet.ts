import * as XLSX from "xlsx";

const workbook = XLSX.readFile("uploads/sportsbet.xlsx");

const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const rows = XLSX.utils.sheet_to_json(worksheet);

console.log(rows);
