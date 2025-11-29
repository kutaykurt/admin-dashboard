import { Show, SimpleShowLayout, TextField, EmailField } from "react-admin";

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" label="Firma" />
            <TextField source="address.city" label="Stadt" />
        </SimpleShowLayout>
    </Show>
)