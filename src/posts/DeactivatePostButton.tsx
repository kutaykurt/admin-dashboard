import { useUpdate, useNotify, useRefresh, Button } from "react-admin";
import BlockIcon from "@mui/icons-material/Block";

type DeactivatePostButtonProps = {
  record?: {
    id: number;
    [key: string]: any;
  };
};

export const DeactivatePostButton = ({ record }: DeactivatePostButtonProps) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [update, { isLoading }] = useUpdate();

  if (!record) return null; // falls der Button ohne gültigen Datensatz geladen wird

  const handleClick = () => {
    update(
      "posts",
      { id: record.id, data: { active: false } },
      {
        onSuccess: () => {
          notify("Beitrag wurde deaktiviert", { type: "info" });
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
