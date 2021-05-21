import React from "react";

const ListFormErros = ({ error }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {error && Object.keys(error).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(error).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListFormErros;
