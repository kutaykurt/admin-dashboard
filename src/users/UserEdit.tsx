import { Edit, SimpleForm, TextInput } from "react-admin";
import { nameValidators, usernameValidators, emailValidators } from "../validators/userValidators";

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" validate={nameValidators} />
            <TextInput source="username" validate={usernameValidators} />
            <TextInput source="email" validate={emailValidators} />
            <TextInput source="phone" />
            <TextInput source="website" />
        </SimpleForm>
    </Edit>
)