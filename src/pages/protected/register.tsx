import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { User } from "@/types/user";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/hooks";
import { JAMMAT } from "@/constants/jammat";
import { MONTHS, YEARS } from "@/constants";
import { useUserMutation } from "@/queries/users";
import { useState } from "react";
import { useNavigate } from "react-router";

export const PageRegister = () => {
  const { control, handleSubmit, watch } = useForm<User>();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { currentUser } = useAppSelector((state) => state.user);
  const [btn, setBtn] = useState({ loading: false, error: "" });
  const navigate = useNavigate();
  const updateUser = useUserMutation({
    onSuccess: () => {
      setBtn({ loading: false, error: "" });
      navigate("/protected/dashboard");
    },
    onError: () => {
      console.log("ERROR!!");
      setBtn({
        loading: false,
        error:
          "There was an unknown error with your submission, please call the IT Team",
      });
    },
  });

  const role = watch("role");

  const handleUpdate = async (data: User) => {
    setBtn({ loading: true, error: "" });
    if (isAuthenticated) {
      const authToken = await getAccessTokenSilently();
      updateUser.mutate({
        authToken,
        data: { ...data, email: currentUser!.email },
      });
    }
  };

  return (
    <>
      <Typography variant="h2">Register</Typography>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Box sx={{ my: 2 }}>
          <Controller
            render={({ field }) => (
              <TextField
                required
                {...field}
                className="materialUIInput"
                label="Name"
              />
            )}
            name="name"
            control={control}
            key={"name-input"}
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <Controller
            render={({ field }) => (
              <FormControl sx={{ minWidth: 250 }}>
                <InputLabel htmlFor="role-selection">I am a ...</InputLabel>
                <Select
                  labelId="role-selection"
                  id="role-selection"
                  value={field.value}
                  label="I am a ..."
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <MenuItem disabled value=""></MenuItem>
                  <MenuItem value={"parent"}>Parent</MenuItem>
                  <MenuItem value={"student"}>Student</MenuItem>
                </Select>
              </FormControl>
            )}
            name="role"
            control={control}
            key={"role-input"}
            defaultValue="student"
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <Controller
            render={({ field }) => (
              <FormControl sx={{ minWidth: 250 }}>
                <InputLabel htmlFor="jammat-selection">Jammat</InputLabel>
                <Select
                  labelId="jammat-selection"
                  id="jammat-selection"
                  value={field.value}
                  label="Jammat"
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <MenuItem disabled value="">
                    Select One...
                  </MenuItem>
                  {JAMMAT.map((folder) => (
                    <MenuItem value={folder.value}>{folder.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            name="jammat"
            control={control}
            key={"jammat-input"}
            defaultValue=""
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <Controller
            render={({ field }) => (
              <FormControl sx={{ minWidth: 250 }}>
                <InputLabel htmlFor="gender-selection">Gender</InputLabel>
                <Select
                  labelId="gender-selection"
                  id="gender-selection"
                  value={field.value}
                  label="Gender"
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <MenuItem disabled value=""></MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
            )}
            name="gender"
            control={control}
            key={"gender-input"}
            defaultValue=""
          />
        </Box>
        {role === "parent" ? (
          <ParentQuestionaire control={control} />
        ) : role === "student" ? (
          <StudentQuestionaire control={control} />
        ) : (
          <></>
        )}

        <Button type="submit" loading={btn.loading}>
          Save changes
        </Button>
      </form>
    </>
  );
};

const ParentQuestionaire = ({ control }) => {
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Controller
          render={({ field }) => (
            <TextField
              required
              {...field}
              className="materialUIInput"
              label="Member Code"
            />
          )}
          name="membercode"
          control={control}
          key={"membercode-input"}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Controller
          render={({ field }) => (
            <TextField
              required
              {...field}
              className="materialUIInput"
              label="Phone Number"
            />
          )}
          name="phone"
          control={control}
          key={"phone-input"}
        />
      </Box>
    </>
  );
};

const StudentQuestionaire = ({ control }) => {
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Controller
          render={({ field }) => (
            <TextField
              required
              {...field}
              className="materialUIInput"
              label="Member Code"
            />
          )}
          name="membercode"
          control={control}
          key={"membercode-input"}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              className="materialUIInput"
              label="Parent Email"
            />
          )}
          name="parentEmail"
          control={control}
          key={"parentEmail-input"}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Controller
          render={({ field }) => (
            <TextField
              required
              {...field}
              className="materialUIInput"
              label="Waqf-e-Nau ID"
            />
          )}
          name="waqfenauId"
          control={control}
          key={"waqfenauId-input"}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography>Class Selection (TBD)</Typography>
      </Box>
      <Box sx={{ my: 2, gap: 2, display: "flex" }}>
        <Controller
          render={({ field }) => (
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel htmlFor="dob-month-selection">
                Month of Birth
              </InputLabel>
              <Select
                labelId="dob-month-selection"
                id="dob-month-selection"
                value={field.value}
                label="Month of Birth"
                onChange={(event) => field.onChange(event.target.value)}
              >
                {MONTHS.map((object) => (
                  <MenuItem value={object.value}>{object.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          name="dob.month"
          control={control}
          key={"dob-month-input"}
          defaultValue=""
        />
        <Controller
          render={({ field }) => (
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel htmlFor="dob-year-selection">
                Year of Birth
              </InputLabel>
              <Select
                labelId="dob-year-selection"
                id="dob-year-selection"
                value={field.value}
                label="Year of Birth"
                onChange={(event) => field.onChange(event.target.value)}
              >
                {YEARS.map((object) => (
                  <MenuItem value={object}>{object}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          name="dob.year"
          control={control}
          key={"dob-year-input"}
          defaultValue=""
        />
      </Box>
    </>
  );
};
