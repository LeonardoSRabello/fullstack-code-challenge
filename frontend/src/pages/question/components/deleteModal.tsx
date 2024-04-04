import React from "react";
import { observer } from "mobx-react";
import { Dialog, Box, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useStore } from "src/modules/storeProvider";

const DeleteModal: React.FC = observer(() => {
  const { questionAnswers } = useStore();
  return (
    <Dialog
      open={questionAnswers.deleteOpen}
      onClose={() => questionAnswers.dismissModal()}
      fullWidth
      maxWidth="sm"
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }} fontWeight="bold">
          Confirm Delete
        </Typography>
        <Typography sx={{ mb: 4 }}>
          Do you confirm to delete this answer?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Button onClick={() => questionAnswers.dismissModal()} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            color="error"
            loading={questionAnswers.actionLoading}
            disabled={questionAnswers.actionLoading}
            onClick={() => questionAnswers.deleteAnswer()}
          >
            Delete
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
});

export default DeleteModal;
