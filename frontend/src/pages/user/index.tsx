import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Box, CircularProgress, Typography } from "@mui/material";

import { useStore } from "src/modules/storeProvider";
import { LoadMore } from "src/components/loadMore";

const User: React.FC = observer(() => {
  const { id } = useParams();
  const { userAnswers } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      userAnswers.getUser(id);
    }
  }, [id]);

  if (userAnswers.loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (userAnswers.error) {
    return (
      <Typography
        fontSize={20}
        fontWeight="bold"
        textAlign="center"
        color="error"
        sx={{ p: 2 }}
      >
        {userAnswers.error}
      </Typography>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          mb: 2
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {`${userAnswers.first_name} - ${userAnswers.last_name}`}
        </Typography>
        <Typography>{`@${userAnswers.email}`}</Typography>
      </Box>
      <hr />
      <Typography
        variant="h5"
        sx={{ py: 2, mb: 2 }}
      >{`${userAnswers.totalCount} Answers`}</Typography>
      {userAnswers.answers.map((answer, index) => (
        <Box
          key={`${answer._id}-${index}`}
          sx={{
            borderBottom: "1px solid",
            p: 2,
            mb: 4
          }}
        >
          <Typography fontSize={20} sx={{ mb: 1 }}>
            {answer.content}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography
              fontSize={16}
              fontStyle="italic"
              sx={{
                px: 2,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" }
              }}
              onClick={() => navigate(`/questions/${answer.questionId._id}`)}
            >{`- ${answer.questionId.title} -`}</Typography>
          </Box>
        </Box>
      ))}
      {userAnswers.totalPageCount >= userAnswers.page && (
        <LoadMore
          isLoading={userAnswers.answerLoading}
          onLoad={() => userAnswers.getAnswersForUser()}
        />
      )}
    </Box>
  );
});

export default User;
