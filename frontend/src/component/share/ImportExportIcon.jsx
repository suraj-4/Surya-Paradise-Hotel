import React from 'react'
import ImportExport from './ImportExport';
import { Import, MoreVertical } from 'lucide-react';
import { Button, Dropdown, Upload } from 'antd';

function ImportExportIcon({ data, onImport, fileName }) {

  const { handleExport, uploadProps } = ImportExport({
    data,
    onImport: (importedData) => {
      console.log("Imported:", importedData);
      onImport?.(importedData);
    },
    fileName: fileName, // ✅ correct
  });

  const items = [
    {
      key: "import",
      label: (
        <Upload {...uploadProps}>
          Import
        </Upload>
      ),
      icon: <Import size={20} />,
    },
    {
      key: "export",
      label: "Export",
      icon: <Import size={20} className="rotate-180" />,
      onClick: handleExport,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button className="border-0 shadow-0">
        <MoreVertical size={20} />
      </Button>
    </Dropdown>
  );
}

export default ImportExportIcon;
