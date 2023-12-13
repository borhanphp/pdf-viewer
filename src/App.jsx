import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0); // Initial scale

  function onDocumentLoadSuccess({ numPages }) {
    console.log('numPages', numPages);
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(1);
  }

  function handleDownload() {
    // Replace '/everything.pdf' with the correct path to your PDF file
    const pdfPath = '/everything.pdf';
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'downloaded.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleZoomIn() {
    setScale((prevScale) => prevScale + 0.2);
  }

  function handleZoomOut() {
    setScale((prevScale) => Math.max(0.2, prevScale - 0.2));
  }

  return (
    <div style={{border: "1px solid black", paddingBottom: "", height: "600px"}}>
       <div>
       
        <div style={{backgroundColor: "#c6cfc8"}}>
        <span onClick={changePageBack}>Previous</span>
        <span>Page {pageNumber} of {numPages}</span>
        <span onClick={changePageNext}>Next</span>
        
       <span onClick={handleDownload}>D</span>
        <span onClick={handleZoomIn}>In</span>
        <span onClick={handleZoomOut}>Out</span>
       </div>
       </div>
       <div>
       <Document file="/everything.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page height={600} pageNumber={pageNumber} scale={scale} />
        </Document>
       </div>
     
   
    </div>
  );
}

export default App
