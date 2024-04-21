import { FC, ReactNode } from "react";
import { InvoiceStatus } from "../../Invoice.model";
import {
  IconFileInvoice,
  IconEdit,
  IconCurrencyDollar,
  IconCircleX,
} from "@tabler/icons";
import { Flex } from "@mantine/core";

const icons: Record<InvoiceStatus, ReactNode> = {
  OPEN: (
    <>
      <IconFileInvoice />
      Open
    </>
  ),
  DRAFT: (
    <>
      <IconEdit />
      Draft
    </>
  ),
  PAID: (
    <>
      <IconCurrencyDollar />
      Paid
    </>
  ),
  CANCELLED: (
    <>
      <IconCircleX />
      Cancelled
    </>
  ),
};

export type SingleInvoiceStatusProps = {
  status: InvoiceStatus;
};

export const SingleInvoiceStatus: FC<SingleInvoiceStatusProps> = ({
  status,
}) => {
  if (!status) {
    return null;
  }

  return (
    <Flex align="center" gap={"xs"}>
      {icons[status]}
    </Flex>
  );
};
