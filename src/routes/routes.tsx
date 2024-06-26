import { Home } from "../pages/home/Home";
import { RouteObject } from "react-router-dom";
import Shell from "../components/shell/Shell";
import { Invoices } from "../pages/invoice/invoices/Invoices";
import { TopSecret } from "../pages/top-secret/TopSecret";
import { EditInvoice } from "../pages/invoice/edit-invoice/EditInvoice";
import { NotFound } from "../pages/not-found/NotFound";
import { ProtectedRoute } from "../components/protectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    id: "APP",
    element: <Shell />,
    children: [
      {
        id: "DASH",
        element: <Home />,
        index: true,
      },
      {
        id: "INVOICES",
        element: <Invoices />,
        path: "invoices",
      },
      {
        id: "EDIT_EXISTING_INVOICE",
        element: <EditInvoice />,
        path: "edit-invoice/:invoiceId",
      },
      {
        id: "EDIT_INVOICE",
        element: <EditInvoice />,
        path: "edit-invoice",
      },
      {
        id: "TOPSECRET",
        element: (
          <ProtectedRoute>
            <TopSecret />
          </ProtectedRoute>
        ),
        path: "top-secret",
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
