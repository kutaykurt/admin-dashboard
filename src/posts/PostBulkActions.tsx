import { BulkExportButton } from "react-admin";
import { BulkPublishButton } from "./BulkPublishButton";
import { BulkDeleteButton } from "./BulkDeleteButton";

export const PostBulkActions = () => (
  <>
    <BulkPublishButton />
    <BulkExportButton label="Exportieren" />
    <BulkDeleteButton />
  </>
);
