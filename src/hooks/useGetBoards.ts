import { useGetBoardsSetByIdQuery, useGetBoardsQuery } from '../redux/query/BoardsQuery';

export const useGetBoards = (personalProjects: boolean, id: string) => {
  const myProjects = useGetBoardsSetByIdQuery({ id });
  const allProjects = useGetBoardsQuery();
  if (!personalProjects) {
    return allProjects;
  } else {
    return myProjects;
  }
};
