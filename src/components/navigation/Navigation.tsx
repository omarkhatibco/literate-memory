import { Navbar, NavLink } from "@mantine/core";
import { IconBook2, IconBrandAmongus, IconHome2 } from "@tabler/icons";
import { Link, RouteObject } from "react-router-dom";
import routes from "../../routes/routes";
import { useLocale } from "../../context";
import { Locale } from "../../config";

interface NavigationProps {
  opened: boolean;
}

type LinkDisplayOptions = {
  label: string;
  icon: JSX.Element;
};

type NavigationLink = RouteObject & LinkDisplayOptions;

const Navigation = ({ opened }: NavigationProps): JSX.Element => {
  const { languages, locale, setLocale } = useLocale();
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Link to="/">
        <NavLink label={"Home"} icon={<IconHome2 size={16} stroke={1.5} />} />
      </Link>
      <Link to="/invoices">
        <NavLink
          label={"Invoices"}
          icon={<IconBook2 size={16} stroke={1.5} />}
        />
      </Link>
      <Link to="/top-secret">
        <NavLink
          label={"Top Secret"}
          icon={<IconBrandAmongus size={16} stroke={1.5} />}
        />
      </Link>
      <Navbar.Section mt={"xl"}>
        {Object.entries(languages).map(([key, value]) => (
          <NavLink
            active={key === locale}
            key={key}
            label={value}
            onClick={() => setLocale(key as Locale)}
            icon={<IconBook2 size={16} stroke={1.5} />}
          />
        ))}
      </Navbar.Section>
    </Navbar>
  );
};

export { Navigation };
