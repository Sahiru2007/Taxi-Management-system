import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize,Search, Sort,  Toolbar, ContextMenu, Delete,Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Button } from '../../components/PassengerDashboard'; // Import the Button component
import { MdOutlineCancel, MdAdd } from 'react-icons/md'; // Import the necessary icons
import { ordersData, contextMenuItems, ordersGrid } from '../../data/dummy';
import { Header } from '../../components/PassengerDashboard';
import { useStateContext } from '../../contexts/ContextProvider';


const Reservations = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Search', 'Delete' ];
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentColor, currentMode } = useStateContext();
  
  const handleAddButtonClick = () => {
    // Implement the logic for adding here
    console.log('Add button clicked');
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="My History" />
      <div className="flex justify-between items-center mb-4">
        {/* Your existing button */}
      
       
      </div>
      
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        editSettings={editing}
         toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, Filter, Page, ExcelExport, Edit, PdfExport, Search,  Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Reservations;
