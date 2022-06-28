import { PDFDocument } from 'pdf-lib'

const pdfMerge = async (paths) => {
    const files = [];

    paths.forEach( path => {
        for (const [key, value] of Object.entries(path)){
            files.push(fetchFile(value, key));
        }
    })

    Promise.all(files).then(async (files) => {
        const merged = await mergePDFDocuments(files);
        
        const binaryData = []
        binaryData.push(merged);
        const url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}))

        window.location.assign(url);
    })
}

const fetchFile = async (url, name) => {

    try {
        const res = await fetch(url, {
          method: 'GET',
        });

        const arrayBuffer = res.arrayBuffer();
    
        return arrayBuffer;
    } catch(e) {
        console.log(e);
    }
}


async function mergePDFDocuments(documents) {
	const mergedPdf = await PDFDocument.create();

	for (let document of documents) {
		document = await PDFDocument.load(document);

		const copiedPages = await mergedPdf.copyPages(document, document.getPageIndices());
		copiedPages.forEach((page) => mergedPdf.addPage(page));    
	}
	
	return await mergedPdf.save();
}

export default pdfMerge;