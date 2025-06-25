import { GridRowOrderChangeParams } from "@mui/x-data-grid-pro";

export const getRowSortOrder = (
  params: GridRowOrderChangeParams,
  rows: any
) => {
  // Reorder the rows based on the new order
  const reordered = [...rows];
  const movedRow = reordered.splice(params.oldIndex, 1)[0];
  reordered.splice(params.targetIndex, 0, movedRow);

  // Assign new sortOrder based on array index
  return reordered.map((row, index) => ({
    ...row,
    sortOrder: index,
  }));
};
