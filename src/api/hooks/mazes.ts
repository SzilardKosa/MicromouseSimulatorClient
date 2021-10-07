import { MazeApi, MazeDTO } from './../gen/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const api = new MazeApi()

type Error = { message: string }

export function useMazes() {
  return useQuery<MazeDTO[], Error>('mazes', async () => {
    const result = await api.mazesGet()
    return result.data
  })
}

export function useMaze(id: string) {
  return useQuery<MazeDTO, Error>(['mazes', id], async () => {
    const result = await api.mazesIdGet(id)
    return result.data
  })
}

export function useCreateMaze() {
  const queryClient = useQueryClient()
  return useMutation(api.mazesPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('mazes')
    },
  })
}

export function useUpdateMaze() {
  const queryClient = useQueryClient()
  return useMutation(
    async (maze: MazeDTO) => {
      await api.mazesIdPut(maze.id!!, maze)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mazes')
      },
    }
  )
}

export function useDeleteMaze() {
  const queryClient = useQueryClient()
  return useMutation(api.mazesIdDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries('mazes')
    },
  })
}
