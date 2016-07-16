import React from 'react';
import SearchPackage from '../../containers/landing/searchPackage';

export default function Landing() {
  return (
    <div id="jumbotron-landing">
      <div id="landing-title" className="center" >
        Tracking packages at the speed of dank.
      </div>
      <div id="landing-form" className="center col-md-4 col-md-offset-4">
        <SearchPackage />
      </div>
    </div>
  );
}
