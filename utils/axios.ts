import axios, { AxiosError,InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '', // set this in .env
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
    },
    withCredentials: true,
})


axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      config.headers = config.headers ?? {}
  
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    (error) => Promise.reject(error)
  )

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const message = (error.response?.data as any)?.message || error.message || 'Something went wrong'

        console.log(message)

        //TODO : need to add toast.

        return Promise.reject(new Error(message))
    }
)

export async function apiRequest<T>(
    url: string,
    config: AxiosRequestConfig = {}
): Promise<T> {
    const response = await axiosInstance({ url, ...config })
    return response.data
}

export default axiosInstance
