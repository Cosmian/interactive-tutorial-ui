import { Button } from "cosmian_ui";
import { useEffect, useState } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useBoundStore } from "../store/store";
import { findNavigationItems } from "../utils/navigationActions";
import { NavigationItem } from "../utils/navigationConfig";
import "./layout.less";

export const FooterNavigation = (): JSX.Element => {
  const params = useParams();
  const navigate = useNavigate();
  const { steps } = useBoundStore((state) => state);
  const [nextItem, setNextItem] = useState<NavigationItem | undefined>();
  const [previousItem, setPreviousItem] = useState<NavigationItem | undefined>();
  const paths = window.location.pathname.split("/");
  paths.shift();

  useEffect(() => {
    const itemsFound = findNavigationItems(steps);
    if (itemsFound) {
      setPreviousItem(itemsFound.previous);
      setNextItem(itemsFound.next);
    }
  }, [params]);

  const previousOnly = previousItem != null && nextItem == null;
  const nextOnly = nextItem != null && previousItem == null;
  return (
    <div className={`footer ${previousOnly ? "left" : ""} ${nextOnly ? "right" : ""}`}>
      {previousItem && (
        <Button
          type="outline"
          onClick={() => navigate(previousItem.url)}
          icon={<IoArrowBackOutline size={18} style={{ marginBottom: -4 }} />}
        >
          Previous: {previousItem.label}
        </Button>
      )}
      {nextItem && (
        <Button
          type="dark"
          onClick={() => navigate(nextItem.url)}
          rightIcon={<IoArrowForwardOutline size={18} style={{ marginBottom: -4 }} />}
        >
          Next: {nextItem.label}
        </Button>
      )}
    </div>
  );
};
