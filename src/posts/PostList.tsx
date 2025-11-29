import { List, Datagrid, TextField, ReferenceField, TextInput, NumberInput } from "react-admin";

const postFilters = [
    <TextInput label="Suche nach Titel" source="q" alwaysOn />,
    <NumberInput label="User ID" source="userId" alwaysOn />,
];

export const PostList = () => (
    <List filters={postFilters} perPage={20} sort={{ field: "id", order: "ASC" }}>
        <Datagrid rowClick="edit" >
            <TextField source="id" />
            <TextField source="title" label="Titel" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="body" label="Inhalt" />
        </Datagrid>
    </List>
) 