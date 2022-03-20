const asyncHandler = require('express-async-handler');
const FormData = require('../models/formDataModel');
const XLSX = require('xlsx')

// const puppeteer = require('puppeteer');


// @desc    Form Route
// @route   GET /api/form/data/submit/:id
// @access  Private
const printFormData = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400);
        throw new Error('Form ID not found in request');
    }


    const formData = await FormData.where("formId").equals(req.params.id).populate('formId');

    if (!formData) {
        res.status(400);
        throw new Error('Cannot find data associated with Form');
    }

    let jsonData = [];

    formData.forEach((obj, i) => {

        const row = {};

        obj.data.forEach((item, j) => {
            row[item.name] = item.value;
        })

        jsonData.push(row);
    })

    console.log(jsonData);

    // Server Side JSON to XLSX
    // const workSheet = XLSX.utils.json_to_sheet(formData);
    // const workBook = XLSX.utils.book_new();

    // XLSX.utils.book_append_sheet(workBook, workSheet, "FormData");

    // // Generate buffer
    // XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" });

    // // Binary string
    // XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    // XLSX.writeFile(workBook, "FormData.xlsx");

    res.status(200).json({
        message: 'JSON Data Sent',
        req: req.params.id,
        res: jsonData
    });
})

// @desc        For Future Reference
// const autoSubmit = () => {
//     const browser = await puppeteer.launch({
//         headless: false
//     });
//     const page = await browser.newPage();
//     await page.goto(formData[0].formId.url);
//     page.type(`input[name="Email"]`, "Faggio");
//     page.type(`input[name="Pass"]`, "Baggio");
//     // page.click('button[name="Register"]')



//     for (const obj of formData) {

//         // await page.goto(formData[0].formId.url);

//         // for (input of obj.formId.inputs) {
//         //     await Promise.all([page.type(`input[name="${dataItem.name}"]`, dataItem.value), page.click(`input[type="submit"],button[type="submit"]`), page.waitForNavigation()]);
//         // }

//     }

//     await browser.close();
// }

module.exports = {
    printFormData
}