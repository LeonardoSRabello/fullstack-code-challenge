import React, { useEffect } from "react";
import { observer } from "mobx-react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Typography,
  CircularProgress,
  Button
} from "@mui/material";

import Question from "./components/question";
import CreateModal from "./components/createModal";
import DeleteModal from "./components/deleteModal";
import { useStore } from "src/modules/storeProvider";
import { QUESTIONS_HEADERS } from "src/utils/constants";

const Questions: React.FC = observer(() => {
  const { questions } = useStore();

  useEffect(() => {
    questions.getQuestions();
  }, []);

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => questions.openCreateModal()}
        >
          New Question
        </Button>
      </Box>
      <TableContainer sx={{ minHeight: 150 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {QUESTIONS_HEADERS.map(header => (
                <TableCell key={header.key} align={header.align}>
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!questions.error && !questions.loading && (
              <>
                {questions.questions.map(question => (
                  <Question key={question._id} question={question} />
                ))}
              </>
            )}
          </TableBody>
        </Table>
        {questions.loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {!questions.loading && !!questions.error && (
          <Typography
            fontSize={20}
            color="error"
            textAlign="center"
            sx={{ p: 3 }}
          >
            {questions.error}
          </Typography>
        )}
        {!questions.loading && !questions.error && !questions.questions.length && (
          <Typography fontSize={20} textAlign="center" sx={{ p: 3 }}>
            No items to show
          </Typography>
        )}
      </TableContainer>
      <Box sx={{ py: 2, display: "flex", alignItems: "center" }}>
        <Typography
          sx={{ flexGrow: 1 }}
        >{`Total count: ${questions.totalCount}`}</Typography>
        <Pagination
          count={questions.totalPageCount}
          page={questions.page}
          color="primary"
          onChange={(_, value) => {
            questions.changePage(value);
          }}
        />
      </Box>
      <CreateModal />
      <DeleteModal />
    </Box>
  );
});

export default Questions;
