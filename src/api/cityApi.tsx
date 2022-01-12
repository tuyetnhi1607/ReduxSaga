import City from "models/city";
import { ListResponse, PaginationParams } from "models/common";
import axiosClient from "./axiosClient"
import { ListParams } from '../models/common';

const cityApi = {
    getAll(param: ListParams): Promise<ListResponse<City>>{
        const url = '/cities'
        return axiosClient.get(url, {params: param})
    }
}

export default cityApi;