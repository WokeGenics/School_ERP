"use client";
import React from "react";

export default function ReceiptPreview({ receiptData }) {
  const handlePrint = () => {
    const printArea = document.getElementById("receipt-preview");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: #fff;
              color: #000;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #000;
              padding: 5px;
              text-align: left;
            }
            .header-section {
              text-align: center;
              margin-bottom: 20px;
              font-weight: bold;
            }
            .footer {
              margin-top: 20px;
              font-size: 0.9rem;
            }
          </style>
        </head>
        <body>
          ${printArea.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <div id="receipt-preview" className="receipt-container">
        {/* Header Section */}
        <div className="header-section">
          <h2>North Eastern Hill University</h2>
          <h4>Student's Copy</h4>
          <p>Amount may be deposited in Saving Account No.</p>
        </div>

        {/* General Info Section */}
        <table>
          <tbody>
            <tr>
              <td><strong>Receipt No:</strong></td>
              <td>{receiptData.receiptNo}</td>
              <td><strong>Date Of Receipt:</strong></td>
              <td>{receiptData.dateOfReceipt}</td>
            </tr>
            <tr>
              <td><strong>Student Name:</strong></td>
              <td>{receiptData.studentName}</td>
              <td><strong>Father's Name:</strong></td>
              <td>{receiptData.fatherName}</td>
            </tr>
            <tr>
              <td><strong>Installment Name:</strong></td>
              <td colSpan="3">{receiptData.installmentName}</td>
            </tr>
            <tr>
              <td><strong>Roll No:</strong></td>
              <td>{receiptData.rollNo}</td>
              <td><strong>Contact No:</strong></td>
              <td>{receiptData.contactNo}</td>
            </tr>
          </tbody>
        </table>

        {/* Fee Details Section */}
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Fees Detail</th>
              <th>Rs. Amount</th>
              <th>Ps.</th>
            </tr>
          </thead>
          <tbody>
            {receiptData.feesDetails.map((fee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{fee.detail}</td>
                <td>{fee.amount}</td>
                <td>{fee.ps}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>Total</td>
              <td>{receiptData.totalAmount}</td>
              <td>0</td>
            </tr>
          </tfoot>
        </table>

        {/* Amount in Words */}
        <p><strong>Amt. in words:</strong> {receiptData.amountInWords}</p>

        {/* Payment Details */}
        <div className="footer">
          <p><strong>Detail of Demand Draft/Cheque/Cash:</strong></p>
          <p>Mode of Payment: {receiptData.paymentMode}</p>
          <p>Transaction No: {receiptData.transactionNo}</p>
          <p>Transaction Date: {receiptData.transactionDate}</p>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Print Receipt
      </button>
    </div>
  );
}
