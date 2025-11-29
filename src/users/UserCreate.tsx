import { Create, SimpleForm, TextInput } from "react-admin";
import { nameValidators, usernameValidators, emailValidators } from "../validators/userValidators";

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={nameValidators} />
            <TextInput source="username" validate={usernameValidators} />
            <TextInput source="email" validate={emailValidators} />
            <TextInput source="phone" />
            <TextInput source="website" />
        </SimpleForm>
    </Create>
)