import { Loading } from "@/components/Loading";
import { useAdminsQuery } from "@/queries/admins";
import {
  useSupportQuery,
  useUpdateSupportCaseMutation,
} from "@/queries/support";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router";

export const PageSupportCase = () => {
  const { id } = useParams();
  const { isLoading, data } = useSupportQuery(id);
  const { data: admins, isLoading: isLoadingAdmins } = useAdminsQuery();
  const updateSupportCase = useUpdateSupportCaseMutation({
    onSuccess: () => {},
    onError: () => {},
  });

  const navigate = useNavigate();
  if (isLoading || isLoadingAdmins) return <Loading />;

  return (
    <>
      <Typography variant="h2">Support Case</Typography>
      {data.map((supportCase) => {
        const selectedAdmin = admins?.find(
          (admin) => admin._id === supportCase.assignedTo,
        );
        return (
          <React.Fragment key={supportCase._id}>
            <Typography variant="body1">
              Message: {supportCase.message}
            </Typography>
            <Typography component={"pre"} variant="body2">
              <code>{JSON.stringify(supportCase, undefined, 2)}</code>
            </Typography>
            <Typography>
              Assigned to:{" "}
              {supportCase.assignedTo !== "Unassigned"
                ? selectedAdmin?.name
                : "Unassigned"}
            </Typography>
            <Typography>Status: {supportCase.status}</Typography>
            <Autocomplete
              loading={isLoadingAdmins}
              value={selectedAdmin?.name}
              defaultValue={selectedAdmin?.name}
              options={admins?.map((admin) => admin.name) ?? []}
              onChange={(_, option) =>
                updateSupportCase.mutate({
                  id: supportCase._id,
                  data: {
                    assignedTo: admins?.find((admin) => admin.name === option)
                      ?._id,
                  },
                })
              }
              sx={{ my: 2 }}
              renderInput={(params) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <TextField {...params} label="Assign" />
                </Box>
              )}
            />
            <Autocomplete
              loading={isLoading}
              value={supportCase?.status}
              defaultValue={supportCase?.status}
              options={["pending", "responded", "resolved"]}
              onChange={(_, option) =>
                updateSupportCase.mutate({
                  id: supportCase._id,
                  data: { status: option },
                })
              }
              sx={{ my: 2 }}
              renderInput={(params) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <TextField {...params} label="Status" />
                </Box>
              )}
            />
            <Button
              sx={{ my: 3 }}
              onClick={() => navigate("/protected/support")}
            >
              Save Changes
            </Button>
          </React.Fragment>
        );
      })}
    </>
  );
};
