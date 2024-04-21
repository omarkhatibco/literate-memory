import { Button, Center, Container } from "@mantine/core";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";
import { FC } from "react";

export const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={clsx(styles["not-found"])}>
      <Container mt={"md"} className={styles["welcome-message"]}>
        <img
          className={styles.logo}
          width="500"
          src="/sevdesk-light-01.svg"
          alt=""
        />
        <h1>404 Not Found</h1>
        <p>It seems that the page you are looking for does not exist.</p>
        <Button
          mt={"md"}
          onClick={() => {
            navigate("/");
          }}
        >
          Home Page
        </Button>
      </Container>
    </div>
  );
};
