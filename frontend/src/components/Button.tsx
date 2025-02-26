
interface ButtonProps {
  text: string;
  onClick: () => void;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="button">
      {text}
    </button>
  );
}

export default Button;
