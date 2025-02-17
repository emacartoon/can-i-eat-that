import React, { useState, useEffect, useRef } from "react";
import { Container } from "../components/Grid";
// import CreatePostForm from "../components/CreatePostForm";
import SearchRecipesForm from "../components/SearchRecipesForm";
import RecipeList from "../components/RecipeList";
require("dotenv").config();

const Home = (props) => {
  console.log(props);
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState(0);
  const [result, setResult] = useState([]);

  const prevSearchIdRef = useRef();
  useEffect(() => {
    prevSearchIdRef.current = searchTerm;
  });

  const prevSearch = prevSearchIdRef.current;

  useEffect(() => {
    const APIKEY = process.env.EDAMAM_API_KEY;
    const APIID = process.env.EDAMAM_API_ID;

    var currentPagination = pagination;

    if (prevSearch !== searchTerm) {
      currentPagination = 0;
      setPagination(0);
    }

    // //Attempt to fix the CORS error when we don't use CORS
    // app.use((req, res, next) => {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   next();
    // });

    const getRecipes = async () => {
      // fetch
      const result = await fetch(
        `https://api.edamam.com/search?q=${searchTerm}&app_id=${APIID}&app_key=${APIKEY}&from=${currentPagination}&to=${
          currentPagination + 10
        }`
      );

      const data = await result.json();
      if (data.hits.length > 0) {
        setResult(data.hits);
      }
      console.log(data);
    };

    if (searchTerm && (searchTerm !== prevSearch || pagination > 0)) {
      getRecipes();
    }
  }, [searchTerm, pagination]);

  return (
    <Container fluid>
      <div>{props.user ? "Welcome back" : "You are not logged in"}</div>
      <div className="container">
        <div className="halfsies">
          <SearchRecipesForm setSearchTerm={setSearchTerm} />
        </div>
        <div className="halfsies">
          <RecipeList
            recipes={result}
            pagination={pagination}
            setPagination={setPagination}
          />
      {pagination}
      {searchTerm}
        </div>
      </div>
    </Container>
  );
};

export default Home;
