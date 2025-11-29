import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { content } from "../content";

export default function MiniForm({
  title,
  placeholder,
  handleChange,
  isSubmitDisabled = false,
  handleSubmit,
  value,
}) {
  return (
    <div className="w-2/3 text-center border p-8 rounded-lg">
      <Heading size={"h4"}>{title}</Heading>
      <Input
        value={value}
        placeholder={placeholder}
        handleChange={handleChange}
      />
      <Button
        text={`Join ${content.game}`}
        styles="w-full"
        disabled={isSubmitDisabled}
        onClick={handleSubmit}
      />
    </div>
  );
}
