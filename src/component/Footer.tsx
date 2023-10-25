import { Button } from "cosmian_ui";
import { useEffect, useState } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useBoundStore } from "../store/store";
import { findNextNavigationItem, findPreviousNavigationItem } from "../utils/navigationActions";
import { SubMenuItem } from "../utils/navigationConfig";
import "./layout.less";

export const FooterNavigation = (): JSX.Element => {
  const params = useParams();
  const navigate = useNavigate();
  const steps = useBoundStore((state) => state.steps);
  const [nextItem, setNextItem] = useState<undefined | SubMenuItem>();
  const [previousItem, setPreviousItem] = useState<undefined | SubMenuItem>();
  const paths = window.location.pathname.split("/");
  paths.shift();

  useEffect(() => {
    const previousItemFound = findPreviousNavigationItem(steps);
    setPreviousItem(previousItemFound);
    const nextItemFound = findNextNavigationItem(steps);
    setNextItem(nextItemFound);
  }, [params]);

  const goNext = (path: string): void => {
    navigate(path);
  };
  const goPrevious = (path: string): void => {
    navigate(path);
  };

  const previousOnly = previousItem != null && nextItem == null;
  const nextOnly = nextItem != null && previousItem == null;
  return (
    <div className={`footer ${previousOnly ? "left" : ""} ${nextOnly ? "right" : ""}`}>
      {previousItem && (
        <Button
          type="outline"
          onClick={() => goPrevious(previousItem.key)}
          icon={<IoArrowBackOutline size={18} style={{ marginBottom: -4 }} />}
        >
          Previous: {previousItem.label}
        </Button>
      )}
      {nextItem && (
        <Button
          type="dark"
          onClick={() => goNext(nextItem.key)}
          rightIcon={<IoArrowForwardOutline size={18} style={{ marginBottom: -4 }} />}
        >
          Next: {nextItem.label}
        </Button>
      )}
    </div>
  );
};
