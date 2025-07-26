import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const sampleData = {
  title: 'OCS for WAVE EMB',
  metadata: {
    buyerName: 'ABC Buyer',
    orderNo: 'ORD123',
    styleName: 'Cool Shirt',
    date: '2025-05-30',
    season: 'Summer 2025',
    color: 'Navy Blue',
  },
  sections: [
    {
      title: 'FABRIC ITEMS',
      items: [
        { material: 'Cotton Fabric', qty: 100, rate: 4.5, remarks: 'Main body' },
        { material: 'Lining Fabric', qty: 50, rate: 3.2, remarks: 'Inner layer' },
      ],
    },
    {
      title: 'EMBROIDERY ITEMS',
      items: [
        { material: 'Thread', qty: 20, rate: 2, remarks: 'Decorative' },
        { material: 'Backing', qty: 10, rate: 1.5, remarks: 'Support' },
      ],
    },
    {
      title: 'ACCESSORIES',
      items: [
        { material: 'Buttons', qty: 100, rate: 0.5, remarks: 'Plastic' },
        { material: 'Zippers', qty: 20, rate: 1.8, remarks: '8-inch' },
      ],
    },
  ],
};

// PDF STYLES
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 10 },
  title: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
  row: { flexDirection: 'row', marginBottom: 2 },
  label: { width: '25%', fontWeight: 'bold' },
  value: { width: '25%' },
  sectionHeader: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#eee',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    padding: 5,
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    padding: 2,
    border: '1 solid #ccc',
    textAlign: 'center',
  },
});

const PdfDoc = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{data.title}</Text>
      {[
        ['Buyer Name', data.metadata.buyerName, 'Order No', data.metadata.orderNo],
        ['Style Name', data.metadata.styleName, 'Date', data.metadata.date],
        ['Season', data.metadata.season, 'Color', data.metadata.color],
      ].map((row, i) => (
        <View style={styles.row} key={i}>
          <Text style={styles.label}>{row[0]}</Text>
          <Text style={styles.value}>{row[1]}</Text>
          <Text style={styles.label}>{row[2]}</Text>
          <Text style={styles.value}>{row[3]}</Text>
        </View>
      ))}
      {data.sections.map((section, i) => (
        <View key={i}>
          <Text style={styles.sectionHeader}>{section.title}</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>S.No</Text>
            <Text style={styles.cell}>Material</Text>
            <Text style={styles.cell}>Qty</Text>
            <Text style={styles.cell}>Rate</Text>
            <Text style={styles.cell}>Amount</Text>
            <Text style={styles.cell}>Remarks</Text>
          </View>
          {section.items.map((item, j) => (
            <View style={styles.row} key={j}>
              <Text style={styles.cell}>{j + 1}</Text>
              <Text style={styles.cell}>{item.material}</Text>
              <Text style={styles.cell}>{item.qty}</Text>
              <Text style={styles.cell}>{item.rate}</Text>
              <Text style={styles.cell}>{(item.qty * item.rate).toFixed(2)}</Text>
              <Text style={styles.cell}>{item.remarks}</Text>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

// Excel Export Function
const exportToExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('OCS');

  sheet.mergeCells('A1', 'F1');
  sheet.getCell('A1').value = data.title;
  sheet.getCell('A1').font = { size: 16, bold: true };
  sheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

  let rowIdx = 3;
  const metaRows = [
    ['Buyer Name', data.metadata.buyerName, 'Order No', data.metadata.orderNo],
    ['Style Name', data.metadata.styleName, 'Date', data.metadata.date],
    ['Season', data.metadata.season, 'Color', data.metadata.color],
  ];
  metaRows.forEach((row) => {
    sheet.addRow(row);
    rowIdx++;
  });

  rowIdx += 1;

  data.sections.forEach((section) => {
    sheet.mergeCells(`A${rowIdx}:F${rowIdx}`);
    sheet.getCell(`A${rowIdx}`).value = section.title;
    sheet.getCell(`A${rowIdx}`).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFDDDDDD' },
    };
    rowIdx++;

    sheet.addRow(['S.No', 'Material', 'Qty', 'Rate', 'Amount', 'Remarks']);
    sheet.getRow(rowIdx).font = { bold: true };
    rowIdx++;

    section.items.forEach((item, idx) => {
      const amount = item.qty * item.rate;
      sheet.addRow([idx + 1, item.material, item.qty, item.rate, amount, item.remarks]);
      rowIdx++;
    });

    const total = section.items.reduce((acc, i) => acc + i.qty * i.rate, 0);
    sheet.addRow(['', '', '', 'Total', total, '']);
    rowIdx += 2;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${data.title}.xlsx`);
};

// Combined Export Component
const ExportOCS = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <button
        onClick={() => exportToExcel(sampleData)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Download Excel
      </button>

      <PDFDownloadLink
        document={<PdfDoc data={sampleData} />}
        fileName={`${sampleData.title}.pdf`}
      >
        {({ loading }) => (
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#388e3c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default ExportOCS;
