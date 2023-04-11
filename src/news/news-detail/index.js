import React, { useEffect, useState } from "react";
const NewsDetail = () => {
    const { id } = useParams();
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        // fetch news data
        // fetch bookmark data
        // fetch review data
    }, []);



    return (
        <div>
            <h4>Detail</h4>
        </div>

    )
}

export default NewsDetail;