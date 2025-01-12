"use client";
import { useState, useEffect, useRef } from "react";

const classWiseFeeStructure = {
  "Class 10": {
    "Tuition Fee": 8000,
    "Examination Fee": 2000,
    "Laboratory Fee": 1500,
    "Library Fee": 1000,
    "Sports Fee": 1200,
  },
  "Class 12": {
    "Tuition Fee": 10000,
    "Examination Fee": 3000,
    "Laboratory Fee": 2000,
    "Library Fee": 1500,
    "Cultural Event Fee": 800,
  },
};

const studentData = [
  {
    name: "John Doe",
    fatherName: "Robert Doe",
    contactNumber: "9876543210",
    class: "Class 10",
    lastDue: 500,
  },
  {
    name: "Jane Smith",
    fatherName: "Michael Smith",
    contactNumber: "9876543211",
    class: "Class 12",
    lastDue: 0,
  },
  {
    name: "Alice Johnson",
    fatherName: "William Johnson",
    contactNumber: "9876543212",
    class: "Class 10",
    lastDue: 1000,
  },
];

const feeFields = [
  { name: "Tuition Fee", type: "basic" },
  { name: "Examination Fee", type: "basic" },
  { name: "Laboratory Fee", type: "basic" },
  { name: "Library Fee", type: "basic" },
  { name: "Practical Fee", type: "basic" },
  { name: "Infrastructure Fee", type: "basic" },
  { name: "Technology Fee", type: "basic" },
  { name: "Activity Fee", type: "additional" },
  { name: "Sports Fee", type: "additional" },
  { name: "Cultural Event Fee", type: "additional" },
  { name: "Transport Fee", type: "additional" },
  { name: "Hostel Fee", type: "additional" },
  { name: "Meal Fee", type: "additional" },
  { name: "Uniform Fee", type: "additional" },
  { name: "Books and Stationery Fee", type: "additional" },
  { name: "Field Trip Fee", type: "additional" },
  { name: "Workshop Fee", type: "additional" },
  { name: "Extra Classes Fee", type: "additional" },
  { name: "Alumni Fee", type: "additional" },
  { name: "Late Fee", type: "additional" },
  { name: "Library Fine", type: "additional" },
  { name: "Discipline Fee", type: "additional" },
  { name: "Exam Board Registration Fee", type: "additional" },
  { name: "Medical Fee", type: "additional" },
  { name: "Other Miscellaneous Fees", type: "additional" },
];

const numberToIndianWords = (num) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const groups = ["", "Thousand", "Lakh", "Crore"];

  if (num === 0) return "Zero";

  const splitNumber = (num) => {
    let result = [];
    result.push(num % 1000); // First 3 digits (units, tens, hundreds)
    num = Math.floor(num / 1000);

    while (num > 0) {
      result.push(num % 100); // Groups of 2 digits (thousands, lakhs, crores)
      num = Math.floor(num / 100);
    }

    return result.reverse();
  };

  const numberToWords = (num) => {
    let part = "";
    const hundreds = Math.floor(num / 100);
    if (hundreds > 0) {
      part += ones[hundreds] + " Hundred ";
    }
    num %= 100;

    if (num >= 11 && num <= 19) {
      part += teens[num - 11] + " ";
    } else {
      const tensPlace = Math.floor(num / 10);
      const onesPlace = num % 10;
      if (tensPlace > 0) part += tens[tensPlace] + " ";
      if (onesPlace > 0) part += ones[onesPlace] + " ";
    }

    return part.trim();
  };

  const splitParts = splitNumber(num);
  let word = "";

  splitParts.forEach((part, index) => {
    if (part > 0) {
      word += numberToWords(part) + " " + groups[splitParts.length - 1 - index] + " ";
    }
  });

  return word.trim() + " Only";
};

