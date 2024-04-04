import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Dialog, Box, TextField, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useStore } from "src/modules/storeProvider";
import { IQuestionFormInput } from "src/interfaces/questions";
import * as Validator from "src/utils/validations";

const validationSchema = Yup.object().shape({
  title: Validator.titleSchema(),
  content: Validator.contentSchema()
});

const CreateModal: React.FC = observer(() => {
  const { questions } = useStore();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IQuestionFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: { title: "", content: "" }
  });

  const onSubmit = (data: IQuestionFormInput) => {
    if (questions.selectedQuestion) {
      questions.updateQuestion(data);
    } else {
      questions.createQuestion(data);
    }
  };

  useEffect(() => {
    reset({
      title: questions.selectedQuestion?.title || "",
      content: questions.selectedQuestion?.content || ""
    });
  }, [reset, questions.createOpen]);

  return (
    <Dialog
      open={questions.createOpen}
      onClose={() => questions.dismissModal()}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }} fontWeight="bold">{`${
            questions.selectedQuestion ? "Edit" : "Create"
          } Question`}</Typography>
          <Box sx={{ mb: 2 }}>
            <Controller
              name="content"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label="Content"
                  fullWidth
                  id="content"
                  value={value}
                  onChange={onChange}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
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
            <Button onClick={() => questions.dismissModal()} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={questions.actionLoading}
              disabled={questions.actionLoading}
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
