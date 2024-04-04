import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "src/components/layout";
import Dashboard from "src/pages/dashboard";
import Users from "src/pages/users";
import User from "src/pages/user";
import Questions from "src/pages/questions";
import Question from "src/pages/question";

const Router: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions/:id" element={<Question />} />
      </Routes>
    </Layout>
  );
};

export default Router;
