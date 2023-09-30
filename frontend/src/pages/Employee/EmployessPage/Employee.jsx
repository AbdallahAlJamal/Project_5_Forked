import axios from 'axios';
import React, { Suspense, useState } from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';
import "./Employee.css"
const Employees = () => {
  const { result } = useLoaderData();
  return (
    <>
      <h2>Employees</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={result} errorElement={<p>Error loading Employee ...</p>}>
          {result => (
            <div>
              {result?.map(Employee => (
                <div className="productContainer" key={Employee.id}>
                  <h2>{Employee.firstname}</h2>
                  <p>{Employee.lastname}</p>
                  <Link to={`/employees/${Employee.id}`}>View Details</Link>
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default Employees;