import { Button, Table } from "@mantine/core";
import clsx from "clsx";
import styles from "./Invoices.module.scss";
import { useEffect, useState } from "react";
import { Invoice } from "../Invoice.model";
import { fetchAllInvoices, deleteInvoice } from "../InvoiceApi";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { SingleInvoiceStatus } from "./components";
import { invoices as dummyInvoices } from "../dummyData/dummyData";
import sortBy from "sort-by";
import { IconSortAscending2, IconSortDescending2 } from "@tabler/icons";

export const sortableColumns = {
  invoiceNumber: "ID",
  creationDate: "Create date",
  "customer.givenname": "First Name",
  "customer.surname": "Last Name",
  priceNet: "Net price",
  priceGross: "Gross price",
  dueDate: "Due date",
  status: "Status",
};

export type SortableColumn = keyof typeof sortableColumns;

const Invoices = (): JSX.Element => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<SortableColumn>("invoiceNumber");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (invoices: Invoice[]) => {
    const direction = sortDirection === "asc" ? "-" : "";
    const data = [...invoices].sort(sortBy(`${direction}${sortColumn}`));
    return data;
  };

  const getInvoices = () => {
    fetchAllInvoices().then((invoices) => {
      setInvoices(handleSort(dummyInvoices));
    });
  };

  useEffect(() => {
    getInvoices();
  }, []);

  useEffect(() => {
    setInvoices(handleSort(invoices));
  }, [sortColumn, sortDirection]);

  const handleDelete = async (invoiceId: number | undefined) => {
    if (!invoiceId) {
      return;
    }
    try {
      await deleteInvoice(invoiceId);
      // * While you can do this with the state
      // setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
      // * but I prefer the API call
      await getInvoices();
    } catch (error) {
      showNotification({
        color: "red",
        title: "Could not delete invoice",
        message: "There was an error deleting your invoice. Please try again.",
      });
    }
  };

  const rows = invoices.map((invoice) => (
    <tr
      className={styles["invoice-table-row"]}
      key={invoice.id}
      onClick={() => {
        navigate(`/edit-invoice/${invoice.id}`);
      }}
    >
      <td>{invoice.invoiceNumber}</td>
      <td>
        {invoice.creationDate
          ? new Date(invoice.creationDate).toLocaleDateString("en-GB")
          : "-"}
      </td>
      <td>{invoice.customer.givenname}</td>
      <td>{invoice.customer.surname}</td>

      <td>{invoice.priceNet}</td>
      <td>{invoice.priceGross}</td>
      <td>{new Date(invoice.dueDate).toLocaleDateString("en-GB")}</td>
      <td>
        <SingleInvoiceStatus status={invoice.status} />
      </td>
      <td>
        <Button
          color="red"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(invoice.id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className={clsx(styles["invoices"])}>
      <Table highlightOnHover>
        <thead>
          <tr>
            {Object.entries(sortableColumns).map(([key, value]) => (
              <th
                style={{ cursor: "pointer" }}
                key={key}
                onClick={() => {
                  if (key === sortColumn) {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else {
                    setSortColumn(key as SortableColumn);
                    setSortDirection("asc");
                  }
                }}
              >
                {value}
                {key === sortColumn && sortDirection === "asc" && (
                  <IconSortAscending2 />
                )}
                {key === sortColumn && sortDirection === "desc" && (
                  <IconSortDescending2 />
                )}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export { Invoices };
