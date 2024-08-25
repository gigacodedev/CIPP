import PropTypes from "prop-types";
import { Button, IconButton, Tooltip } from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const PDFExportButton = (props) => {
  const { rows, columns, reportName } = props;

  const handleExportRows = (rows) => {
    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    const tableData = rows.map((row) => console.log(row.original));
    const exportColumns = columns.map((c) => ({ header: c.header, dataKey: c.accessorKey }));
    let content = {
      startY: 100,
      columns: exportColumns,
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [247, 127, 0] },
    };
    autoTable(doc, content);

    doc.save(reportName);
  };
  return (
    <Tooltip title="Export to PDF">
      <IconButton disabled={rows.length === 0} onClick={() => handleExportRows(rows)}>
        <PictureAsPdf />
      </IconButton>
    </Tooltip>
  );
};