import React from "react";
import "./App.css";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { PostCreate } from "./posts/PostCreate";
import { PostEdit } from "./posts/PostEdit";
import { PostShow } from "./posts/PostShow";
import { PostList } from "./posts/PostList";
import { UserList } from "./users/UserList";
import { UserShow } from "./users/UserShow";
import { UserEdit } from "./users/UserEdit";
import { UserCreate } from "./users/UserCreate";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function App() {
  return (
    <Admin dataProvider={dataProvider}>
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
    </Admin>
  );
}

export default App;
