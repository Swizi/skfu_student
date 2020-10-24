import React, { useState, useEffect } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import settingsAdjust from "@iconify/icons-carbon/settings-adjust";

import "./Search.css";

const Search: React.FC = () => {
  return (
    <div className="search_container">
      <form method="GET" className="search">
        <div className="input_text">
          <span className="icon search_icon">
            <i className="fa fa-search"></i>
          </span>
          <input
            type="search"
            className="search_input"
            placeholder="Специальность..."
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
