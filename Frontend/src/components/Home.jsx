import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Section from "./Section";
import TweetCard from "./TweetCard";

function Home({ setCoursePlayList }) {
  const [courses, setCourses] = useState(null)
  const [articles, setArticles] = useState(null)
  const [tweets, setTweets] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://localhost:8080/api/course/")
      let data = await response.json()
      setCourses(data)

      response = await fetch("http://localhost:8080/api/articles/")
      data = await response.json()
      setArticles(data)

      response = await fetch("http://localhost:8080/api/tweets/")
      data = await response.json()
      setTweets(data)
    }

    fetchData()
  }, [])
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ textAlign: "start", marginBottom: 5, color: "white" }}>
            Hi Anirudh
          </h3>
          <small style={{ textAlign: "start", color: "grey" }}>
            It's nice day to learn something new
          </small>
        </div>
        <div>
          <img
            style={{ height: 40, width: 40, borderRadius: 20 }}
            src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
            alt=""
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#202022",
          padding: "5px 10px",
          borderRadius: 3,
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <small style={{ color: "white" }}>
          Join and help us building Airvoice.
        </small>
        <button
          style={{
            background: "#23AB5C",
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "none",
            padding: "5px 10px",
            borderRadius: 3,
            color: "white",
          }}
        >
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-white-icon.png"
            alt=""
            height={20}
            width={20}
          />
          <b>Community</b>
        </button>
      </div>
      <Section
        title="Course for you"
        description={"Explore what you can learn with Airvoice"}
      >
        {
          courses ? (
            courses.length ? (
              courses.map((course, index) => (
                <CourseCard
                  key={index}
                  title={course.name}
                  description={course.description}
                  image={course.image}
                  onClick={() => setCoursePlayList(course)}
                />
              ))
            ):<h4 style={{color: 'white'}}>No Course</h4>
          ):<h4 style={{color: 'white'}}>Loading...</h4>
        }
      </Section>
      <Section
        title="Article Reads"
        description={"Explore what you can learn with Airvoice"}
      >
        {
          articles ? (
            articles.length ? (
              articles.map((article, index) => (
                <CourseCard
                  key={index}
                  title={article.name}
                  description={article.description}
                  image={article.image}
                  onClick={null}
                />
              ))
            ):<h4 style={{color: 'white'}}>No Articles</h4>
          ):<h4 style={{color: 'white'}}>Loading...</h4>
        }
      </Section>
      <Section
        title="Tweet Shorts"
        description={"Explore what you can learn with Airvoice"}
      >
        {
          tweets ? (
            tweets.length ? (
              tweets.map((tweet, index) => (
                <TweetCard
                  key={index}
                  title={tweet.title}
                  name={tweet.name}
                  image={tweet.image}
                />
              ))
            ):<h4 style={{color: 'white'}}>No Tweets</h4>
          ):<h4 style={{color: 'white'}}>Loading...</h4>
        }
      </Section>
    </div>
  );
}

export default Home;
