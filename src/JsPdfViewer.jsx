import React from 'react'
import { jsPDF } from "jspdf";

const JsPdfViewer = () => {
  const pdf = new jsPDF();
console.log('pdf',pdf.text('Hello, world!', 10, 10));
  return (
    <div>JsPdfViewer</div>
  )
}

export default JsPdfViewer