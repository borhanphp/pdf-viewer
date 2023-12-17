import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const MyPDFViewer = () => {
  const [pdfContent, setPdfContent] = useState(null);
  const fileUrl="http://192.168.0.3:90/reports/merchandising/budget/budgetDownload?budgetId=c2a2603d-74bf-4d47-b931-d1eccf50358b&token=YnWhpzGqdA6rzRQ6IyEzBUbBOfPMpMoIBWTLOUUhgPqgJdlRa33I2JoL8rcX3q"
  
  const fetchPDF = () => {
    axios
      .get(fileUrl, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfContent(url);
      })
      .catch((error) => {
        console.error('Error fetching PDF:', error);
      });
  };

  useEffect(() => {
    fetchPDF();
  }, [])
  

  return (
    <div>
      {/* <button onClick={fetchPDF}>Fetch PDF</button> */}
      {pdfContent && (
        <iframe title="PDF Viewer" src={pdfContent} style={{
            width:"100vw",
            height:"100vh",
        }} />
      )}
    </div>
  );
};

export default MyPDFViewer;