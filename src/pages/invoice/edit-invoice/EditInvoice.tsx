import {
  NumberInput,
  SimpleGrid,
  Table,
  TextInput,
  Text,
  Title,
  Container,
  Group,
  Button,
} from "@mantine/core";
import styles from "./EditInvoice.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { DatePicker } from "@mantine/dates";
import { Customer, Invoice } from "../Invoice.model";
import { createInvoice, fetchInvoice } from "../InvoiceApi";
import { convertToDateTime } from "../../../helpers/dateHelpers";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../../hooks";

type NotificationData = Parameters<typeof showNotification>[0];

type InvoiceFormState = Omit<Invoice, "dueDate"> & {
  dueDate: Date | null;
};

type NameAction = {
  type: "name";
  payload: string;
};

type SurnameAction = {
  type: "surname";
  payload: string;
};

type PriceNetAction = {
  type: "amount-net";
  payload: number;
};

type PriceGrossAction = {
  type: "amount-gross";
  payload: number;
};

type DateAction = {
  type: "date";
  payload: Date | null;
};

type FillInvoiceAction = {
  type: "fill-invoice";
  payload: Invoice;
};

type FormStateAction =
  | NameAction
  | DateAction
  | SurnameAction
  | PriceNetAction
  | PriceGrossAction
  | FillInvoiceAction;

const initialInvoiceFormState: InvoiceFormState = {
  customer: {
    givenname: "",
    surname: "",
  },
  priceNet: 0,
  priceGross: 0,
  dueDate: null,
  status: "OPEN",
  invoiceNumber: 1337,
  quantity: 1,
};

function formStateHandler(
  state: InvoiceFormState,
  action: FormStateAction
): InvoiceFormState {
  switch (action.type) {
    case "name":
      return {
        ...state,
        customer: {
          givenname: action.payload,
          surname: state.customer.surname,
        },
      };
    case "surname":
      return {
        ...state,
        customer: {
          surname: action.payload,
          givenname: state.customer.givenname,
        },
      };
    case "amount-net":
      return {
        ...state,
        priceNet: action.payload,
      };
    case "amount-gross":
      return {
        ...state,
        priceGross: action.payload,
      };
    case "date":
      return {
        ...state,
        dueDate: action.payload,
      };
    case "fill-invoice":
      return {
        customer: {
          givenname: action.payload.customer.givenname,
          surname: action.payload.customer.surname,
        },
        priceNet: action.payload.priceNet,
        priceGross: action.payload.priceGross,
        dueDate: new Date(action.payload.dueDate),
        status: action.payload.status,
        invoiceNumber: action.payload.invoiceNumber,
        quantity: action.payload.quantity,
      };
    default:
      return state;
  }
}

const EditInvoice = (): JSX.Element => {
  const t = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const isNewInvoice = params.invoiceId === undefined;
  const [invoiceForm, dispatch] = useReducer(
    formStateHandler,
    initialInvoiceFormState
  );

  useEffect(() => {
    if (!params.invoiceId) {
      return;
    }
    fetchInvoice(parseInt(params.invoiceId)).then((invoice) => {
      if (!invoice) {
        return;
      }
      dispatch({ type: "fill-invoice", payload: invoice });
    });
  }, []);

  function onAmountNetChange(value: number | undefined) {
    if (typeof value === "undefined") {
      return;
    }
    dispatch({ type: "amount-net", payload: value });
  }

  function onAmountGrossChange(value: number | undefined) {
    if (typeof value === "undefined") {
      return;
    }
    dispatch({ type: "amount-gross", payload: value });
  }

  async function submitInvoice(): Promise<void> {
    let notificationContent: Partial<NotificationData> = {};
    if (!invoiceForm.dueDate) {
      return;
    }
    const invoicePayload: Invoice = {
      ...invoiceForm,
      dueDate: convertToDateTime(invoiceForm.dueDate),
    };
    if (!isNewInvoice) {
      return alert("Invoice editing not yet implemented on the backend!");
    }
    try {
      await createInvoice(invoicePayload);
      notificationContent = {
        color: "green",
        title: "Invoice created",
        message: "Your invoice has been created successfully.",
      };
      navigate("/invoices");
    } catch (error) {
      notificationContent = {
        color: "red",
        title: "Could not create invoice",
        message: "There was an error creating your invoice. Please try again.",
      };
    } finally {
      showNotification(notificationContent as NotificationData);
    }
  }

  return (
    <Container mt={"md"}>
      <form>
        <Title mb={"xl"} order={2}>
          {isNewInvoice
            ? t("CREATE_INVOICE")
            : `${t("EDIT_INVOICE")}: ${params.invoiceId}`}
        </Title>
        <div className={styles["form-section"]}>
          <SimpleGrid cols={2}>
            <div>
              <Title order={5}>{t("DATE")}</Title>
              <Text fz="xs" c="dimmed">
                {t("INVOICE_FORM_DATE_LABEL")}
              </Text>
            </div>
            <DatePicker
              value={invoiceForm.dueDate}
              onChange={(value) => {
                dispatch({ type: "date", payload: value });
              }}
              placeholder="Select date"
              label="Due date"
              withAsterisk
            />
          </SimpleGrid>
        </div>
        <div className={styles["form-section"]}>
          <SimpleGrid cols={2}>
            <div>
              <Title order={5}>{t("CUSTOMER")}</Title>
              <Text fz="xs" c="dimmed">
                {t("INVOICE_FORM_CUSTOMER_LABEL")}{" "}
              </Text>
            </div>
            <div>
              <TextInput
                required={true}
                value={invoiceForm.customer.givenname}
                onChange={(e) => {
                  dispatch({ type: "name", payload: e.currentTarget.value });
                }}
                label={t("NAME")}
              />
              <TextInput
                required={true}
                value={invoiceForm.customer.surname}
                onChange={(e) => {
                  dispatch({ type: "surname", payload: e.currentTarget.value });
                }}
                label={t("SURNAME")}
              />
            </div>
          </SimpleGrid>
        </div>
        <div className={styles["form-section"]}>
          <SimpleGrid cols={2}>
            <div>
              <Title order={5}>{t("PRICE")}</Title>
            </div>
            <div>
              <NumberInput
                required={true}
                value={invoiceForm.priceNet}
                onChange={onAmountNetChange}
                precision={2}
                label={t("PRICE_NET")}
              />
              <NumberInput
                required={true}
                value={invoiceForm.priceGross}
                onChange={onAmountGrossChange}
                precision={2}
                label={t("PRICE_BRUT")}
              />
            </div>
          </SimpleGrid>
        </div>
        <Group position="right">
          <Button onClick={submitInvoice}>{t("CREATE_INVOICE")}</Button>
        </Group>
      </form>
    </Container>
  );
};

export { EditInvoice };
