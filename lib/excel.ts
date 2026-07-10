import * as XLSX from "xlsx";

// Read the Excel file and convert it to JSON
export const readExcelSheet = <T>(filePath: string): T[] => {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json<T>(worksheet);
}

// Convert a value to boolean or null
export const toBooleanOrNull = (value: unknown): boolean | null => {
    if (value === undefined || value === null || value === ""){
        return null;
    }

    if (value === true || value === "TRUE" || value === "true" || value === 1){
        return true;
    }

    if (value === false || value === "FALSE" || value === "false" || value === 0){
        return false;
    }

    throw new Error(`Unexpected boolean value ${value}`);
};