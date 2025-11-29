import { Edit, SimpleForm, TextInput } from "react-admin";
import { bodyValidators, titleValidators } from "../validators/postValidators";

export const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />

            <TextInput source="title" label="Titel" validate={titleValidators} />
            <TextInput source="body" label="Inhalt" multiline validate={bodyValidators} />
        </SimpleForm>
    </Edit>
)