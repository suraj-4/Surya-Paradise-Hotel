import { Upload } from "antd";
import Papa from "papaparse";

const ImportExport = ({ data, onImport,fileName="table_data" }) => {

  // Export CSV
  const handleExport = () => {
    const csv = Papa.unparse(data);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.csv`;
    link.click();
  };

  // Import CSV
  const handleImport = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        onImport(result.data);
      },
    });

    return false;
  };

  return {
    handleExport,
    uploadProps: {
      beforeUpload: handleImport,
      showUploadList: false,
    },
  };
};

export default ImportExport;