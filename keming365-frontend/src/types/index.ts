export interface Classify {
  id: number | string
  className: string
  sortOrder?: number
  imgPath?: string
}

export interface Curriculum {
  id: number | string
  curriculumName: string
  classifyId?: number
  status?: number
  image?: string
}

export interface Experiment {
  id: number | string
  title: string
  image?: string
  publisher?: string
  parentId?: number | string
  experimentType?: number
  price?: number
  browseNum?: number
}

export interface NewsItem {
  id: number | string
  title: string
  content?: string
  coverImg?: string
  image?: string
  browsetimes?: number
  createTime?: string
  time?: string
  priority?: number
}

export interface UserInfo {
  id?: number | string
  username: string
  name?: string
  email?: string
  type?: number  // 1=教师, 2=学生, 4=管理员, 5=普通用户, 8=临时管理员
  expireTime?: string | null
}

export interface PaginatedResponse<T> {
  results: T[]
  count: number
  next?: string
  previous?: string
}

export interface LoginResponse {
  access: string
  user: UserInfo
}
