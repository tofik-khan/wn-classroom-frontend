import { Loading } from "@/components/Loading";
import { JAMMAT } from "@/constants/jammat";
import { useOneParentsQuery, useUpdateParentMutation } from "@/queries/parents";
import { User } from "@/types/user";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

export const PageEditParents = () => {
  const { id } = useParams();
  const { isLoading, data } = useOneParentsQuery(id);
  const { control, handleSubmit } = useForm<User>({
    defaultValues: data,
  });
  const updateParent = useUpdateParentMutation({
    onSuccess: () => navigate("/protected/parents"),
    onError: () => console.log("Error"),
  });
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    updateParent.mutate({
      data: {
        ...formData,
        jammat: formData?.jammat?.value,
      },
      id: id ?? "",
    });
  };

  if (isLoading) return <Loading />;

  const selectedJammat =
    JAMMAT.find((jammat) => jammat.value === data?.jammat) ?? JAMMAT[0];

  return (
    <>
      <Typography variant="h2">Edit Parent</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Controller
            render={({ field }) => (
              <TextField
                sx={{ width: "500px" }}
                required
                {...field}
                label="Name"
                defaultValue={data?.name ?? ""}
              />
            )}
            name="name"
            control={control}
            key={"name-input"}
            defaultValue={data?.name ?? ""}
          />
          <TextField
            sx={{ width: "500px" }}
            disabled
            value={data?.email ?? "No Email Provided"}
            label={"Email"}
            helperText={
              "Emails cannot be modified. Reach out to Developers if this needs to change"
            }
          />
          <Controller
            render={({ field }) => (
              <TextField
                sx={{ width: "500px" }}
                required
                {...field}
                label="Member Code"
                defaultValue={data?.membercode ?? ""}
              />
            )}
            name="membercode"
            control={control}
            key={"membercode-input"}
            defaultValue={data?.membercode ?? ""}
          />
          <Controller
            render={({ field }) => (
              <TextField
                sx={{ width: "500px" }}
                required
                {...field}
                label="Phone"
                defaultValue={data?.phone ?? ""}
              />
            )}
            name="phone"
            control={control}
            key={"phone-input"}
            defaultValue={data?.phone ?? ""}
          />
          <Controller
            render={({ field }) => (
              <Autocomplete
                sx={{ width: "500px" }}
                className="materialUIInput"
                options={JAMMAT}
                defaultValue={selectedJammat}
                isOptionEqualToValue={(opt, val) => opt.value === val.value}
                onChange={(_, option) => {
                  field.onChange(option);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Jammat / Chapter" />
                )}
              />
            )}
            name="jammat"
            control={control}
            key="jammat-input"
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Button
            onClick={() => {
              navigate("/protected/parents");
            }}
          >
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            Save changes
          </Button>
        </Box>
      </form>
    </>
  );
};
