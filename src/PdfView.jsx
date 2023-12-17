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

const PdfView = (props) => {
  // eslint-disable-next-line react/prop-types
  const { pdfFilePath } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  //   const [pdfFilePath, setPdfFilePath] = useState(file);

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

  const pdfContentStyle = {
    transform: `scale(${scale})`,
    marginTop: "50px",
    transformOrigin: "top ",
    boxShadow: "1px 0px 10px 1px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          position: "fixed",
          backgroundColor: "#F0EFEF",
          padding: "0px 30px 0px 30px",
          display: "flex",
          justifyContent: "space-between",
          top: 0,
          zIndex: 1,
        }}
      >
        <div>
          {pageNumber > 1 && (
            <span className="btn cursor-pointer" onClick={changePageBack}>
              <ChevronLeft />
            </span>
          )}

          <span>
            Page {pageNumber} of {numPages}
          </span>
          {pageNumber < numPages && (
            <span className="btn cursor-pointer" onClick={changePageNext}>
              <ChevronRight />
            </span>
          )}
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <div style={pdfContentStyle}>
          <Document file={pdfFilePath} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              width={680}
              // height={800}
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
                // customTextRenderer={false}
              renderMode="svg"
            //   scale={96/72}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfView;
