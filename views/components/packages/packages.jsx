import React from 'react';
import PackagesTable from './packagesTable';
import AddPackage from './addPackage';

export default function Packages() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-right">
          <AddPackage />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <PackagesTable />
        </div>
      </div>
    </div>
  );
}
