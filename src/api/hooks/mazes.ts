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

type useMazeInputs = { id: string; onSuccess?: (maze: MazeDTO) => void }

export function useMaze({ id, onSuccess }: useMazeInputs) {
  return useQuery<MazeDTO, Error>(
    ['mazes', id],
    async () => {
      const result = await api.mazesIdGet(id)
      return result.data
    },
    {
      onSuccess: (data) => {
        if (onSuccess) onSuccess(data)
      },
    }
  )
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
      await api.mazesIdPut(maze.id, maze)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mazes')
      },
    }
  )
}

export function useUpdateMazeOptimistically() {
  const queryClient = useQueryClient()
  return useMutation(
    async (maze: MazeDTO) => {
      await api.mazesIdPut(maze.id, maze)
    },
    {
      onMutate: async (newMaze: MazeDTO) => {
        await queryClient.cancelQueries(['mazes', newMaze.id])
        const previousMaze = queryClient.getQueryData(['mazes', newMaze.id])
        queryClient.setQueryData(['mazes', newMaze.id], newMaze)
        return { previousMaze, newMaze }
      },
      onError: (err, newMaze, context: any) => {
        queryClient.setQueryData(['mazes', context.newMaze.id], context.previousMaze)
      },
      onSettled: () => {
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
