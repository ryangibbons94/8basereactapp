import { useQuery } from '@apollo/client';

import { CURRENT_USER_QUERY, GET_FOOD } from 'shared/graphql';

export const Profile = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);
  const { food, load } = useQuery(GET_FOOD);
  console.log(data);

  return (
    <>
      <h1>Welcome Profile!</h1>
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
