import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ExcelExport = () => {
  const exportData = {
    title: 'OCS for WAVE EMB',
    metadata: {
      buyerName: 'ABC Buyer',
      orderNo: 'ORD123',
      styleName: 'Cool Shirt',
      date: '2025-05-30',
      season: 'Summer 2025',
      color: 'Navy Blue'
    },
    sections: [
      {
        title: 'FABRIC ITEMS',
        items: [
          { material: 'Cotton Fabric', qty: 100, rate: 4.5, remarks: 'Main body' },
          { material: 'Lining Fabric', qty: 50, rate: 3.2, remarks: 'Inner layer' }
        ]
      },
      {
        title: 'EMBROIDERY ITEMS',
        items: [
          { material: 'Embroidery Thread', qty: 20, rate: 2, remarks: 'Decorative' },
          { material: 'Backing Paper', qty: 10, rate: 1.5, remarks: 'Support' }
        ]
      },
      {
        title: 'ACCESSORIES',
        items: [
          { material: 'Buttons', qty: 100, rate: 0.5, remarks: 'Plastic, 2-hole' },
          { material: 'Zippers', qty: 20, rate: 1.8, remarks: '8-inch' }
        ]
      }
    ]
  };

  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('OCS Sheet');

    let currentRow = 1;

    // Title row
    sheet.mergeCells(`A${currentRow}:F${currentRow}`);
    const titleCell = sheet.getCell(`A${currentRow}`);
    titleCell.value = exportData.title;
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: 'center' };
    currentRow += 2;

    // Metadata
    const meta = exportData.metadata;
    const metadataRows = [
      ['Buyer Name', meta.buyerName, 'Order No', meta.orderNo],
      ['Style Name', meta.styleName, 'Date', meta.date],
      ['Season', meta.season, 'Color', meta.color]
    ];

    metadataRows.forEach(row => {
      row.forEach((val, i) => {
        const cell = sheet.getCell(currentRow, i + 1);
        cell.value = val;
        if (i % 2 === 0) cell.font = { bold: true };
      });
      currentRow++;
    });

    currentRow++;

    // Section headers and tables
    for (const section of exportData.sections) {
      sheet.mergeCells(`A${currentRow}:F${currentRow}`);
      const secCell = sheet.getCell(`A${currentRow}`);
      secCell.value = section.title;
      secCell.font = { bold: true };
      secCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE5E5E5' }
      };
      secCell.alignment = { horizontal: 'center' };
      currentRow++;

      // Table headers
      const headers = ['S.No', 'Material', 'Qty', 'Rate', 'Amount', 'Remarks'];
      headers.forEach((h, i) => {
        const cell = sheet.getCell(currentRow, i + 1);
        cell.value = h;
        cell.font = { bold: true };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD3D3D3' }
        };
        cell.alignment = { horizontal: 'center' };
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
      currentRow++;

      // Material rows
      section.items.forEach((item, index) => {
        const rowIndex = currentRow;
        const cells = [
          index + 1,
          item.material,
          item.qty,
          item.rate,
          { formula: `C${rowIndex}*D${rowIndex}`, result: item.qty * item.rate },
          item.remarks
        ];

        cells.forEach((val, col) => {
          const cell = sheet.getCell(rowIndex, col + 1);
          cell.value = val;
          cell.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          };
        });

        currentRow++;
      });

      // Total row
      sheet.mergeCells(`A${currentRow}:D${currentRow}`);
      const totalLabel = sheet.getCell(`A${currentRow}`);
      totalLabel.value = 'TOTAL';
      totalLabel.font = { bold: true };
      totalLabel.alignment = { horizontal: 'right' };

      const totalFormulaCell = sheet.getCell(`E${currentRow}`);
      totalFormulaCell.value = {
        formula: `SUM(E${currentRow - section.items.length}:E${currentRow - 1})`
      };
      totalFormulaCell.font = { bold: true };

      currentRow += 2;
    }

    // Adjust column widths
    sheet.columns.forEach(col => {
      col.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'OCS_WAVE_EMB_Styled.xlsx');
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        padding: '12px 20px',
        fontSize: '16px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '5px'
      }}
    >
      Download Styled Excel
    </button>
  );
};

export default ExcelExport;
