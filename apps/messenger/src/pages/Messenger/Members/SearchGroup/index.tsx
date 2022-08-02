import { ChangeEvent, FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "components";
import "./style.scss";

const SearchGroup: FC = () => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue);
  };

  return (
    <div className="search-group">
      <Input
        onChange={handleChange}
        value={value}
        size="large"
        placeholder="People, groups and messages"
        prefix={<FaSearch />}
      />
    </div>
  );
};

export default SearchGroup;
