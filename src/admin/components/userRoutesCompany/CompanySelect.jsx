import React from "react";

const CompanySelect = () => {
  return (
    <>
      <div className="_professional_company_conatiner">
        <div className="_professional_company_create">
          <h3>Create New Company</h3>
          <div className="_professional_company_create_inputs">
            <input type="text" name="name" value={createCompany.name} />
            placeholder="Enter Company name..."
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySelect;
