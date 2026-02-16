
import React, { useEffect, useState } from 'react'
import { useGetAllTashkilsQuery } from '../../redux/api/tashkilApi';
import { Link, useSearchParams } from "react-router-dom"
import Tashkil from '../../components/Tashkil';
import Hero from '../../components/Hero';

const Home = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || ""
  const page = Number(searchParams.get("page")) || 1

  const { data, isLoading } = useGetAllTashkilsQuery({
    keyword,
    page,
    limit: 5
  });

  const tashkils = data?.tashkils || [];

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <h4>Loading tashkils...</h4>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <div className="container p-5">
        <h2 className="fw-bold mb-4">
          All Tashkils
          {keyword && (
            <span className="text-muted fs-6 ms-2">
              (Search: "{keyword}")
            </span>
          )}
        </h2>
        <div className="row g-4">
          {tashkils.length > 0 ? (
            tashkils.map((tashkil) => (
              <div className="col-md-3" key={tashkil._id}>
                <Tashkil tashkil={tashkil} />
              </div>
            ))
          ) : (
            <div className="text-center mt-5">
              <h5>No tashkils found</h5>
            </div>
          )}
        </div>

        {/* Pagination */}
        {
          data?.totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5 gap-2">
              {
                Array.from({ length: data.totalPages }, (_, i) => (
                  <Link
                    key={i}
                    to={`/?keyword=${keyword}&page=${i + 1}`}
                    className={
                      `btn btn-sm ${page === i + 1
                        ? "btn-success"
                        : "btn-outline-success"}  `
                    }
                  >{i + 1}</Link>
                ))
              }
            </div>
          )
        }
      </div>
    </>
  )
}

export default Home