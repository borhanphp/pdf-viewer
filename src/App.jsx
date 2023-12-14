import React, { useState } from "react";
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

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          minWidth: "30%",
          margin: "auto",
          height: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#c6cfc8",
            // padding: "10px",
            border: "1px solid black",
          }}
        >
          <div className="d-flex justify-content-between">
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
        </div>

        <div
          style={{
            border: "1px solid black",
            height: "90vh",
          }}
        >
          <Document file={pdfFilePath} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              height={780}
              pageNumber={pageNumber}
              scale={scale}
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
