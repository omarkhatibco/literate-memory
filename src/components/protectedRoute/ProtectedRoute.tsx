import { FC, PropsWithChildren } from "react";
import { useAuth } from "../../context";
import { Button, Flex } from "@mantine/core";

/*
This is one way of providing protected routes in the application.
aonther way with server sider routing where you could have a middleware
that would check for user authentication before allowing access to protected routes
*/
export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children;
  }

  return (
    <Flex direction={"column"} align={"flex-start"} gap={"xs"}>
      <h1>This page requires authentication</h1>
      <p>You are not authenticated. Please login to continue.</p>
      <Button onClick={() => setIsAuthenticated(true)}>Login</Button>
    </Flex>
  );
};
