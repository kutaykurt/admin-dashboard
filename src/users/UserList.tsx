import { List, Datagrid, TextField, EmailField, TextInput } from "react-admin";

const userFilters = [
    <TextInput label="Suchen (Name)" source="name" alwaysOn />,
    <TextInput label="Suchen (Username)" source="username" />
]

export const UserList = () => (
    <List filters={userFilters}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" label="Name" />
            <TextField source="username" label="Benutzername" />
            <EmailField source="email" label="E-Mail" />
            <TextField source="phone" label="Telefon" />
        </Datagrid>
    </List>
)