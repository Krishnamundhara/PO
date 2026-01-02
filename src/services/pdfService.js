import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { formatDate } from '../lib/utils'

export const generatePDF = async (po, companyDetails) => {
  const content = createPDFContent(po, companyDetails)
  
  // Create a temporary div
  const div = document.createElement('div')
  div.innerHTML = content
  div.style.position = 'absolute'
  div.style.left = '-9999px'
  div.style.width = '210mm'
  div.style.padding = '20px'
  div.style.backgroundColor = 'white'
  div.style.fontFamily = 'Arial, sans-serif'
  document.body.appendChild(div)

  try {
    // Wait for images to load with timeout
    const images = div.querySelectorAll('img')
    await Promise.all(Array.from(images).map(img => new Promise((resolve) => {
      const timeout = setTimeout(resolve, 2000) // 2 second timeout
      img.onload = () => {
        clearTimeout(timeout)
        resolve()
      }
      img.onerror = () => {
        clearTimeout(timeout)
        resolve() // Resolve even if image fails
      }
      if (img.complete) {
        clearTimeout(timeout)
        resolve() // Already loaded
      }
    })))

    // Add a small delay to ensure images are rendered
    await new Promise(resolve => setTimeout(resolve, 500))

    // Convert to canvas
    const canvas = await html2canvas(div, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })

    // Create PDF
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    
    // Clean up
    document.body.removeChild(div)
    
    return pdf
  } catch (error) {
    if (document.body.contains(div)) {
      document.body.removeChild(div)
    }
    throw error
  }
}

export const downloadPDF = async (po, companyDetails) => {
  try {
    const pdf = await generatePDF(po, companyDetails)
    pdf.save(`PO-${po.po_number}.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}

export const sharePDF = async (po, companyDetails) => {
  try {
    const pdf = await generatePDF(po, companyDetails)
    const blob = pdf.output('blob')
    
    if (navigator.share && navigator.canShare({ files: [new File([blob], `PO-${po.po_number}.pdf`, { type: 'application/pdf' })] })) {
      const file = new File([blob], `PO-${po.po_number}.pdf`, { type: 'application/pdf' })
      await navigator.share({
        files: [file],
        title: `Purchase Order ${po.po_number}`,
        text: `Purchase Order for ${po.party_name}`
      })
    } else {
      // Fallback to download
      await downloadPDF(po, companyDetails)
    }
  } catch (error) {
    console.error('Error sharing PDF:', error)
    throw error
  }
}

const createPDFContent = (po, companyDetails) => {
  return `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 1px;">
        <h1 style="font-size: 18px; margin: 0; font-family: serif;">|| श्री:गणेशाय नमः ||</h1>
      </div>

       <!-- Company Details -->
      <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 1px; gap: 15px;">
        ${companyDetails?.logo ? `<div><img src="${companyDetails.logo}" style="max-width: 100px; max-height: 100px; object-fit: contain;" /></div>` : ''}
        <div style="text-align: left;">
          <h2 style="font-size: 18px; margin: 5px 0; font-weight: bold;">${companyDetails?.name || 'Company Name'}</h2>
          <p style="font-size: 12px; margin: 5px 0; line-height: 1.4;">${companyDetails?.address || ''}</p>
        </div>
      </div>
      </div>

      <!-- Order Number and Date -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; font-weight: bold;">
        <div>Order number: ${po.po_number}</div>
        <div>Date: ${formatDate(po.date)}</div>
      </div>

      <!-- Order Details Table -->
      <table style="width: 100%; border-collapse: collapse; margin: 5px 0; margin-bottom: 1px; border: 1px solid #000;">
        <tr>
        <td style="padding: 8px 12px; border: 1px solid #000; font-weight: bold; width: 40%;">PARTY NAME:</td>
        <td style="padding: 8px 12px; border: 1px solid #000;">${po.party_name || ''}</td>
        </tr>
        ${po.broker ? `
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #000; font-weight: bold;">BROKER:</td>
          <td style="padding: 8px 12px; border: 1px solid #000;">${po.broker}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #000; font-weight: bold;">MILL:</td>
          <td style="padding: 8px 12px; border: 1px solid #000;">${po.mill || ''}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #000; font-weight: bold;">QUALITY:</td>
          <td style="padding: 8px 12px; border: 1px solid #000;">${po.product || ''}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #000; font-weight: bold;">RATE:</td>
          <td style="padding: 8px 12px; border: 1px solid #000;">${po.rate || ''}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #000; font-weight: bold;">WEIGHT:</td>
          <td style="padding: 8px 12px; border: 1px solid #000;">${po.weight || ''} ${po.weight_unit || ''}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #000; font-weight: bold;">BAGS:</td>
          <td style="padding: 8px 12px; border: 1px solid #000;">${po.quantity || ''}</td>
        </tr>
        </table>
      
      <!-- Terms & Conditions -->
      ${po.terms_conditions ? `<div style="margin-bottom: 5px;"><strong>Terms & Conditions:</strong><p style="margin-top: 5px; margin-bottom: 5px;">${po.terms_conditions}</p></div>` : ''}
      
      <!-- Bank Details Footer -->
      ${companyDetails?.bank_name ? `
      <div style="margin-top: 5px; font-size: 12px; font-weight: bold;">
        <span>BANK DETAILS</span><br/>
        <span>${companyDetails.bank_name}${companyDetails.account_number ? ` , ACCOUNT NO ${companyDetails.account_number}` : ''}${companyDetails.ifsc_code ? ` , IFSC: ${companyDetails.ifsc_code}` : ''}${companyDetails.branch ? ` , BRANCH: ${companyDetails.branch}` : ''}</span>
      </div>
      ` : ''}
      
    </div>
    
  `
}
