import { useUpdateMany, useRefresh, useNotify, Button } from "react-admin";
import PublishIcon from "@mui/icons-material/Publish";

type BulkPublishProps = {
  selectedIds?: number[];
};

export const BulkPublishButton = ({ selectedIds = [] }: BulkPublishProps) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [updateMany, { isLoading }] = useUpdateMany();

  const handleClick = () => {
    if (selectedIds.length === 0) return;

    updateMany(
      "posts",
      { ids: selectedIds, data: { published: true } },
      {
        onSuccess: () => {
          notify(`${selectedIds.length} Beiträge veröffentlicht`, {
            type: "info",
          });
          refresh();
        },
        onError: () => {
          notify("Fehler beim Veröffentlichen", { type: "warning" });
        },
      }
    );
  };

  return (
    <Button label="Veröffentlichen" onClick={handleClick} disabled={isLoading}>
      <PublishIcon />
    </Button>
  );
};
