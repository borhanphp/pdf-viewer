import React, { useState, useRef } from "react";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "react-feather";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pdfFilePath, setPdfFilePath] = useState("/public/test.pdf");
  const pdfWrapperRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
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
    const pdfPath = pdfFilePath;
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "downloaded.pdf";
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

  const pdfContainerStyle = {
    border: "1px solid black",
    width: "400px", // Adjusted width as per your requirement
    height: "600px", // Adjusted height as per your requirement
    overflow: "auto", // Prevent content from overflowing the container
  };

  const pdfContentStyle = {
    transform: `scale(${scale})`, // Apply scale to the content container
    transformOrigin: "0 0", // Set the transform origin to the top-left corner
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw"
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#c6cfc8",
          padding: "0px",
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <div>
          <span className="btn cursor-pointer" onClick={changePageBack}>
            <ChevronLeft />
          </span>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <span className="btn cursor-pointer" onClick={changePageNext}>
            <ChevronRight />
          </span>
        </div>

        <div>
          <span className="btn cursor-pointer" onClick={handleDownload}>
            <ArrowDown />
          </span>
          <span className="btn cursor-pointer" onClick={handleZoomIn}>
            <ZoomIn />
          </span>
          <span className="btn cursor-pointer" onClick={handleZoomOut}>
            <ZoomOut />
          </span>
        </div>
      </div>

      <div ref={pdfWrapperRef} style={pdfContainerStyle}>
        <div style={pdfContentStyle}>
          <Document file={pdfFilePath} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              width={400} // Adjusted width as per your requirement
              height={600} // Adjusted height as per your requirement
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              customTextRenderer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}

export default App;
