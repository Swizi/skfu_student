import React, { useState, useEffect } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import settingsAdjust from "@iconify/icons-carbon/settings-adjust";

import "./Search.css";

const Search: React.FC<{ setLoading: any }> = ({
  children,
  setLoading
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    $.post(
      `/ajax/search.php`,
      {
        target: "searching",
        title: searchValue
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          // setVacancies(response.vacancies);
        }
        setLoading(false);
      }
    );
  }

  const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  }
  return (
    <div className="search_container">
      <form method="GET" className="search" onSubmit={(e) => search}>
        <div className="input_text">
          <span className="icon search_icon">
            <i className="fa fa-search"></i>
          </span>
          <input
            type="search"
            className="search_input"
            placeholder="Специальность..."
            onChange={(e) => changeValue(e)}
          />
          {/* <Icon
            className="settings_adjust"
            icon={settingsAdjust}
            style={{ fontSize: "28px" }}
          /> */}
        </div>
        <button type="submit" className="search__button">
          Искать
        </button>
      </form>
    </div>
  );
};

export default Search;
