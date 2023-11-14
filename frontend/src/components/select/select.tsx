import reactLogo from "../../assets/react.svg";

import { useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { Select, Spin, Space } from "antd";
import type { DefaultOptionType, SelectProps } from "antd/es/select";
import { ILocationDisplayed } from "../../data/services/locations.service";
import "./select.scss";

export interface IDebounceSelectProps<ILocationDisplayed>
  extends Omit<
    SelectProps<ILocationDisplayed | ILocationDisplayed[]>,
    "options" | "children"
  > {
  fetchOptions: (search: string) => Promise<ILocationDisplayed[]>;
  debounceTimeout?: number;
}

function CustomSelect({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: IDebounceSelectProps<ILocationDisplayed>) {
  const [fetching, setFetching] = useState(false);

  const [options, setOptions] = useState<ILocationDisplayed[]>([]);

  const [selectedOptions, setSelectedOptions] = useState<DefaultOptionType[]>(
    []
  );

  const [showSelectedOption, setShowSelectedOption] = useState<boolean>(false);

  const fetchRef = useRef(0);

  const onClear = () => {
    if (showSelectedOption) setOptions(selectedOptions as ILocationDisplayed[]);
  };

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        if (newOptions.length > 0) setOptions(newOptions);

        setShowSelectedOption(false);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const onSelectionChange = (
    value: ILocationDisplayed,
    option: DefaultOptionType
  ): void => {
    setShowSelectedOption(true);
    const isOptionSelected = selectedOptions.filter(
      (selectedOption) => selectedOption.value == option.value
    );

    if (!(isOptionSelected?.length > 0))
      setSelectedOptions([...selectedOptions, option]);
  };

  return (
    <Select
      labelInValue
      filterOption={false}
      showSearch={true}
      onSearch={debounceFetcher}
      onClear={onClear}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      optionRender={(option) => (
        <Space>
          <img className="item-img" src={option.data.icon}></img>
          {option.data.label}
        </Space>
      )}
      onSelect={(value, option) => {
        onSelectionChange(value, option);
      }}
      {...props}
    ></Select>
  );
}

export default CustomSelect;
