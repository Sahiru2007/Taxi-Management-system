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
      <Header title="Reservations" />
      <div className="flex justify-between items-center mb-4">
        {/* Your existing button */}
        <button type="button" className="text-white text-xs rounded p-1 px-2 bg-orange">
          5 New
        </button>
        
        {/* New button with a Plus icon for adding */}
        <Button
          icon={<MdAdd />}
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          onClick={handleAddButtonClick}
          bgColor={currentColor}
        />
        
       
      </div>
      
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
         toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search,  Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Reservations;
