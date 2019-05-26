import axios from "./axios"

export const signUp = (data) => axios.post("/auth/signup", data).then(res => res.data)
export const signIn = (data) => axios.post("/auth/signin", data).then(res => res.data)

export const logout = () => axios.post("/auth/logout").then(res => res.data)
export const getAuth = () => axios.get("/auth").then(res => res.data)


export const createGroup = (data) => axios.post("/group", data).then(res => res.data)
export const getGroupDetail = (id) => axios.get(`/group/detail?group_id=${id}`).then(res => res.data)
export const listGroups = () => axios.get('/group/list').then(res => res.data)
export const postComment = (group_id, parent_comment_id) => text => axios.post("/group/comment", { group_id, parent_comment_id, text })
export const participate = (group_id) => axios.post("/group/participate", { group_id })
export const myPage = () => axios.get('/group/mypage').then(res => res.data)
export const participateList = (group_id) => axios.get(`/group/participate/list?group_id=${group_id}`).then(res => res.data)
export const acceptParticipant = (group_id, student_id) => axios.post("/group/participate/accept", { group_id, student_id }).then(res => res.data)
export const rejectParticipant = (group_id, student_id) => axios.post("/group/participate/reject", { group_id, student_id }).then(res => res.data)

//signIn({ student_id: "20150682" , password: "1234qwer" })
//	.then(() => {
//		return axios.get('/auth')
//	})
//	.then(res => {
//		console.log(res)
//	})
