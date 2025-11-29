import { Show, SimpleShowLayout, TextField } from "react-admin";

export const PostShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" label="Titel" />
            <TextField source="body" label="Inhalt" />
        </SimpleShowLayout>
    </Show>
)