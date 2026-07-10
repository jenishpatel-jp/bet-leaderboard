// Convert Excel date to JavaScript Date
export const excelDateToJSDate = (excelDate : number): Date => {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));

    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    return new Date(excelEpoch.getTime() + excelDate * millisecondsPerDay);
}