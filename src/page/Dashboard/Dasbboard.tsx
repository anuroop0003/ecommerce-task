import AddCircleIcon from "@mui/icons-material/AddCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import PeopleIcon from "@mui/icons-material/People";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import ProductTable from "./ProductTable";
import StatCard from "./StatCard";

interface Stat {
  id: number;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "primary" | "warning" | "success" | "info";
}

const stats: Stat[] = [
  {
    id: 1,
    title: "Total Sales",
    value: "$50,000",
    icon: <AttachMoneyIcon />,
    color: "primary",
  },
  {
    id: 2,
    title: "Orders Pending",
    value: 75,
    icon: <AddCircleIcon />,
    color: "warning",
  },
  {
    id: 3,
    title: "Products in Stock",
    value: 320,
    icon: <PeopleIcon />,
    color: "success",
  },
  {
    id: 4,
    title: "Customer Satisfaction",
    value: "92%",
    icon: <GroupIcon />,
    color: "info",
  },
];

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ marginY: 10 }}>
      <Grid container spacing={5} marginBottom={5}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.id}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
      <ProductTable />
    </Container>
  );
};

export default Dashboard;
