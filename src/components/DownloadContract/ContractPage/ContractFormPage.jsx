import { BACKEND_URL } from "@/constant/constant"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Heading, HeadingTitle, Passengers } from "./PassengerForm"
import { Step1, Step10, Step11, Step12, Step12A, Step12B, Step13, Step14, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step9A } from "./StepForm"

export const ContractFormPage = ({ contractId }) => {

    const [contractData, setContractData] = useState(null)
    const [selected, setSelected] = useState("parent")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const [formData, setFormData] = useState({
        passengerInfo: Array.from({ length: 2 }, () => ({
            fullName: '',
            email: '',
            phone: '',
            address: '',
            isDrivingLicense: false,
            drivingLicenseNumber: ''
        })),
        renterInfo: selected,
        renterDetailsInfo: false,
        isInspectionAgree: false,
        isLifeJacketAndSafetyAgree: false,
        isCastaicLakeAgree: false,
        isRenterWarrantyAgree: false,
        isSafetyVideoAgree: false,
        isSignatureAgree: false,
    });

    useEffect(() => {
        const fetchContractData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/contract-document/${contractId}`);
                const data = await response.json();
                setContractData(data?.data);
            } catch (error) {
                console.error("Error fetching contract data:", error);
            }
        }
        fetchContractData();
    }, [contractId])

    useEffect(() => {
        // update formData when contractData changes
        if (contractData) {
            setFormData({
                passengerInfo: contractData.passengerInfo,
                renterInfo: contractData.renterInfo,
                renterDetailsInfo: contractData.renterDetailsInfo,
                isInspectionAgree: contractData.isInspectionAgree,
                isLifeJacketAndSafetyAgree: contractData.isLifeJacketAndSafetyAgree,
                isCastaicLakeAgree: contractData.isCastaicLakeAgree,
                isRenterWarrantyAgree: contractData.isRenterWarrantyAgree,
                isSafetyVideoAgree: contractData.isSafetyVideoAgree,
                isSignatureAgree: contractData.isSignatureAgree,
            });
            setSelected(contractData.renterInfo);
        }
    }, [contractData]);

    const downloadPDF = async () => {
        setIsLoading(true);
        try {
            // Create a print-optimized version using browser's print functionality
            const printWindow = window.open('', '_blank');
            const contractElement = document.getElementById('contract-content');
            
            if (!contractElement) {
                console.error('Contract content element not found');
                setIsLoading(false);
                return;
            }

            // Get all stylesheets
            const stylesheets = Array.from(document.styleSheets)
                .map(sheet => {
                    try {
                        return Array.from(sheet.cssRules)
                            .map(rule => rule.cssText)
                            .join('\n');
                    } catch (e) {
                        return '';
                    }
                })
                .join('\n');

            // Create print document
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Contract - ${contractId}</title>
                    <style>
                        ${stylesheets}
                        
                        /* Print-specific styles */
                        @page {
                            size: A4;
                            margin: 0.5in;
                        }
                        
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                            line-height: 1.4;
                            color: #000000 !important;
                            background: #ffffff !important;
                            margin: 0;
                            padding: 20px;
                        }
                        
                        * {
                            color: #000000 !important;
                            background-color: transparent !important;
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        
                        .bg-\\[\\#88907B\\] {
                            background-color: #88907B !important;
                            color: #ffffff !important;
                        }
                        
                        .border-gray-400 {
                            border-color: #9CA3AF !important;
                        }
                        
                        .download-btn {
                            display: none !important;
                        }
                        
                        input, textarea, select {
                            border: 1px solid #000000 !important;
                            background: #ffffff !important;
                            color: #000000 !important;
                        }
                        
                        input[type="checkbox"]:checked {
                            background-color: #000000 !important;
                        }
                        
                        /* Ensure text is visible */
                        h1, h2, h3, h4, h5, h6, p, span, div, label {
                            color: #000000 !important;
                        }
                        
                        /* Form elements */
                        .form-input, .form-textarea, .form-select {
                            background-color: #ffffff !important;
                            color: #000000 !important;
                            border: 1px solid #000000 !important;
                        }
                    </style>
                </head>
                <body>
                    ${contractElement.outerHTML}
                </body>
                </html>
            `);

            printWindow.document.close();
            
            // Wait for content to load
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
            setIsLoading(false);
        }
    };

    // Simple and reliable PDF generation using window.print
    // const downloadPDF = () => {
    //     const printContents = document.getElementById('contract-content');
    //     const originalContents = document.body.innerHTML;

    //     // Create print-friendly HTML
    //     const printHTML = `
    //         <!DOCTYPE html>
    //         <html>
    //         <head>
    //             <title>Contract Agreement</title>
    //             <style>
    //                 @page {
    //                     size: A4;
    //                     margin: 0.75in;
    //                 }
                    
    //                 body {
    //                     font-family: Arial, sans-serif;
    //                     font-size: 12px;
    //                     line-height: 1.4;
    //                     color: #000000;
    //                     background: #ffffff;
    //                     margin: 0;
    //                     padding: 0;
    //                 }
                    
    //                 .container {
    //                     max-width: 100%;
    //                     margin: 0 auto;
    //                     padding: 20px;
    //                     background: #ffffff;
    //                     color: #000000;
    //                 }
                    
    //                 h1, h2, h3, h4, h5, h6 {
    //                     color: #000000;
    //                     font-weight: bold;
    //                     margin: 15px 0 10px 0;
    //                 }
                    
    //                 p, div, span, label {
    //                     color: #000000;
    //                 }
                    
    //                 input, textarea, select {
    //                     border: 1px solid #000000;
    //                     background: #ffffff;
    //                     color: #000000;
    //                     padding: 2px 5px;
    //                 }
                    
    //                 .border {
    //                     border: 1px solid #000000;
    //                 }
                    
    //                 .rounded-4xl {
    //                     border-radius: 20px;
    //                 }
                    
    //                 .gap-12 > * {
    //                     margin-bottom: 30px;
    //                 }
                    
    //                 .flex {
    //                     display: flex;
    //                 }
                    
    //                 .flex-col {
    //                     flex-direction: column;
    //                 }
                    
    //                 .justify-end {
    //                     justify-content: flex-end;
    //                 }
                    
    //                 .py-10 {
    //                     padding-top: 40px;
    //                     padding-bottom: 40px;
    //                 }
                    
    //                 .p-5 {
    //                     padding: 20px;
    //                 }
                    
    //                 button {
    //                     display: none;
    //                 }
                    
    //                 /* Checkbox styles */
    //                 input[type="checkbox"] {
    //                     width: 15px;
    //                     height: 15px;
    //                     margin-right: 5px;
    //                 }
                    
    //                 /* Form grid layouts */
    //                 .grid {
    //                     display: grid;
    //                     gap: 10px;
    //                 }
                    
    //                 .grid-cols-2 {
    //                     grid-template-columns: 1fr 1fr;
    //                 }
                    
    //                 /* Ensure all text is black */
    //                 * {
    //                     color: #000000 !important;
    //                     background-color: transparent !important;
    //                 }
                    
    //                 .container, .container * {
    //                     background-color: #ffffff !important;
    //                 }
    //             </style>
    //         </head>
    //         <body>
    //             <div class="container">
    //                 ${printContents.innerHTML}
    //             </div>
    //         </body>
    //         </html>
    //     `;

    //     // Open new window for printing
    //     const printWindow = window.open('', '_blank');
    //     printWindow.document.write(printHTML);
    //     printWindow.document.close();
        
    //     // Wait for content to load then trigger print
    //     setTimeout(() => {
    //         printWindow.focus();
    //         printWindow.print();
    //         printWindow.close();
    //     }, 500);
    // };

    // Alternative: Direct PDF generation with better text handling
    const downloadPDFDirect = async () => {
        setIsLoading(true);
        try {
            const { default: jsPDF } = await import('jspdf');
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Add content as text (you'll need to extract text from your components)
            let yPosition = 20;
            const lineHeight = 7;
            const pageHeight = pdf.internal.pageSize.getHeight();
            
            // Title
            pdf.setFontSize(16);
            pdf.setFont(undefined, 'bold');
            pdf.text('CASTAIC LAKE BOAT RENTAL AGREEMENT', 105, yPosition, { align: 'center' });
            yPosition += lineHeight * 2;

            // Renter Information
            pdf.setFontSize(12);
            pdf.setFont(undefined, 'bold');
            pdf.text('1. RENTER INFORMATION', 20, yPosition);
            yPosition += lineHeight;
            
            pdf.setFont(undefined, 'normal');
            pdf.setFontSize(10);
            pdf.text(`Renter Type: ${formData.renterInfo}`, 20, yPosition);
            yPosition += lineHeight;

            // Passenger Information
            formData.passengerInfo?.forEach((passenger, index) => {
                if (yPosition > pageHeight - 20) {
                    pdf.addPage();
                    yPosition = 20;
                }
                
                pdf.setFont(undefined, 'bold');
                pdf.text(`Passenger ${index + 1}:`, 20, yPosition);
                yPosition += lineHeight;
                
                pdf.setFont(undefined, 'normal');
                pdf.text(`Name: ${passenger.fullName || 'Not provided'}`, 25, yPosition);
                yPosition += lineHeight;
                pdf.text(`Email: ${passenger.email || 'Not provided'}`, 25, yPosition);
                yPosition += lineHeight;
                pdf.text(`Phone: ${passenger.phone || 'Not provided'}`, 25, yPosition);
                yPosition += lineHeight;
                pdf.text(`Address: ${passenger.address || 'Not provided'}`, 25, yPosition);
                yPosition += lineHeight;
                pdf.text(`Driving License: ${passenger.isDrivingLicense ? 'Yes' : 'No'}`, 25, yPosition);
                yPosition += lineHeight;
                
                if (passenger.isDrivingLicense && passenger.drivingLicenseNumber) {
                    pdf.text(`License Number: ${passenger.drivingLicenseNumber}`, 25, yPosition);
                    yPosition += lineHeight;
                }
                yPosition += lineHeight;
            });

            // Add other sections
            const sections = [
                { title: '2. RENTAL DETAILS', checked: formData.renterDetailsInfo },
                { title: '3. INSPECTION OF EQUIPMENT AND SAFETY INVENTORY', checked: formData.isInspectionAgree },
                { title: '4. DAMAGE, CLEANING, DEPOSIT, AND CREDIT CARD AUTHORIZATION', checked: true },
                { title: '5. PROHIBITED ACTIVITIES', checked: true },
                { title: '6. LIFE JACKETS & SAFETY', checked: formData.isLifeJacketAndSafetyAgree },
                { title: '7. CASTAIC LAKE HAZARD NOTICE', checked: formData.isCastaicLakeAgree },
                { title: '8. RENTER WARRANTIES', checked: formData.isRenterWarrantyAgree },
                { title: '9. CANCELLATION & WEATHER POLICY', checked: true },
                { title: '9A. COMPANY INSURANCE DISCLOSURE', checked: true },
                { title: '10. RELEASE OF LIABILITY', checked: true },
                { title: '11. INDEMNIFICATION', checked: true },
                { title: '12. GOVERNING LAW', checked: true },
                { title: '12A. SAFETY VIDEO ACKNOWLEDGEMENT', checked: formData.isSafetyVideoAgree },
                { title: '12B. CASTAIC LAKE RULES & REGULATIONS', checked: formData.isCastaicLakeAgree },
                { title: '13. ENTIRE AGREEMENT', checked: true },
                { title: '14. SIGNATURES', checked: formData.isSignatureAgree }
            ];

            sections.forEach(section => {
                if (yPosition > pageHeight - 30) {
                    pdf.addPage();
                    yPosition = 20;
                }
                
                pdf.setFont(undefined, 'bold');
                pdf.setFontSize(12);
                pdf.text(section.title, 20, yPosition);
                yPosition += lineHeight;
                
                pdf.setFont(undefined, 'normal');
                pdf.setFontSize(10);
                if (typeof section.checked === 'boolean') {
                    pdf.text(`Status: ${section.checked ? 'Agreed/Acknowledged' : 'Pending'}`, 25, yPosition);
                    yPosition += lineHeight;
                }
                yPosition += lineHeight;
            });

            // Add generation date
            pdf.setFontSize(8);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 20, pageHeight - 10);

            const timestamp = new Date().toISOString().split('T')[0];
            const filename = `Castaic_Lake_Boat_Rental_Agreement_${contractId || 'Contract'}_${timestamp}.pdf`;
            pdf.save(filename);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-5 px-5 lg:px-50">
            <div id="contract-content" className="flex py-10 mt-5 flex-col border border-[#C5C5C5] p-5 rounded-4xl gap-12 bg-white">
                     <div className="flex justify-end">
                    
                    <button
                        type="button"
                        onClick={downloadPDF}
                        disabled={isLoading}
                        className="bg-[#88907B] text-white py-2 px-4 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        Print to PDF
                    </button>
                </div>
                <HeadingTitle />
                <div className="" >
                    <Heading title={"1. Renter Information"} />
                    <Step1 setSelected={setSelected} selected={selected} />
                    <Passengers guestCount={2} formData={formData} />
                </div>
                <div>
                    <Heading title={"2. RENTAL DETAILS"} />
                    <Step2 isChecked={formData.renterDetailsInfo}/>
                </div>
                <div>
                    <Heading title={"3. INSPECTION OF EQUIPMENT AND SAFETY INVENTORY"} />
                    <Step3
                        isChecked={formData.isInspectionAgree}
                    />
                </div>
                <div>
                    <Heading title={"4. DAMAGE, CLEANING, DEPOSIT, AND CREDIT CARD AUTHORIZATION"} />
                    <Step4 />
                </div>
                <div>
                    <Heading title={"5. PROHIBITED ACTIVITIES"} />
                    <Step5 />
                </div>
                <div>
                    <Heading title={"6. LIFE JACKETS & SAFETY"} />
                    <Step6
                        isChecked={formData.isLifeJacketAndSafetyAgree}
                    />
                </div>
                <div>
                    <Heading title={"7. CASTAIC LAKE HAZARD NOTICE"} />
                    <Step7
                        isChecked={formData.isCastaicLakeAgree}
                    />
                </div>
                <div>
                    <Heading title={"8. RENTER WARRANTIES"} />
                    <Step8
                        guestCount={2}
                        isChecked={formData.isRenterWarrantyAgree}
                    />
                </div>
                <div>
                    <Heading title={"9. CANCELLATION & WEATHER POLICY"} />
                    <Step9 />
                </div>
                <div>
                    <Heading title={"9A. COMPANY INSURANCE DISCLOSURE"} />
                    <Step9A />
                </div>
                <div>
                    <Heading title={"10. RELEASE OF LIABILITY"} />
                    <Step10 />
                </div>
                <div>
                    <Heading title={"11. INDEMNIFICATION"} />
                    <Step11 />
                </div>
                <div>
                    <Heading title={"12. GOVERNING LAW"} />
                    <Step12 />
                </div>
                <div>
                    <Heading title={"12A. SAFETY VIDEO ACKNOWLEDGEMENT"} />
                    <Step12A
                        isChecked={formData.isSafetyVideoAgree}
                    />
                </div>
                <div>
                    <Heading title={"12B. CASTAIC LAKE RULES & REGULATIONS"} />
                    <Step12B isChecked={formData.isCastaicLakeAgree}/>
                </div>
                <div>
                    <Heading title={"13. ENTIRE AGREEMENT"} />
                    <Step13 />
                </div>
                <div>
                    <Heading title={"14. SIGNATURES"} />
                    <Step14
                        guestCount={2}
                        passengerFiles={contractData?.documents}
                    />
                </div>
           
            </div>
        </div>
    )
}