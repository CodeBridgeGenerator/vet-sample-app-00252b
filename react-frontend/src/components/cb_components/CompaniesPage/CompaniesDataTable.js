import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useRef } from "react";
import _ from "lodash";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/uploadService";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";

const CompaniesDataTable = ({
  items,
  fields,
  onEditRow,
  onRowDelete,
  onRowClick,
  searchDialog,
  setSearchDialog,
  showUpload,
  setShowUpload,
  showFilter,
  setShowFilter,
  showColumns,
  setShowColumns,
  onClickSaveFilteredfields,
  selectedFilterFields,
  setSelectedFilterFields,
  selectedHideFields,
  setSelectedHideFields,
  onClickSaveHiddenfields,
  loading,
  user,
}) => {
  const dt = useRef(null);
  const urlParams = useParams();
  const [globalFilter, setGlobalFilter] = useState("");

  const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.name}</p>;
  const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.companyNo}</p>;
  const p_numberTemplate2 = (rowData, { rowIndex }) => (
    <p>{rowData.newCompanyNumber}</p>
  );
  const p_calendarTemplate3 = (rowData, { rowIndex }) => (
    <p>{rowData.DateIncorporated}</p>
  );
  const dropdownTemplate4 = (rowData, { rowIndex }) => (
    <p>{rowData.addresses?.Street1}</p>
  );
  const p_booleanTemplate5 = (rowData, { rowIndex }) => (
    <p>{String(rowData.isdefault)}</p>
  );
  const editTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onEditRow(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );

  const handleUploadComplete = () => {
    console.log(
      "Upload completed. You can now close the dialog or take other actions.",
    );
    // Any other actions you need
  };
  const deleteTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onRowDelete(rowData._id)}
      icon="pi pi-times"
      className="p-button-rounded p-button-danger p-button-text"
    />
  );
  const pCreatedAt = (rowData, { rowIndex }) => (
    <p>{moment(rowData.createdAt).fromNow()}</p>
  );
  const pUpdatedAt = (rowData, { rowIndex }) => (
    <p>{moment(rowData.updatedAt).fromNow()}</p>
  );
  const pCreatedBy = (rowData, { rowIndex }) => (
    <p>{rowData.createdBy?.name}</p>
  );
  const pUpdatedBy = (rowData, { rowIndex }) => (
    <p>{rowData.updatedBy?.name}</p>
  );
  const paginatorLeft = (
    <Button
      type="button"
      icon="pi pi-upload"
      text
      onClick={() => setShowUpload(true)}
    />
  );
  const paginatorRight = DownloadCSV({ data: items, fileName: "download" });

  return (
    <>
      <DataTable
        value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
      >
        <Column
          field="name"
          header="Name"
          body={pTemplate0}
          filter={selectedFilterFields.includes("name")}
          hidden={selectedHideFields?.includes("name")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="companyNo"
          header="Company no"
          body={pTemplate1}
          filter={selectedFilterFields.includes("companyNo")}
          hidden={selectedHideFields?.includes("companyNo")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="newCompanyNumber"
          header="New company number"
          body={p_numberTemplate2}
          filter={selectedFilterFields.includes("newCompanyNumber")}
          hidden={selectedHideFields?.includes("newCompanyNumber")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="DateIncorporated"
          header="Date Incorporated"
          body={p_calendarTemplate3}
          filter={selectedFilterFields.includes("DateIncorporated")}
          hidden={selectedHideFields?.includes("DateIncorporated")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="addresses"
          header="Addresses"
          body={dropdownTemplate4}
          filter={selectedFilterFields.includes("addresses")}
          hidden={selectedHideFields?.includes("addresses")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="isdefault"
          header="Is default"
          body={p_booleanTemplate5}
          filter={selectedFilterFields.includes("isdefault")}
          hidden={selectedHideFields?.includes("isdefault")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column header="Edit" body={editTemplate} />
        <Column header="Delete" body={deleteTemplate} />
        {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
        {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
        {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
        {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
      </DataTable>
      <Dialog
        header="Upload Companies Data"
        visible={showUpload}
        onHide={() => setShowUpload(false)}
      >
        <UploadService
          user={user}
          serviceName="companies"
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}
        />
      </Dialog>

      <Dialog
        header="Search Companies"
        visible={searchDialog}
        onHide={() => setSearchDialog(false)}
      >
        Search
      </Dialog>
      <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false);
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false);
          }}
        ></Button>
      </Dialog>
    </>
  );
};

export default CompaniesDataTable;
