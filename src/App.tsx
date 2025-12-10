import React from "react";
import "./App.css";
import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import jsonServerProvider from "ra-data-json-server";
import { PostCreate } from "./posts/PostCreate";
import { PostEdit } from "./posts/PostEdit";
import { PostShow } from "./posts/PostShow";
import { PostList } from "./posts/PostList";
import { UserList } from "./users/UserList";
import { UserShow } from "./users/UserShow";
import { UserEdit } from "./users/UserEdit";
import { UserCreate } from "./users/UserCreate";
import { EventList } from "./events/EventList";
import { Settings } from "./settings/Settings";
import { InvoiceList } from "./finance/InvoiceList";
import { KanbanPage } from "./posts/KanbanPage";
import { HelpPage } from "./help/HelpPage";
import { ChatLayout } from "./chat/ChatLayout";
import { ProductList } from "./ecommerce/ProductList";
import { OrderList } from "./ecommerce/OrderList";
import Dashboard from "./dashboard/Dashboard";
import theme from "./theme";
import MyLayout from "./layout/MyLayout";
import EventIcon from "@mui/icons-material/Event";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      dashboard={Dashboard}
      theme={theme}
      layout={MyLayout}
    >
      <Resource
        name="posts"
        list={PostList}
        create={PostCreate}
        edit={PostEdit}
        show={PostShow}
      />
      <Resource
        name="users"
        list={UserList}
        show={UserShow}
        edit={UserEdit}
        create={UserCreate}
      />
      <Resource
        name="events"
        list={EventList}
        icon={EventIcon}
        options={{ label: "Termine" }}
      />
      <Resource
        name="products"
        list={ProductList}
        icon={ShoppingBagIcon}
        options={{ label: "Waren" }}
      />
      <Resource
        name="orders"
        list={OrderList}
        icon={LocalShippingIcon}
        options={{ label: "Bestellungen" }}
      />
      <Resource
        name="invoices"
        list={InvoiceList}
        icon={ReceiptIcon}
        options={{ label: "Finanzen" }}
      />
      <CustomRoutes>
        <Route path="/chat" element={<ChatLayout />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/kanban" element={<KanbanPage />} />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