export default function FeeReceipt() {
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [fees, setFees] = useState({});
  const [total, setTotal] = useState(0);
  const [studentDetails, setStudentDetails] = useState({});
  const [visibleFields, setVisibleFields] = useState(
    feeFields.map((field) => ({ ...field, visible: true }))
  );
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const currentDate = new Date().toLocaleDateString();
  const printRef = useRef();

  useEffect(() => {
    setReceiptNumber(`RCPT${Date.now()}`);
    setTransactionNumber(`TXN${Math.floor(Math.random() * 1000000000)}`);
    initializeFees();
  }, []);

  const initializeFees = () => {
    const defaultFees = Object.fromEntries(
      feeFields.map((field) => [field.name, 0])
    );
    setFees(defaultFees);
    calculateTotal(defaultFees);
  };

  const handleClassChange = (classProgram) => {
    setSelectedClass(classProgram);
    const classFees = classWiseFeeStructure[classProgram] || {};
    const updatedFees = { ...fees, ...classFees };
    setFees(updatedFees);
    calculateTotal(updatedFees);
    setStudentDetails({});
    setFilteredStudents(studentData.filter((stu) => stu.class === classProgram));
    setSelectedStudent("");
    setSearchName("");
  };

  const handleStudentSelect = (name) => {
    setSelectedStudent(name);
    const student = studentData.find(
      (stu) => stu.name === name && stu.class === selectedClass
    );
    if (student) {
      setStudentDetails(student);
    } else {
      setStudentDetails({});
    }
  };

  const handleSearchName = (name) => {
    setSearchName(name);
    setFilteredStudents(
      studentData.filter(
        (stu) =>
          stu.class === selectedClass &&
          stu.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  const handleInputChange = (fieldName, value) => {
    const updatedFees = { ...fees, [fieldName]: Number(value) || 0 };
    setFees(updatedFees);
    calculateTotal(updatedFees);
  };

  const calculateTotal = (updatedFees) => {
    const totalAmount =
      Object.values(updatedFees).reduce((sum, value) => sum + value, 0) +
      Number(studentDetails.lastDue || 0);
    setTotal(totalAmount);
  };

  const handleFieldVisibilityChange = (fieldName) => {
    const updatedFields = visibleFields.map((field) =>
      field.name === fieldName ? { ...field, visible: !field.visible } : field
    );
    setVisibleFields(updatedFields);
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!isConfirmed ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          {/* Student Details */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Student Details</h2>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Class:</label>
              <select
                className="border border-gray-300 p-2 rounded w-full"
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
              >
                <option value="">Select Class</option>
                {Object.keys(classWiseFeeStructure).map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            {selectedClass && (
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Search Student Name:</label>
                <input
                  type="text"
                  placeholder="Enter student name"
                  className="border border-gray-300 p-2 rounded w-full"
                  value={searchName}
                  onChange={(e) => handleSearchName(e.target.value)}
                />
              </div>
            )}
            {filteredStudents.length > 0 && (
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Select Student:</label>
                <select
                  className="border border-gray-300 p-2 rounded w-full"
                  value={selectedStudent}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                >
                  <option value="">Select Student</option>
                  {filteredStudents.map((stu) => (
                    <option key={stu.name} value={stu.name}>
                      {stu.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {studentDetails.name && (
              <>
                <div className="mb-2">
                  <strong>Name:</strong> {studentDetails.name}
                </div>
                <div className="mb-2">
                  <strong>Father's Name:</strong> {studentDetails.fatherName}
                </div>
                <div className="mb-2">
                  <strong>Contact Number:</strong> {studentDetails.contactNumber}
                </div>
                <div className="mb-2">
                  <strong>Last Due:</strong> ₹{studentDetails.lastDue}
                </div>
              </>
            )}
          </div>

          {/* Fee Breakdown */}
          <form>
            <h2 className="text-lg font-bold mb-4">Fee Breakdown</h2>
            {visibleFields.map((field) => (
              <div key={field.name} className="flex items-center justify-between mb-4">
                <div className="flex items-center w-3/4">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={field.visible}
                    onChange={() => handleFieldVisibilityChange(field.name)}
                  />
                  <label className="text-gray-700">{field.name}</label>
                </div>
                {field.visible && (
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="border border-gray-300 p-2 rounded w-32"
                    value={fees[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}

            {/* Total Amount */}
            <div className="mt-6">
              <h2 className="text-lg font-bold">Total Amount</h2>
              <div className="flex justify-between mt-2">
                <span>Last Due:</span>
                <span>₹{studentDetails.lastDue || 0}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Total Amount Paid:</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Amount in Words:</span>
                <span>{numberToIndianWords(total)}</span>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mt-6">
              <h2 className="text-lg font-bold">Payment Details</h2>
              <div className="mb-2">
                <label className="block text-gray-700">Payment Mode:</label>
                <select
                  className="border border-gray-300 p-2 rounded w-full"
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div className="mb-2">
                <strong>Transaction Number:</strong> {transactionNumber}
              </div>
              <div className="mb-2">
                <strong>Transaction Date:</strong> {currentDate}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={() => setIsConfirmed(true)}
            >
              Confirm Receipt
            </button>
          </form>
        </div>
      ) : (
        <div ref={printRef} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          {/* Print Preview */}
          <div>
            <h1 className="text-2xl font-bold mb-4">Fee Receipt</h1>
            <div className="mb-2">
              <strong>Receipt Number:</strong> {receiptNumber}
            </div>
            <div className="mb-2">
              <strong>Date of Receipt:</strong> {currentDate}
            </div>
          </div>

          {/* Student Details */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Student Details</h2>
            {Object.entries(studentDetails)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <div key={key} className="mb-2">
                  <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                </div>
              ))}
          </div>

          {/* Fee Breakdown */}
          <h2 className="text-lg font-bold mb-4">Fee Breakdown</h2>
          {visibleFields
            .filter((field) => field.visible && fees[field.name] > 0)
            .map((field) => (
              <div key={field.name} className="flex justify-between mb-2">
                <span>{field.name}:</span>
                <span>₹{fees[field.name]}</span>
              </div>
            ))}

          {/* Total Amount */}
          <div className="mt-6">
            <h2 className="text-lg font-bold">Total Amount</h2>
            <div className="flex justify-between mt-2">
              <span>Total Amount Paid:</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Amount in Words:</span>
              <span>{numberToIndianWords(total)}</span>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mt-6">
            <h2 className="text-lg font-bold">Payment Details</h2>
            <div className="mb-2">
              <strong>Payment Mode:</strong> {paymentMode}
            </div>
            <div className="mb-2">
                <strong>Transaction Number:</strong> {transactionNumber}
              </div>
              <div className="mb-2">
                <strong>Transaction Date:</strong> {currentDate}
              </div>
            </div>

            {/* Print Button */}
            <button
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={handlePrint}
            >
              Print Receipt
            </button>
          </div>
        )}
      </div>

  );
}
