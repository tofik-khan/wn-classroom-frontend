import { Loading } from "@/components/Loading";
import { useSessionInYearQuery } from "@/queries/reports";
import { Button, Paper, Typography } from "@mui/material";
import { months } from "@/utils/datetime";
import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

export const PageReports = () => {
  const year = new Date().getFullYear();
  const { isLoading, data } = useSessionInYearQuery(year);

  const navigate = useNavigate();

  if (isLoading || !data) return <Loading />;

  return (
    <>
      <Typography variant="h2">Reports - {year}</Typography>
      {months.map((month) => {
        return (
          <React.Fragment key={month}>
            <Paper sx={{ minHeight: "100px", my: 2, p: 4 }}>
              <Typography variant="subtitle1">{month.toUpperCase()}</Typography>
              {data[month].length < 1 ? (
                <Typography>No Sessions</Typography>
              ) : (
                data[month].map((session) => {
                  return (
                    <React.Fragment>
                      <Button
                        onClick={() =>
                          navigate(`/protected/reports/${session}`)
                        }
                        sx={{ my: 1 }}
                      >
                        {dayjs(session).format("MM/DD/YYYY")}
                      </Button>
                    </React.Fragment>
                  );
                })
              )}
            </Paper>
          </React.Fragment>
        );
      })}
    </>
  );
};
