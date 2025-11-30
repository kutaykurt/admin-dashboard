import { useUpdateMany, useNotify, useRefresh, Button } from "react-admin";
import BlockIcon from "@mui/icons-material/Block";

type BulkDeactivateProps = {
  selectedIds?: number[];
};

export const BulkDeactivateButton = ({
  selectedIds = [],
}: BulkDeactivateProps) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [updateMany, { isLoading }] = useUpdateMany();

  const handleClick = () => {
    if (selectedIds.length === 0) return;

    updateMany(
      "posts",
      { ids: selectedIds, data: { active: false } },
      {
        onSuccess: () => {
          notify(`${selectedIds.length} Beiträge deaktiviert`, {
            type: "info",
          });
          refresh();
        },
        onError: () => {
          notify("Fehler beim Deaktivieren", { type: "warning" });
        },
      }
    );
  };

  return (
    <Button label="Deaktivieren" onClick={handleClick} disabled={isLoading}>
      <BlockIcon />
    </Button>
  );
};
