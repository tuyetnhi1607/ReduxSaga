import { Student } from "models";
import { ListResponse } from "models/common";
import axiosClient from './axiosClient';
import { ListParams } from '../models/common';

const studentApi = {
    getAll(params: ListParams): Promise<ListResponse<Student>> {
        const url = '/students';
        return axiosClient.get(url, {params})
    },

    getById(id: string): Promise<Student> {
        const url =`/students/${id}`;
        return axiosClient.get(url)
    },

    add(data: Student): Promise<Student>{
        const url = '/students';
        return axiosClient.post(url, {data})
    },

    update(id: string|number, params: Student): Promise<Student> {
        const url = `/students/${id}`;
        return axiosClient.patch(url, {params})
    },

    remove(id: string|number): Promise<ListResponse<Student>> {
        const url =`/students/${id}`;
        return axiosClient.delete(url)
    },

}

export default studentApi;