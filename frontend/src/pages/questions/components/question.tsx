import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { TableRow, TableCell, Box, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { format } from "date-fns";

import { useStore } from "src/modules/storeProvider";
import { IQuestion } from "src/interfaces/questions";
import { QUESTIONS_HEADERS } from "src/utils/constants";

interface QuestionProps {
  question: IQuestion;
}

const Question: React.FC<QuestionProps> = observer(({ question }) => {
  const navigate = useNavigate();
  const { questions } = useStore();

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    questions.openUpdateModal(question._id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    questions.openDeleteModal(question._id);
  };

  return (
    <TableRow
      hover
      sx={{
        "&:last-child td, &:last-child ht": { border: 0 }
      }}
      onClick={() => navigate(`/questions/${question._id}`)}
    >
      {QUESTIONS_HEADERS.map(header => (
        <TableCell
          key={header.key}
          align={header.align}
          width={header.width}
          sx={
            header.type === "content"
              ? {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }
              : {}
          }
        >
          {header.key === "action" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <IconButton color="primary" sx={{ mr: 2 }} onClick={handleEdit}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={handleDelete}>
                <Delete />
              </IconButton>
            </Box>
          ) : header.type === "date" ? (
            format(question[header.key], "MM/dd/yyyy hh:mm")
          ) : (
            question[header.key].toString()
          )}
        </TableCell>
      ))}
    </TableRow>
  );
});

export default Question;
