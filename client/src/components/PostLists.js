import { getPosts } from "../services/posts"
import { Link } from "react-router-dom"
import { useAsync } from "../hooks/useAsync";
import { FaComment } from "react-icons/fa"; // import the comment icon
import { useState, useEffect } from "react";


export function PostList() {
    const { loading, error, value: posts } = useAsync(getPosts)

    if (loading) return <h1>Loading</h1>
    if (error) return <h1 className="error-msg">{error}</h1>


    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {posts.map(post => {
          console.log(post);
          return (
            <div 
              key={post.id}
              style={{ width: "40%", margin: "1rem", border: "1px solid black", borderRadius: "1rem" }}
              className="g-3"
            >
              <Link to={`/posts/${post.id}`} style={{textDecoration:"none"}}>
                <img style={{ width: "100%", height:"60%", borderRadius: "1rem", objectFit:"cover" }} 
                  src={post.image}
                  alt="post"
                />
              </Link>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 3rem"}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p 
                    style={{ 
                        textAlign: "center", 
                        fontWeight: "bold", 
                        textDecoration:"none", 
                        color: "black", 
                        marginTop: "1rem", 
                        }}
                        >
                        {post.title}
                    </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link to={`/posts/${post.id}`} style={{textDecoration:"none"}}>
                    <p style={{ 
                      textAlign: "center", 
                      fontWeight: "normal", 
                      textDecoration:"none", 
                      color: "black", 
                      margin: 0, 
                      marginLeft: "0.5rem"
                    }}>Explore</p>
                  </Link>
                </div>
              </div>
              {/* <FaComment style={{ marginLeft: "3rem", color:"darkgray" }} /> add the comment icon */}
              <p style={{ 
                textAlign: "left", 
                fontWeight: "normal", 
                textDecoration:"none", 
                color: "black", 
                margin: "1rem 3rem",
                lineHeight: "1.4rem",
                fontFamily: "Helvetica Neue",
                fontSize: "1.2rem"
              }}>{post.summary}</p>
            </div>
          )
        })}
      </div>
    );
}

/*

    return posts.map(post => {
        console.log(post);
        return (
          <div 
            key={post.id}
            style={{ width: "40%", margin: "1rem", border: "1px solid black", borderRadius: "1rem" }}
            className="g-3"
          >
            <Link to={`/posts/${post.id}`} style={{textDecoration:"none"}}>
              <img style={{ width: "100%", padding: "1rem", borderRadius: "1rem" }} 
                src={post.image}
                alt="post"
              />
            </Link>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 3rem"}}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ textAlign: "center", fontWeight: "bold", textDecoration:"none", color: "black", margin: 0 }}>{post.title}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link to={`/posts/${post.id}`} style={{textDecoration:"none"}}>
                  <p style={{ 
                    textAlign: "center", 
                    fontWeight: "normal", 
                    textDecoration:"none", 
                    color: "black", 
                    margin: 0, 
                    marginLeft: "0.5rem" 
                  }}>Explore</p>
                </Link>
              </div>
            </div>
            <p style={{ 
              textAlign: "left", 
              fontWeight: "normal", 
              textDecoration:"none", 
              color: "black", 
              margin: "2rem 3rem",
                lineHeight: "2rem",
                fontFamily: "Helvetica Neue",
                fontSize: "1.2rem"
            }}>{post.summary}</p>
          </div>
        )
      })
      
    }

    */


    /*
    return posts.map(post => {
        console.log(post);
        return (
          <div 
            key={post.id}
            md={2} xs={1} lg={3} xl={4} 
            style={{ width: "40%", margin: "1rem", border: "1px solid black" }}
            className="g-3"
            >
            
            <Link to={`/posts/${post.id}`} style={{textDecoration:"none"}}>
              <img style={{ width: "100%"}} 
               src={post.image}
            //    src="https://images.unsplash.com/photo-1533483595632-c5f0e57a1936?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
               alt="post" />
                </Link>
                <span style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
  <p style={{ textAlign: "center", fontWeight: "bold", textDecoration:"none", color: "black", margin: 0 }}>{post.title}</p>
                
                <Link to={`/posts/${post.id}`} style={{textDecoration:"none"}}>
                <p style={{ 
                    textAlign: "center", 
                    fontWeight: "normal", 
                    textDecoration:"none", 
                    color: "black", 
                    margin: 0, 
                    marginLeft: "0.5rem" 
                    }}>Explore</p>
                    </Link>

                </span>

                <p
                style={{ textAlign: "center", fontWeight: "normal", textDecoration:"none", color: "black", marginLeft: "4rem"}}
                >Infant sleep plays an important role in a child's development, including cognition and physical growth </p>
           
          </div>
        )
      })
      */
