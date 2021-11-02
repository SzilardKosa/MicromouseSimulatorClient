import { MouseApi, MouseDTO } from './../gen/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const api = new MouseApi()

type Error = { message: string }

export function useMice() {
  return useQuery<MouseDTO[], Error>('mice', async () => {
    const result = await api.miceGet()
    return result.data
  })
}

type useMouseInputs = { id: string; onSuccess?: (mouse: MouseDTO) => void }

export function useMouse({ id, onSuccess }: useMouseInputs) {
  return useQuery<MouseDTO, Error>(
    ['mice', id],
    async () => {
      const result = await api.miceIdGet(id)
      return result.data
    },
    {
      onSuccess: (data) => {
        if (onSuccess) onSuccess(data)
      },
    }
  )
}

export function useCreateMouse() {
  const queryClient = useQueryClient()
  return useMutation(api.micePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('mice')
    },
  })
}

export function useUpdateMouse() {
  const queryClient = useQueryClient()
  return useMutation(
    async (mouse: MouseDTO) => {
      await api.miceIdPut(mouse.id, mouse)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mice')
      },
    }
  )
}

export function useUpdateMouseOptimistically() {
  const queryClient = useQueryClient()
  return useMutation(
    async (mouse: MouseDTO) => {
      await api.miceIdPut(mouse.id, mouse)
    },
    {
      onMutate: async (newMouse: MouseDTO) => {
        await queryClient.cancelQueries(['mice', newMouse.id])
        const previousMouse = queryClient.getQueryData(['mice', newMouse.id])
        queryClient.setQueryData(['mice', newMouse.id], newMouse)
        return { previousMouse, newMouse }
      },
      onError: (err, newMouse, context: any) => {
        queryClient.setQueryData(['mice', context.newMouse.id], context.previousMouse)
      },
      onSettled: () => {
        queryClient.invalidateQueries('mice')
      },
    }
  )
}

export function useDeleteMouse() {
  const queryClient = useQueryClient()
  return useMutation(api.miceIdDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries('mice')
    },
  })
}
