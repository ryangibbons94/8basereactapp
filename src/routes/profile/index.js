import { useQuery } from '@apollo/client';
const GqlClient = require('graphql-request').GraphQLClient;

import { CURRENT_USER_QUERY } from 'shared/graphql';

export const Profile = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);

  const endpoint = 'https://api.8base.com/cl4ki9epu00ui09l1fmnt16p0';
  const token = 'fa7558e1-a6f8-40c4-bb52-ff563421b594';
  const client = new GqlClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const createNoteQuerry = `
  mutation($email: String!) {
    noteCreate(
      data: {
        title: "testing"
        body: "hello test note"
        users: {
          connect: {
            email: $email
          }
        }
      }
    ) 
  }
  `;
  async function onButton() {
    const res = await client.request(createNoteQuerry, {
      email: data.user.email,
    });
    alert(res);
  }

  return (
    <>
      <h1>Welcome Profile!</h1>
      <button onClick={onButton}>post something</button>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <h1>{data?.user?.email}</h1>
          <ul>
            <li>ID: {data?.user?.id}</li>
            <li>
              Name: {data?.user?.firstName} {data?.user?.lastName}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
