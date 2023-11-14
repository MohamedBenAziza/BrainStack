import { useState } from "react";
import "./App.scss";
import CustomSelect from "./components/select/select";
import {
  ILocationDisplayed,
  fetchLocationList,
} from "./data/services/locations.service";
import { Form } from "antd";

function App() {
  const [searchTerm, setSearchTerm] = useState<ILocationDisplayed>();

  return (
    <>
      <div className="app-container">
        <Form name="control-ref">
          <Form.Item
            name="START"
            className="form-select-item"
            rules={[{ required: true }]}
          >
            <CustomSelect
              className="custom-select"
              allowClear
              value={searchTerm}
              placeholder="START (Haltestelle, Adresse oder wichtiger Punkt)"
              fetchOptions={fetchLocationList}
              onChange={(newValue) => {
                setSearchTerm(newValue as ILocationDisplayed);
              }}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default App;
