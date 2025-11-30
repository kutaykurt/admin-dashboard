import { Edit, SimpleForm, Toolbar, SaveButton, TextInput } from "react-admin";
import { bodyValidators, titleValidators } from "../validators/postValidators";
import { DeactivatePostButton } from "./DeactivatePostButton";

const PostEditToolbar = () => (
  <Toolbar>
    <SaveButton />
    <DeactivatePostButton />
  </Toolbar>
);

export const PostEdit = () => (
  <Edit>
    <SimpleForm toolbar={<PostEditToolbar />}>
      <TextInput source="id" disabled />

      <TextInput source="title" label="Titel" validate={titleValidators} />
      <TextInput
        source="body"
        label="Inhalt"
        multiline
        validate={bodyValidators}
      />
    </SimpleForm>
  </Edit>
);
