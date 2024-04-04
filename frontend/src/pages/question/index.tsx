import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  IconButton
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { format } from "date-fns";

import { useStore } from "src/modules/storeProvider";
import { LoadMore } from "src/components/loadMore";
import CreateModal from "./components/createModal";
import DeleteModal from "./components/deleteModal";

const Question: React.FC = observer(() => {
  const { id } = useParams();
  const { questionAnswers } = useStore();

  useEffect(() => {
    if (id) {
      questionAnswers.getQuestion(id);
    }
  }, [id]);

  if (questionAnswers.loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (questionAnswers.error) {
    return (
      <Typography
        fontSize={20}
        fontWeight="bold"
        textAlign="center"
        color="error"
        sx={{ p: 2 }}
      >
        {questionAnswers.error}
      </Typography>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        {questionAnswers.title}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        {`Created ${format(questionAnswers.createdAt, "MMM dd, yyyy hh:mm")}`}
      </Typography>
      <hr />
      <Typography fontSize={22} sx={{ mb: 5 }}>
        {questionAnswers.content}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Typography variant="h5">{`${questionAnswers.totalCount} Answers`}</Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => questionAnswers.openCreateModal()}
        >
          Post Answer
        </Button>
      </Box>
      {questionAnswers.answers.map((answer, index) => (
        <Box
          key={`${answer._id}-${index}`}
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid",
            p: 2,
            mb: 4
          }}
        >
          <Typography
            fontSize={26}
            fontWeight="light"
            sx={{ width: 70, flexShrink: 0 }}
          >
            {index + 1}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontSize={20} sx={{ mb: 2 }}>
              {answer.content}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Typography
                fontStyle="italic"
                sx={{ mr: 2 }}
              >{`- ${answer.userId.first_name} ${answer.userId.last_name} -`}</Typography>
              <IconButton
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => questionAnswers.openUpdateModal(answer._id)}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => questionAnswers.openDeleteModal(answer._id)}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}
      {questionAnswers.totalPageCount >= questionAnswers.page && (
        <LoadMore
          isLoading={questionAnswers.answerLoading}
          onLoad={() => questionAnswers.getAnswersForQuestion()}
        />
      )}
      <CreateModal />
      <DeleteModal />
    </Box>
  );
});

export default Question;
