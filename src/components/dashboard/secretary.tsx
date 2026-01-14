import { useAppSelector } from "@/hooks";
import { useStudentsInJammatQuery } from "@/queries/secretaries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Loading } from "../Loading";

const StudentTable = () => {
  const { isLoading, data } = useStudentsInJammatQuery();

  if (!data || isLoading) return <Loading height="200px" />;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Waqf-e-Nau ID</TableCell>
            <TableCell>Jammat</TableCell>
            <TableCell>Classrooms</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.waqfenauId}</TableCell>
                <TableCell>{student.jammat}</TableCell>
                <TableCell>
                  {student.classrooms?.length ?? 0 > 0 ? (
                    student.classrooms?.map((classroom) => (
                      <Typography>{classroom.label}</Typography>
                    ))
                  ) : (
                    <Typography>
                      Registration Complete
                      <br />
                      Pending Enrollment
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10}>
                No Students Registered from this Jammat
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export const SecretaryDashboard = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <>
      <Typography variant="h2">
        Assalamo Alaikum {currentUser.name.split(" ")[0] ?? ""} - Local
        Secretary {currentUser.jammat}
      </Typography>
      <StudentTable />
    </>
  );
};
