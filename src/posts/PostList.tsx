import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  TextInput,
  NumberInput,
  BooleanField,
} from "react-admin";

import { PostBulkActions } from "./PostBulkActions";

const postFilters = [
  <TextInput label="Suche nach Titel" source="q" alwaysOn />,
  <NumberInput label="User ID" source="userId" alwaysOn />,
];

export const PostList = () => (
  <List filters={postFilters} perPage={20} sort={{ field: "id", order: "ASC" }}>
    <Datagrid rowClick="edit" bulkActionButtons={<PostBulkActions />}>
      <TextField source="id" />
      <TextField source="title" label="Titel" />
      <ReferenceField source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="body" label="Inhalt" />
      <BooleanField source="published" />
      <BooleanField source="active" />
    </Datagrid>
  </List>
);
