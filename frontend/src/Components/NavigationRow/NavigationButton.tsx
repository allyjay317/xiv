import { useNavigate } from "react-router";
import { useSiteContext } from "../SiteContext";

const style = {
  cursor: "pointer",
  width: "200px",
  border: "1px solid black",
  padding: "8px",
  borderRadius: "25px",
  backgroundColor: 'cerulean'
};

type Props = {
  label: string;
} & (
  | {
      type: "anchor";
      action: string;
    }
  | {
      type: "button";
      action: string | (() => void);
    }
);

export const NavigationButton = ({ label, type, action }: Props) => {
  const navigate = useNavigate();

    const {userInfo} = useSiteContext()
    

  const onButtonClick = () => {
    if (type === "anchor") {
      window.open(action, '_self');
      return;
    } else if (typeof action === "string") {
      navigate(action);
      return;
    }
    action();
  };
  return (
    <div style={{...style, backgroundColor: 'wheat'}} onClick={() => onButtonClick()}>
      {label}
    </div>
  );
};
