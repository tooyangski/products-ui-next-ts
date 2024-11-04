"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      onClick={() => router.back()}
      sx={{ marginBottom: 2, borderColor: "#6200ea", color: "#6200ea" }}
    >
      Back
    </Button>
  );
};

export default BackButton;
