import { Avatar, Box, Typography } from "@mui/material";
import WNLogomarkBlue from "@/assets/wn-logomark-blue.png";
import { useAppSelector } from "@/hooks";

export const AdminBar = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <>
      <Box
        sx={(theme) => ({
          position: "fixed",
          top: "0px",
          left: "202px",
          backgroundColor: "white",
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: "4px",
          borderLeft: 0,
          borderTop: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: `calc(100% - 210px)`,
          p: 1,
          zIndex: 1000,
        })}
      >
        <img
          src={WNLogomarkBlue}
          width={300}
          style={{ objectFit: "contain" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "black",
            mx: 3,
            py: 2,
          }}
        >
          <Avatar />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography m={0} variant="subtitle2">{`${
              currentUser.name ?? ""
            }`}</Typography>
            <Typography color="text.secondary" variant="subtitle2">
              {currentUser?.email}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: 70 }}></Box>
    </>
  );
};
