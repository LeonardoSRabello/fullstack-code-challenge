import React, { useEffect } from "react";
import { observer } from "mobx-react";
import {
  Dialog,
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useStore } from "src/modules/storeProvider";
import { IAnswerFormInput } from "src/interfaces/answers";
import * as Validator from "src/utils/validations";

const validationSchema = Yup.object().shape({
  userId: Validator.idSchema(),
  content: Validator.contentSchema()
});

const CreateModal: React.FC = observer(() => {
  const { questionAnswers } = useStore();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IAnswerFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: { userId: "", content: "" }
  });

  const onSubmit = (data: IAnswerFormInput) => {
    if (questionAnswers.selectedAnswer) {
      questionAnswers.updateAnswer(data);
    } else {
      questionAnswers.createAnswer(data);
    }
  };

  useEffect(() => {
    reset({
      userId: questionAnswers.selectedAnswer?.userId._id || "",
      content: questionAnswers.selectedAnswer?.content || ""
    });
  }, [reset, questionAnswers.createOpen]);

  return (
    <Dialog
      open={questionAnswers.createOpen}
      onClose={() => questionAnswers.dismissModal()}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }} fontWeight="bold">{`${
            questionAnswers.selectedAnswer ? "Edit" : "Post"
          } Answer`}</Typography>
          <Box sx={{ mb: 2 }}>
            <Controller
              name="userId"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <Autocomplete
                    disablePortal
                    value={questionAnswers.users.find(
                      user => user._id === value
                    )}
                    options={questionAnswers.users}
                    disabled={!!questionAnswers.selectedAnswer}
                    getOptionLabel={option =>
                      `${option.first_name} ${option.last_name}`
                    }
                    renderInput={params => (
                      <TextField {...params} label="User" />
                    )}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Typography sx={{ mr: 1 }}>
                          {`${option.first_name} ${option.last_name}`}
                        </Typography>
                        <Typography
                          fontSize="12"
                          color="gray"
                          fontStyle="italic"
                        >
                          {option.email}
                        </Typography>
                      </Box>
                    )}
                    onChange={(_, newValue) => onChange(newValue?._id || "")}
                  />
                  {!!errors.userId && (
                    <Typography
                      fontSize={12}
                      color="error"
                      sx={{ px: 2, py: 1 }}
                    >
                      {errors.userId?.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Controller
              name="content"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  id="content"
                  label="Content"
                  value={value}
                  onChange={onChange}
                  multiline
                  rows={4}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <Button
              onClick={() => questionAnswers.dismissModal()}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={questionAnswers.actionLoading}
              disabled={questionAnswers.actionLoading}
            >
              Post
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
});

export default CreateModal;
