import { useNavigate } from "react-router";
import { HEADER_HEIGHT } from "../../utils/constants";

const style = {
  cursor: "pointer",
  width: "200px",
  border: "1px solid black",
  padding: "8px",
  borderRadius: "25px",
  backgroundColor: 'cerulean',
  maxHeight: '24px'
};

type BaseNavigationButtonProps = {label: string, color?: string}

type AnchorNavigationProps = BaseNavigationButtonProps & {
  type: "anchor";
  action: string
}

type LinkNavigationProps = BaseNavigationButtonProps & {
  type: "button"
  action: string | (() => void);
}
type IconNavigationProps = BaseNavigationButtonProps & {
  type: 'icon',
  action: string | (() => void);
  src: string
}

type Props = AnchorNavigationProps | LinkNavigationProps | IconNavigationProps

export const NavigationButton = (props: Props) => {
  const navigate = useNavigate();
  const {type, action} = props

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
    
    switch(props.type){
      case 'anchor':
        return <TextButton {...(props as AnchorNavigationProps)} onClick={onButtonClick} />
      case 'button':
        return <TextButton {...(props as LinkNavigationProps)} onClick={onButtonClick} />
      case 'icon':
        return <IconButton {...props as IconNavigationProps} onClick={onButtonClick} />
    }
};

function TextButton({label, onClick}: (LinkNavigationProps | AnchorNavigationProps) & {onClick: VoidFunction}){
  
  
  return (
    <div style={{...style, backgroundColor: 'wheat'}} onClick={onClick}>
      {label}
    </div>
  );
}

function IconButton({label, color, src, onClick}: IconNavigationProps & {onClick: VoidFunction}){
  return (
      <img src={src} style={{
        borderRadius: '50%',
        cursor: 'pointer',
        border: `4px solid ${color || 'white'}`,
        height: `${HEADER_HEIGHT - 16}px`,
        width: `${HEADER_HEIGHT - 16}px`
      }} onClick={onClick} aria-label={label}/>
  )
}