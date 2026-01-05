import { Loading } from "@/components/Loading";
import { useSupportQuery } from "@/queries/support";
import { Typography } from "@mui/material";
import { useParams } from "react-router";

export const PageSupportCase = () => {
  const { id } = useParams();
  const { isLoading, data } = useSupportQuery(id);

  if (isLoading) return <Loading />;

  return (
    <>
      <Typography variant="h2">Support Case</Typography>
      {data.map((supportCase) => {
        return (
          <>
            <Typography variant="body1">
              Message: {supportCase.message}
            </Typography>
            <Typography component={"pre"} variant="body2">
              <code>{JSON.stringify(supportCase, undefined, 2)}</code>
            </Typography>
          </>
        );
      })}
    </>
  );
};
