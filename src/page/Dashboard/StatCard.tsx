import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
};

export default function StatCard({ title, value, icon, color }: Props) {
  return (
    <Card elevation={4}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: `${color}.main` }}>{icon}</Avatar>}
        title={title}
        titleTypographyProps={{ variant: "subtitle1", color: "textSecondary" }}
      />
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
