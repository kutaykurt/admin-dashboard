import {
  useDeleteMany,
  useNotify,
  useRefresh,
  Button,
  Confirm,
} from "react-admin";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

type BulkDeleteProps = {
  selectedIds?: number[];
};

export const BulkDeleteButton = ({ selectedIds = [] }: BulkDeleteProps) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [deleteMany, { isLoading }] = useDeleteMany();
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    deleteMany(
      "posts",
      { ids: selectedIds },
      {
        onSuccess: () => {
          notify(`${selectedIds.length} Beiträge gelöscht`, { type: "info" });
          refresh();
          setOpen(false);
        },
        onError: () => {
          notify("Fehler beim Löschen", { type: "warning" });
        },
      }
    );
  };

  return (
    <>
      <Button
        label="Löschen"
        onClick={() => setOpen(true)}
        disabled={isLoading}
      >
        <DeleteIcon />
      </Button>

      <Confirm
        isOpen={open}
        title="Beiträge löschen?"
        content="Diese Aktion kann nicht rückgängig gemacht werden."
        onConfirm={handleConfirm}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
