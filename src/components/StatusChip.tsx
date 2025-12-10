import React from "react";
import { Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

type Props = { value?: boolean | string | number };

export const StatusChip = ({ value }: Props) => {
  const isActive = value === true || value === "published" || value === 1;
  return (
    <Chip
      label={isActive ? "Aktiv" : "Inaktiv"}
      size="small"
      icon={
        isActive ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />
      }
      sx={{
        backgroundColor: isActive ? "rgba(46,125,50,0.12)" : "rgba(0,0,0,0.06)",
        color: isActive ? "#2e7d32" : "#616161",
        border: "1px solid rgba(0,0,0,0.06)",
        fontWeight: 700,
        height: 28,
      }}
    />
  );
};

export default StatusChip;
