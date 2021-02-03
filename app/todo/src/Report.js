/* eslint react/prop-types: 0 */
/* eslint react/jsx-key: 0 */

import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const Report = props => {
  return (
    <Container fluid className="d-flex justify-content-around align-content-start flex-wrap w-100 mt-4">
      { props.report.map((report) =>
        <Jumbotron key={report.user} className="bg-dark-t text-light w-30 m-2 flex-grow-1">
          <h4>{report.user}   {report.DATE.substring(0, 10)}</h4>
          <hr />
          <h5>Upcoming</h5>
          <hr />
          <ReportList tasks={JSON.parse(report.tasks).notStarted} />
          <h5>In progress</h5>
          <hr />
          <ReportList tasks={JSON.parse(report.tasks).inProgress} />
          <h5>Complete</h5>
          <hr />
          <ReportList tasks={JSON.parse(report.tasks).completed} />
        </Jumbotron>
      )}
    </Container>
  )
}

const ReportList = props => {
  return (
    <>
      { props.tasks.map((item) => <ReportTask key={item.task} {...item} />)}
    </>
  )
}

const ReportTask = props => {
  return (
    <div className="d-flex">
      <p className={"pr-1 "}>{props.task}</p>
    </div>
  )
}

export default Report;