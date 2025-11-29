import { Create, SimpleForm, TextInput } from "react-admin";
import { titleValidators, bodyValidators } from "../validators/postValidators";

export const PostCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" label="Titel" validate={titleValidators} />
            <TextInput source="body" label="Inhalt" multiline validate={bodyValidators} />
        </SimpleForm>
    </Create>
)