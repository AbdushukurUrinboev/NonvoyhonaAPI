exports.getDatesInRange = function (startDate, endDate, data) {
    // Iterate from the start date to the end date
    let newStartDate = new Date(startDate);
    let newEndDate = new Date(endDate);
    let filteredByDate = data.filter((eachObj) => {
        const objectDate = `${eachObj.year}-${eachObj.month}-${eachObj.day}`
        let foundDate = new Date(objectDate);
        if (foundDate <= newEndDate && foundDate >= newStartDate) {
            return true;
        } else {
            return false;
        }
    });

    // Return the array of dates
    return filteredByDate;
}