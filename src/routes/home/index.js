import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY, GET_FOOD } from 'shared/graphql';
const GqlClient = require('graphql-request').GraphQLClient;
import { useState, useEffect } from 'react';

export const Home = () => {
  const { data } = useQuery(CURRENT_USER_QUERY);
  const [array, setArray] = useState([]);

  const endpoint = 'https://api.8base.com/cl4ki9epu00ui09l1fmnt16p0';
  const token = 'fa7558e1-a6f8-40c4-bb52-ff563421b594';
  const client = new GqlClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const notesQuery = `
  query ($email: String!) {
    notesList(
      filter: {
        users: {
          email: { contains: $email }
        }
      }
    ) {
      items {
        title
        users {
          firstName
        }
      }
    }
  }
  `;
  const getNotes = async () => {
    const res = await client.request(notesQuery, {
      email: data.user.email,
    });
    console.log(res.notesList.items);
    setArray(res.notesList.items);
  };

  useEffect(() => {
    if (data) {
      getNotes();
    }
  }, []);

  return (
    <div>
      <h1>Welcome Home! {data?.user?.firstName}</h1>
      <div>
        {array?.map((x, ind) => (
          <div key={ind}>{x.title}</div>
        ))}
      </div>
    </div>
  );
};
