import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../authentication/Login";
import ContactSupport from "../authentication/ContactSupport";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../admin/components/Dashboard";
import Dashboard from "../pages/dashboard/index";
import CompanySelect from "../admin/components/userRoutesCompany/CompanySelect";

const RoutersDom = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/contactSupoort" element={<ContactSupport />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            index
            path="/dashboard/dashboard"
            element={<AdminDashboard />}
          />
          <Route path="/dashboard/users" element={<CompanySelect />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutersDom;
